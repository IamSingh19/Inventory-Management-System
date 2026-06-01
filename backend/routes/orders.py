from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import Order, OrderItem, Product, Customer
from schemas import OrderCreate, OrderResponse, OrderListResponse

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.id == order.customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    total_amount = 0
    order_items = []
    
    for item in order.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        
        if product.quantity < item.quantity:
            raise HTTPException(status_code=400, detail=f"Insufficient stock for {product.name}")
        
        total_amount += product.price * item.quantity
        order_items.append((product, item.quantity))
    
    db_order = Order(customer_id=order.customer_id, total_amount=total_amount)
    db.add(db_order)
    db.flush()
    
    for product, quantity in order_items:
        order_item = OrderItem(order_id=db_order.id, product_id=product.id, quantity=quantity, price=product.price)
        db.add(order_item)
        product.quantity -= quantity
    
    db.commit()
    db.refresh(db_order)
    return db_order

@router.get("")
def get_orders(db: Session = Depends(get_db)):
    orders = db.query(Order).all()
    result = []
    for o in orders:
        items = [{"id": i.id, "product_id": i.product_id, "quantity": i.quantity, "price": i.price} for i in o.items]
        result.append({
            "id": o.id,
            "customer_id": o.customer_id,
            "total_amount": o.total_amount,
            "created_at": o.created_at,
            "items": items
        })
    return result

@router.get("/{order_id}")
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    # Force load items while session is active
    items = [{"id": i.id, "product_id": i.product_id, "quantity": i.quantity, "price": i.price} for i in order.items]
    return {
        "id": order.id,
        "customer_id": order.customer_id,
        "total_amount": order.total_amount,
        "created_at": order.created_at,
        "items": items
    }

@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    for item in order.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if product:
            product.quantity += item.quantity
    
    db.delete(order)
    db.commit()

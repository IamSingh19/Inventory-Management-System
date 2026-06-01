from database import SessionLocal
from models import Order
from sqlalchemy.orm import joinedload

db = SessionLocal()
try:
    orders = db.query(Order).options(joinedload(Order.items)).all()
    print(f"Found {len(orders)} orders")
    for order in orders:
        print(f"Order {order.id}: {len(order.items)} items")
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
finally:
    db.close()

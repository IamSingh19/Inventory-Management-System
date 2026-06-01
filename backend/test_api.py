"""
Simple test script to verify API endpoints work correctly.
Run with: python test_api.py
"""

import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health check endpoint"""
    print("Testing health check...")
    response = requests.get(f"{BASE_URL}/health")
    assert response.status_code == 200
    print("✓ Health check passed")

def test_products():
    """Test product endpoints"""
    print("\nTesting products...")
    
    # Create product
    product_data = {
        "name": "Laptop",
        "sku": "LAPTOP-001",
        "price": 999.99,
        "quantity": 10
    }
    response = requests.post(f"{BASE_URL}/products", json=product_data)
    assert response.status_code == 201
    product = response.json()
    product_id = product["id"]
    print(f"✓ Created product: {product_id}")
    
    # Get all products
    response = requests.get(f"{BASE_URL}/products")
    assert response.status_code == 200
    assert len(response.json()) > 0
    print("✓ Retrieved all products")
    
    # Get product by ID
    response = requests.get(f"{BASE_URL}/products/{product_id}")
    assert response.status_code == 200
    assert response.json()["id"] == product_id
    print("✓ Retrieved product by ID")
    
    # Update product
    update_data = {"quantity": 15}
    response = requests.put(f"{BASE_URL}/products/{product_id}", json=update_data)
    assert response.status_code == 200
    assert response.json()["quantity"] == 15
    print("✓ Updated product")
    
    return product_id

def test_customers():
    """Test customer endpoints"""
    print("\nTesting customers...")
    
    # Create customer
    customer_data = {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "555-1234"
    }
    response = requests.post(f"{BASE_URL}/customers", json=customer_data)
    assert response.status_code == 201
    customer = response.json()
    customer_id = customer["id"]
    print(f"✓ Created customer: {customer_id}")
    
    # Get all customers
    response = requests.get(f"{BASE_URL}/customers")
    assert response.status_code == 200
    assert len(response.json()) > 0
    print("✓ Retrieved all customers")
    
    # Get customer by ID
    response = requests.get(f"{BASE_URL}/customers/{customer_id}")
    assert response.status_code == 200
    assert response.json()["id"] == customer_id
    print("✓ Retrieved customer by ID")
    
    return customer_id

def test_orders(customer_id, product_id):
    """Test order endpoints"""
    print("\nTesting orders...")
    
    # Create order
    order_data = {
        "customer_id": customer_id,
        "items": [
            {"product_id": product_id, "quantity": 2}
        ]
    }
    response = requests.post(f"{BASE_URL}/orders", json=order_data)
    assert response.status_code == 201
    order = response.json()
    order_id = order["id"]
    assert order["total_amount"] == 1999.98  # 999.99 * 2
    print(f"✓ Created order: {order_id}")
    
    # Get all orders
    response = requests.get(f"{BASE_URL}/orders")
    assert response.status_code == 200
    assert len(response.json()) > 0
    print("✓ Retrieved all orders")
    
    # Get order by ID
    response = requests.get(f"{BASE_URL}/orders/{order_id}")
    assert response.status_code == 200
    assert response.json()["id"] == order_id
    print("✓ Retrieved order by ID")
    
    return order_id

def test_stats():
    """Test stats endpoint"""
    print("\nTesting stats...")
    response = requests.get(f"{BASE_URL}/stats")
    assert response.status_code == 200
    stats = response.json()
    assert "total_products" in stats
    assert "total_customers" in stats
    assert "total_orders" in stats
    assert "low_stock_products" in stats
    print(f"✓ Stats: {stats}")

def test_business_logic():
    """Test business logic constraints"""
    print("\nTesting business logic...")
    
    # Test duplicate SKU
    product_data = {
        "name": "Mouse",
        "sku": "MOUSE-001",
        "price": 29.99,
        "quantity": 50
    }
    response = requests.post(f"{BASE_URL}/products", json=product_data)
    assert response.status_code == 201
    
    # Try to create with same SKU
    response = requests.post(f"{BASE_URL}/products", json=product_data)
    assert response.status_code == 400
    print("✓ Duplicate SKU rejected")
    
    # Test duplicate email
    customer_data = {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "555-5678"
    }
    response = requests.post(f"{BASE_URL}/customers", json=customer_data)
    assert response.status_code == 201
    
    # Try to create with same email
    response = requests.post(f"{BASE_URL}/customers", json=customer_data)
    assert response.status_code == 400
    print("✓ Duplicate email rejected")
    
    # Test insufficient stock
    product_data = {
        "name": "Keyboard",
        "sku": "KEYBOARD-001",
        "price": 79.99,
        "quantity": 1
    }
    response = requests.post(f"{BASE_URL}/products", json=product_data)
    product_id = response.json()["id"]
    
    customer_data = {
        "name": "Bob Smith",
        "email": "bob@example.com",
        "phone": "555-9999"
    }
    response = requests.post(f"{BASE_URL}/customers", json=customer_data)
    customer_id = response.json()["id"]
    
    order_data = {
        "customer_id": customer_id,
        "items": [
            {"product_id": product_id, "quantity": 5}
        ]
    }
    response = requests.post(f"{BASE_URL}/orders", json=order_data)
    assert response.status_code == 400
    print("✓ Insufficient stock rejected")

if __name__ == "__main__":
    try:
        test_health()
        product_id = test_products()
        customer_id = test_customers()
        order_id = test_orders(customer_id, product_id)
        test_stats()
        test_business_logic()
        print("\n✅ All tests passed!")
    except AssertionError as e:
        print(f"\n❌ Test failed: {e}")
    except requests.exceptions.ConnectionError:
        print("\n❌ Could not connect to API. Make sure it's running on http://localhost:8000")
    except Exception as e:
        print(f"\n❌ Error: {e}")

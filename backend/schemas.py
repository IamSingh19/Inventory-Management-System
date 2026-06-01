from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

class ProductCreate(BaseModel):
    name: str
    sku: str
    price: float = Field(gt=0)
    quantity: int = Field(gt=0)

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    quantity: Optional[int] = Field(None, gt=0)

class ProductResponse(BaseModel):
    id: int
    name: str
    sku: str
    price: float
    quantity: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class CustomerCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str

class CustomerResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)

class OrderCreate(BaseModel):
    customer_id: int
    items: List[OrderItemCreate]

class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    price: float
    
    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: int
    customer_id: int
    total_amount: float
    created_at: datetime
    items: List[OrderItemResponse] = []
    
    class Config:
        from_attributes = True

class OrderListResponse(BaseModel):
    id: int
    customer_id: int
    total_amount: float
    created_at: datetime
    
    class Config:
        from_attributes = True

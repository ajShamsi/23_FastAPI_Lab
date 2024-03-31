from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient

app = FastAPI()

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['user']
collection = db['info']

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from all origins (adjust as needed)
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Allow specified methods
    allow_headers=["*"],  # Allow specified headers (adjust as needed)
)

class User(BaseModel):
    username: str
    password: str
    email: str
    phone: str

@app.post("/register/")
async def register_user(user: User):
    # Perform validations
    if len(user.username) <= 5:
        raise HTTPException(status_code=400, detail="Username must be longer than 5 characters")
    if len(user.password) <= 6:
        raise HTTPException(status_code=400, detail="Password must be longer than 6 characters")
    if len(user.phone) != 11:
        raise HTTPException(status_code=400, detail="Phone number must have exactly 11 digits")
    
    # Check if user already exists
    existing_user = collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    # Save user data to MongoDB
    result = collection.insert_one(user.dict())
    
    # Check if user was successfully inserted
    if result.inserted_id:
        return {"message": "User registered successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to register user")
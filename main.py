from fastapi import FastAPI, HTTPException
from starlette.responses import FileResponse 
from typing import List
from models import User
from uuid import UUID


app = FastAPI()

db: List[User] = []

@app.get("/")
async def read_index():
    return FileResponse('index.html')

@app.get("/user/resturant")
async def get_user():
    return db;

@app.post("/user/resturant")
async def register_user(user: User):
    db.append(user)
    return {"id": user.id}

@app.delete("/user/resturant/{user_id}")
async def delete_user(user_id: UUID):
    for user in db:
        if user_id == user:
            db.remove(user)
            return
    raise HTTPException(
        status_code=404, detail= f"User with id:{user_id} does not exist"
    )


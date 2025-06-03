from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
import os
import httpx
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = "http://localhost:8000/auth/callback"


@router.get("/auth/login")
def login():
    return RedirectResponse(
        f"https://accounts.google.com/o/oauth2/v2/auth"
        f"?client_id={CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}"
        f"&response_type=code"
        f"&scope=openid%20email%20profile"
    )


from datetime import datetime
import json
from sqlalchemy.orm import Session
from db import SessionLocal
from models import User
@router.get("/auth/callback")
async def callback(request: Request):
    code = request.query_params.get("code")

    async with httpx.AsyncClient() as client:
        token_res = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "code": code,
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "redirect_uri": REDIRECT_URI,
                "grant_type": "authorization_code"
            },
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        token_data = token_res.json()
        id_token = token_data.get("id_token")

        userinfo_res = await client.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={"Authorization": f"Bearer {token_data['access_token']}"}
        )
        google_user = userinfo_res.json()

    # Guardar/actualizar usuario en DB
    db: Session = SessionLocal()
    user = db.query(User).filter(User.id == google_user["sub"]).first()

    now = datetime.utcnow()

    if user:
        user.last_login = now
    else:
        user = User(
            id=google_user["sub"],
            name=google_user["name"],
            email=google_user["email"],
            picture=google_user["picture"],
            created_at=now,
            last_login=now
        )
        db.add(user)

    db.commit()
    db.close()

    response = RedirectResponse(url="http://localhost:3000/dashboard")
    response.set_cookie("id_token", id_token, httponly=True)
    response.set_cookie("user_info", json.dumps(google_user), httponly=True)

    return response


@router.get("/auth/user")
def get_user_info(request: Request):
    user_info = request.cookies.get("user_info")
    return user_info


@router.get("/auth/logout")
def logout():
    response = RedirectResponse(url="/")
    response.delete_cookie("id_token")
    response.delete_cookie("user_info")
    return response

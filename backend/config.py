# backend/config.py
import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "FastAPI Google OAuth2 Example"
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    GOOGLE_REDIRECT_URI: str = "http://localhost:8000/auth/callback"
    DATABASE_URL: str = "sqlite:///./app.db"
    CLIENT_SECRET: str = "your_client_secret_here"  
    
    class Config:
        env_file = ".env"

settings = Settings()

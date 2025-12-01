from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import httpx

load_dotenv()

app = FastAPI(
    title="eRecipe API",
    description="Backend API for eRecipe e-commerce app (FastAPI + Drizzle)",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4321", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Drizzle API base URL
DRIZZLE_API_URL = os.getenv("DRIZZLE_API_URL", "http://localhost:3000")

@app.get("/")
async def root():
    return {
        "message": "Welcome to eRecipe API",
        "services": {
            "fastapi": "http://localhost:8000",
            "drizzle": DRIZZLE_API_URL
        }
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "fastapi"}

# Proxy endpoints to Drizzle API
@app.get("/api/recipes")
async def get_recipes():
    """Proxy to Drizzle API for recipes"""
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{DRIZZLE_API_URL}/api/recipes")
        return response.json()

@app.get("/api/recipes/{recipe_id}")
async def get_recipe(recipe_id: int):
    """Proxy to Drizzle API for single recipe"""
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{DRIZZLE_API_URL}/api/recipes/{recipe_id}")
        return response.json()

@app.get("/api/restaurants")
async def get_restaurants():
    """Proxy to Drizzle API for restaurants"""
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{DRIZZLE_API_URL}/api/restaurants")
        return response.json()

@app.get("/api/users")
async def get_users():
    """Proxy to Drizzle API for users"""
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{DRIZZLE_API_URL}/api/users")
        return response.json()


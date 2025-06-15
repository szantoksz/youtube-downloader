# import 3rd-party libraries
from fastapi import APIRouter

# import os to handle environment variables
import os

# create api router for the about endpoint
router = APIRouter()

# define /api/about endpoint
@router.get("/")
async def about():
    # read the APP and VER from the environment variables and return them
    return {
            "APP": os.getenv("APP"),
            "VER": os.getenv("VER")
            }

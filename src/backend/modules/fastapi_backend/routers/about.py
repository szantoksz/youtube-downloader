# import 3rd-party libraries
from fastapi import APIRouter

# import app modules
from modules.handlers import json_handler as j_handler

# import app paths
from config import paths

# create api router for the about endpoint
router = APIRouter()

# define /api/about endpoint
@router.get("/")
async def about():
    # load and return the contents of the about file
    json_handler = j_handler.JsonHandler()
    about_file_contents = json_handler.load(paths.ABOUT_FILE_PATH)
    return about_file_contents
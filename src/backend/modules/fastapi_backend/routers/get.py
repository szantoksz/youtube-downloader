# import 3rd-party libraries
from pathlib import Path
from urllib.parse import quote
from fastapi import APIRouter
from starlette.responses import FileResponse, JSONResponse

# import app modules
from modules.handlers import directory_handler as d_handler, json_handler as j_handler, file_handler as f_handler

# import os to handle environment variables
import os

# create api router for the download endpoint
router = APIRouter()

# define /api/get/{job id}/{what} endpoint
@router.get("/{job_id}/{what}")
async def get_download(job_id: str, what: str):
    # read TEMP_DIRECTORY_PATH from environment variables
    temp_directory_path = os.getenv("TEMP_DIRECTORY_PATH")
    temp_directory_path = Path(temp_directory_path)

    # define job path
    job_path = temp_directory_path / job_id

    # define handlers
    directory_handler = d_handler.DirectoryHandler()
    file_handler = f_handler.FileHandler()
    json_handler = j_handler.JsonHandler()

    # handle request if the job doesnt exist
    if not directory_handler.exists(job_path):
        return JSONResponse({"error": "InvalidJobId"}, status_code=404)

    # return job data (title, duration)
    if what == "data":
        data_file_path = job_path / "data.json"
        if file_handler.exists(data_file_path):
            return json_handler.load(data_file_path)
        # if the data doesnt exist yet, return an error
        return JSONResponse({"error": "Data file not found"}, status_code=404)

    # return job data (thumbnail)
    elif what == "thumbnail":
        thumbnail_file_path = job_path / "thumbnail.png"
        if file_handler.exists(thumbnail_file_path):
            return FileResponse(
                thumbnail_file_path,
                media_type="image/png",
                headers={"Content-Disposition": 'attachment; filename="thumbnail.png"'}
            )
        # if the data doesnt exist yet, return an error
        return JSONResponse({"error": "Thumbnail not found"}, status_code=404)

    # return job content (mp3 or mp4)
    elif what == "content":
        # define file apth and extension for later use
        content_file_path = None
        content_ext = None

        # define both paths
        mp4_path = job_path / "content.mp4"
        mp3_path = job_path / "content.mp3"

    # specify the extension based on which file exists
        if file_handler.exists(mp4_path):
            content_file_path = mp4_path
            content_ext = "mp4"
        elif file_handler.exists(mp3_path):
            content_file_path = mp3_path
            content_ext = "mp3"

        # check if the content file exist, if it does return it
        if content_file_path:
            # make the file name the video title, and url quote it so stuff like emojies dont get messed up
            data_file_path = job_path / "data.json"
            data = json_handler.load(data_file_path)
            content_name = quote(data.get("title", "download"))

            # return the actual file, with the name being the video title
            return FileResponse(
                content_file_path,
                media_type=f"video/mp4" if content_ext == "mp4" else "audio/mpeg",
                headers={
                    "Content-Disposition": f"attachment; filename*=UTF-8''{content_name}.{content_ext}"
                }
            )
        # if the file doesnt exist yet return an error
        return JSONResponse({"error": "No content file found"}, status_code=404)

    # if the request doesnt exist return an error
    return JSONResponse({"error": "InvalidRequestSpecifier"}, status_code=400)

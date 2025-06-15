# import 3rd-party libraries
from fastapi import APIRouter

# import app modules
from modules.functions.download import Download

# create api router for the download endpoint
router = APIRouter()

# define /api/download/{media_type}/{url} endpoint POST
@router.post("/{media_type}/{url:path}")
async def download(media_type: str, url: str):
    # start a new download job and return the job id
    job_id = Download().download_init(media_type, url)
    return {job_id}

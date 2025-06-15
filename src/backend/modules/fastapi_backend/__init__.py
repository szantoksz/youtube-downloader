# # import 3rd-party libraries
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# import endpoints
from modules.fastapi_backend.routers import about, download, get

# define fastapi object
api = FastAPI()

# satify for CORS policy
api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# define endpoints
api.include_router(about.router, prefix="/api/about")
api.include_router(download.router, prefix="/api/download")
api.include_router(get.router, prefix="/api/get")
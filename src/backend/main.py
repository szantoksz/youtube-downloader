# import 3rd-party libraries
import uvicorn

# import built-in libaries
from pathlib import Path

# import config and metadata
from config import paths, meta

# import api
from modules.fastapi_backend import api

# import environment setup
from modules.functions import setup

def main():
    # define the path of the directpry where the main.py file is
    executable_directory_path = Path(__file__).resolve().parent

    # define cross-file paths
    paths.DATA_DIRECTORY_PATH = executable_directory_path / "DATA"
    paths.TEMP_DIRECTORY_PATH = executable_directory_path / "TEMP"
    paths.ABOUT_FILE_PATH = paths.DATA_DIRECTORY_PATH / "about.json"

    # define app metadata
    meta.APP = "szantokszYtDownloader"
    meta.VER = "1.0.0"
    
    # setup environment
    setup.Setup()

    # start api
    uvicorn.run(api, host="0.0.0.0", port=8080)

if __name__ == "__main__":
    main()
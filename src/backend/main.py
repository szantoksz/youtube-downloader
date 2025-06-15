# import 3rd-party libraries
import uvicorn

# import built-in libaries
from pathlib import Path

# import os to handle #environment variables
import os

# import api
from modules.fastapi_backend import api

# import environment setup
from modules.functions import setup

def main():
    # read the APP and VER environment variables to make sure they're not empty
    APP = os.getenv("APP")
    VER = os.getenv("VER")

    if APP and VER:
        # define the path of the directpry where the main.py file is
        executable_directory_path = Path(__file__).resolve().parent

        # make environment variables and define cross-file paths in them
        os.environ["TEMP_DIRECTORY_PATH"] = f"{executable_directory_path / "TEMP"}"

        # setup environment
        setup.Setup()

        # start api
        uvicorn.run(api, host="0.0.0.0", port=8080)
    else:
        # if the APP or VER environment variables are empty, print a warning to the console that the app won't launch
        print("THE SERVER WON'T START: The APP and VER environment variables are empty, please check their value!")

if __name__ == "__main__":
    main()

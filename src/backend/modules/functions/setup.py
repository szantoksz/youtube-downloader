# import app handlers
from modules.handlers import directory_handler, file_handler

# import os to handle environment variables
import os

# import pathlib to manage paths
from pathlib import Path

# environment setup
class Setup(object):
    def __init__(self):
        # initialize handlers
        self.directory_handler = directory_handler.DirectoryHandler()
        self.file_handler = file_handler.FileHandler()

        # start process
        self.setup()

    def setup(self):
        # run setup stages
        self.setup_directories()

    def setup_directories(self):
        # get temp directory path
        temp_directory_path = os.getenv("TEMP_DIRECTORY_PATH")
        
        # ensure that the directory path is a pathlib object
        temp_directory_path = Path(temp_directory_path)

        # check if the temp directory exists or not
        if not self.directory_handler.exists(temp_directory_path):
            # if it doesnt exist, create it
            self.directory_handler.create(temp_directory_path)
        else:
            # if it does exist, remove it's contents
            for i in temp_directory_path.iterdir():
                # if its a file remove the file
                if i.is_file() or i.is_symlink():
                    self.file_handler.delete(i)
                else:
                    # if its a directory remove the directory and it's contents
                    self.directory_handler.delete(i)


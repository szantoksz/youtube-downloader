# import app handlers
from modules.handlers import directory_handler, file_handler, json_handler

# import app paths and metadata
from config import paths, meta

# environment setup
class Setup(object):
    def __init__(self):
        # initialize handlers
        self.directory_handler = directory_handler.DirectoryHandler()
        self.file_handler = file_handler.FileHandler()
        self.json_handler = json_handler.JsonHandler()

        # start process
        self.setup()

    def setup(self):
        # run 3 setup stages in order
        self.setup_directories()
        self.setup_files()
        self.setup_json()

    def setup_directories(self):
        # recreate temp directory
        if self.directory_handler.exists(paths.TEMP_DIRECTORY_PATH):
            self.directory_handler.delete(paths.TEMP_DIRECTORY_PATH)
        self.directory_handler.create(paths.TEMP_DIRECTORY_PATH)

        # ensure that the data directory exists
        if not self.directory_handler.exists(paths.DATA_DIRECTORY_PATH):
            self.directory_handler.create(paths.DATA_DIRECTORY_PATH)

    def setup_files(self):
        # ensure that the about.json file exists
        if not self.file_handler.exists(paths.ABOUT_FILE_PATH):
            self.file_handler.create(paths.ABOUT_FILE_PATH)

    def setup_json(self):
        # ensure that the about.json has base data
        if not self.json_handler.load(paths.ABOUT_FILE_PATH):
            self.json_handler.dump(paths.ABOUT_FILE_PATH, {
            "app": meta.APP,
            "ver": meta.VER
        })
# import built-in libaries
from pathlib import Path
import shutil

# organize the functions in a class
class DirectoryHandler(object):
    # check if the directory exists or not
    @staticmethod
    def exists(path):
        # Ensure that the path is a pathlib object
        if not isinstance(path, Path):
            path = Path(path)
        
        return path.exists()
    
    # create the directory
    @staticmethod
    def create(path):
        # Ensure that the path is a pathlib object
        if not isinstance(path, Path):
            path = Path(path)

        path.mkdir(parents=True, exist_ok=True)

    # delete the directory and all it's contents
    @staticmethod
    def delete(path):
        # Ensure that the path is a pathlib object
        if not isinstance(path, Path):
            path = Path(path)
            
        shutil.rmtree(path)
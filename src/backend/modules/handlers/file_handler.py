# import built-in libaries
from pathlib import Path

# organize the functions in a class
class FileHandler(object):
    # check if the file exists or not
    @staticmethod
    def exists(path: Path):
        # Ensure that the path is a pathlib object
        if not isinstance(path, Path):
            path = Path(path)

        return path.exists()
    
    # create the file
    @staticmethod
    def create(path: Path):
        # Ensure that the path is a pathlib object
        if not isinstance(path, Path):
            path = Path(path)

        path.touch(exist_ok=True)

    # delete the file
    @staticmethod
    def delete(path: Path):
        # Ensure that the path is a pathlib object
        if not isinstance(path, Path):
            path = Path(path)

        path.unlink(missing_ok=True)
# import built-in libaries
import json
from pathlib import Path

# organize the functions in a class
class JsonHandler(object):
    # read the file's contents
    @staticmethod
    def load(path: Path):
        # Ensure that the path is a pathlib object
        if not isinstance(path, Path):
            path = Path(path)

        try:
            with path.open("r") as file:
                return json.load(file)
        except:
            # if the file is empty return None
            return None
    
    # save data to the file
    @staticmethod
    def dump(path: Path, data):
        # Ensure that the path is a pathlib object
        if not isinstance(path, Path):
            path = Path(path)

        with path.open("w") as file:
            json.dump(data, file, indent=4)
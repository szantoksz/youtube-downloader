# import built-in libaries
import subprocess
from pathlib import Path

# organize the transcription in a class
class TranscodeToPng(object):
    # transocde input file (webp) to png
    @staticmethod
    def transcode(input_path, output_path):
        # ensure that the in and output path are pathlib objects
        if not isinstance(input_path, Path):
            input_path = Path(input_path)
        if not isinstance(output_path, Path):
            output_path = Path(output_path)
        
        # transcode to png
        subprocess.run([
            "ffmpeg",
            "-i", str(input_path),
            str(output_path)
        ])
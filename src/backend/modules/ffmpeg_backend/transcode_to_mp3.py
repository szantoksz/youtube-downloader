# import built-in libaries
import subprocess
from pathlib import Path

# organize the transcription in a class
class TranscodeToMp3(object):
    # transcode the input file (mp4) to mp3
    @staticmethod
    def transcode(input_path, output_path):
        # ensure that the in and output path are pathlib objects
        if not isinstance(input_path, Path):
            input_path = Path(input_path)
        if not isinstance(output_path, Path):
            output_path = Path(output_path)

        # transcode to mp3
        subprocess.run([
            "ffmpeg",
            "-i", str(input_path),
            "-vn",
            "-codec:a", "libmp3lame",
            "-qscale:a", "0",
            str(output_path)
        ])

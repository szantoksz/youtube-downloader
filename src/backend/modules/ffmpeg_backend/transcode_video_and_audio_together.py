# import built-in libaries
import subprocess
from pathlib import Path

# organize the transcription in a class
class TranscodeVideoAndAudioTogether(object):
    # transcode both input files (mp3, mp4) into 1 mp3
    @staticmethod
    def transcode_together(input_path1, input_path2, output_path):
        # ensure that the in and output paths are pathlib objects
        if not isinstance(input_path1, Path):
            input_path1 = Path(input_path1)
        if not isinstance(input_path2, Path):
            input_path2 = Path(input_path2)
        if not isinstance(output_path, Path):
            output_path = Path(output_path)
        
        # transcode together
        try:
            subprocess.run([
                "ffmpeg",
                "-i", str(input_path1),
                "-i", str(input_path2),
                "-c:v", "copy",
                "-c:a", "aac",
                str(output_path)
            ])
        except subprocess.CalledProcessError:
            subprocess.run([
                "ffmpeg",
                "-i", str(input_path1),
                "-i", str(input_path2),
                "-c:v", "copy",
                "-c:a", "aac",
                "-b:a", "192k",
                str(output_path)
                ])

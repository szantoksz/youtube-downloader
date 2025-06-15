# import 3rd-party libraries
import yt_dlp

# import built-in libraries
from pathlib import Path

# organize the audio download in a class
class DownloadAudio(object):
    # download a youtube video's audio as mp4
    @staticmethod
    def download(url, path, name):
        # ensure the path is a pathlib object
        if not isinstance(path, Path):
            path = Path(path)

        # configure ytdlp options and download
        with yt_dlp.YoutubeDL({
            "format": "bestaudio[ext=webm]",
            "outtmpl": str(path / f"{name}.%(ext)s")
        }) as ydl:
            ydl.download([url])

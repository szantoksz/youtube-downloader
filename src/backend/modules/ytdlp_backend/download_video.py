# import 3rd-party libraries
import yt_dlp

# import built-in libraries
from pathlib import Path

# organize the video download in a class
class DownloadVideo(object):
    # download a youtube video's video as an mp4
    @staticmethod
    def download(url, path, name):
        # ensure the path is a pathlib object
        if not isinstance(path, Path):
            path = Path(path)

        # configure ytdlp options and download
        with yt_dlp.YoutubeDL({
            "format": "bestvideo[ext=webm]",
            "outtmpl": str(path / f"{name}.%(ext)s")
        }) as ydl:
            ydl.download([url])

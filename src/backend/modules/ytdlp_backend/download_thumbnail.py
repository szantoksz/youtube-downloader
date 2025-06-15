# import 3rd-party libraries
import yt_dlp

# import built-in libraries
from pathlib import Path

# organize the thumbnail download in a class
class DownloadThumbnail(object):
    # downlaod the youtube video's thumbnail as webp
    @staticmethod
    def download(url, path):
        # ensure the path is a pathlib object
        if not isinstance(path, Path):
            path = Path(path)
        
        # configure ytdlp options and download
        with yt_dlp.YoutubeDL({
            "skip_download": True,
            "writethumbnail": True,
            "outtmpl": str(path / "thumbnail.%(ext)s")
        }) as ydl:
            ydl.download([url])
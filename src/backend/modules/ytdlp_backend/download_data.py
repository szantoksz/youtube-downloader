# import 3rd-party libraries
import yt_dlp

# import built-in libraries
import datetime

# organize the data download in a class
class DownloadVideoData(object):
    # download title and duration
    @staticmethod
    def download_data(url):
        # configure ytdlp options and get data
        with yt_dlp.YoutubeDL({
            "quiet": True,
            "skip_download": True
        }) as ydl:
            video_info = ydl.extract_info(url, download=False)

            # extract video title and duration from all of the video data
            title = video_info.get("title")
            duration = video_info.get("duration")

            # convert the duration into seconds
            duration = str(datetime.timedelta(seconds=duration))

            # format the duration into HH:MM:SS or MM:SS based on the length
            if duration.startswith("0:"):
                duration = duration[2:]

            # return title and formated duration
            return title, duration       
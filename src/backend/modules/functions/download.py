# import built-in libraries
import threading
from pathlib import Path
import time

# import app modules
from modules.ffmpeg_backend import transcode_to_mp3, transcode_to_png, transcode_video_and_audio_together
from modules.functions.generate_new_job_id import JobID
from modules.handlers import directory_handler as d_handler, file_handler as f_handler, json_handler as j_handler
from modules.ytdlp_backend import download_data, download_video, download_audio, download_thumbnail

# import os to handle environment variables
import os

# organize video download into a class
class Download(object):
    # start the download process in a new thread
    def download_init(self, type, url):
        if type not in ["video", "audio"]:
            return "InvalidType"
        job_id = JobID.generate()
        threading.Thread(target=self.download, args=(job_id, type, url)).start()
        return job_id

    # download workflow
    def download(self, job_id, type, url):
        # get the TEMP_DIRECTORY_PATH from #environment variables
        temp_directory_path = os.getenv("TEMP_DIRECTORY_PATH")
        temp_directory_path = Path(temp_directory_path)

        # setup the working directory and data file
        self.working_directory_path = temp_directory_path / job_id
        self.directory_handler = d_handler.DirectoryHandler()
        self.create_working_directory()

        self.data_file_path = self.working_directory_path / "data.json"
        self.file_handler = f_handler.FileHandler()
        self.create_data_file()

        # give the data file some base data
        self.json_handler = j_handler.JsonHandler()
        self.give_data_file_base_data()

        # download and storate the video data (title, duration) in the data file
        self.url = url
        self.download_video_data()

        # download the video thumbnail and transcode it to png
        self.change_status("DownloadingThumbnail")
        self.download_video_thumbnail()

        self.change_status("TranscodingThumbnail")
        self.transcode_video_thumbnail_to_png()

        # change between video and audio flow
        if type == "video":
            #download the video and audio and put them together
            self.change_status("DownloadingVideo")
            self.download_video_video()

            self.change_status("DownloadingAudio")
            self.download_video_audio()

            self.change_status("TranscodingVideoAndAudioTogether")
            self.transcode_video_and_audio_together()
        else:
            # download the audio and transcode it to mp3
            self.change_status("DownloadingAudio")
            self.download_video_audio()

            self.change_status("TranscodingToMp3")
            self.transcode_video_audio_to_mp3()

        # final status update
        self.change_status("Done")

        # 5 minute wait before cleanup
        time.sleep(900)
        self.directory_handler.delete(self.working_directory_path)

    # create the working directory
    def create_working_directory(self):
        self.directory_handler.create(self.working_directory_path)

    # create the data file
    def create_data_file(self):
        self.file_handler.create(self.data_file_path)

    # give the data file the base data
    def give_data_file_base_data(self):
        self.json_handler.dump(self.data_file_path, {
            "status": "GettingData",
            "title": None,
            "duration": None
        })

    # download the video data (title, duration) and save it to the data file
    def download_video_data(self):
        self.title, self.duration = download_data.DownloadVideoData.download_data(self.url)

        data_file_contents = self.json_handler.load(self.data_file_path)
        data_file_contents["title"] = self.title
        data_file_contents["duration"] = self.duration
        self.json_handler.dump(self.data_file_path, data_file_contents)

    # download the video thumbnail as webp
    def download_video_thumbnail(self):
        download_thumbnail.DownloadThumbnail.download(self.url, self.working_directory_path)

    # transcode the webp thumbnail to png, and than auto cleanup the old webp
    def transcode_video_thumbnail_to_png(self):
        input_file_path = self.working_directory_path / "thumbnail.webp"
        output_file_path = self.working_directory_path / "thumbnail.png"

        transcode_to_png.TranscodeToPng.transcode(input_file_path, output_file_path)

        self.file_handler.delete(input_file_path)

    # download the video's video as webm
    def download_video_video(self):
        download_video.DownloadVideo.download(self.url, self.working_directory_path, "content_video")

    # download the video's audio as webm
    def download_video_audio(self):
        download_audio.DownloadAudio.download(self.url, self.working_directory_path, "content_audio")

    # transoce the audio webm into audio mp3, and auto cleanup the webm
    def transcode_video_audio_to_mp3(self):
        input_file_path = self.working_directory_path / "content_audio.webm"
        output_file_path = self.working_directory_path / "content.mp3"

        transcode_to_mp3.TranscodeToMp3.transcode(input_file_path, output_file_path)

        self.file_handler.delete(input_file_path)

    # put the audio and video webm into 1 mp4 and auto cleanup the old 2 webms
    def transcode_video_and_audio_together(self):
        input_file_1_path = self.working_directory_path / "content_video.webm"
        input_file_2_path = self.working_directory_path / "content_audio.webm"
        output_file_path = self.working_directory_path / "content.mp4"

        transcode_video_and_audio_together.TranscodeVideoAndAudioTogether.transcode_together(input_file_1_path, input_file_2_path, output_file_path)

        self.file_handler.delete(input_file_1_path)
        self.file_handler.delete(input_file_2_path)

    # change status in the data file
    def change_status(self, status):
        data_file_contents = self.json_handler.load(self.data_file_path)
        data_file_contents["status"] = status
        self.json_handler.dump(self.data_file_path, data_file_contents)

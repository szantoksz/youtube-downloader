
# Youtube Downloader

#### A yt-dlp & FFmpeg powered YouTube downloader that serves video or audio, thumbnails and video data via FastAPI.
#### Included web client that communicates with the API to download videos.

---

## Deployment

#### Both the server and web client have been containerized and deploy on Docker Hub:
- Server: https://hub.docker.com/r/szantoksz/youtube-downloader-server
- Client: https://hub.docker.com/r/szantoksz/youtube-downloader-web-client
- Or ```docker load -i``` the ```.tar``` images from the ```builds``` folder
- There is a deployment guide using ```docker-compose``` in the ```deploy``` folder

---

## Manual Deployment

#### If you choose to deploy the service manually here is a simple guide:

### Server:
- Install Python ```3.13.2```: https://www.python.org/downloads/release/python-3132/
- Install the ```requirements.txt``` in the backend src: ```pip install -r requirements.txt```
- Install FFmpeg: https://ffmpeg.org/download.html
- Add FFmpeg to environment variables
- Run the ```main.py``` file: ```python main.py```

### Web Client:
- Install a servet that runs from the ```web``` server so the index.html file's web path is: ```/pages/index.html```

---

## Features

### Server:
- Download video / audio / thumbnail / video data via yt-dlp
- Transcode video / audio / thumbnail to sueable formats via FFmpeg
- Serve the video / audio / thumbnail / video data via FastAPI

### Web Client:
- Communicate with the API 
- Offer a useable UI

---

## Any other questions

#### If you encounter any questions try reading the ```docs``` first, if that doesn't work, try the issues tab.

---

## Contributing

#### If you want to help out, feel free to do it with pull requests!

---

## License

#### Everything in this repo is licensed under MIT License.
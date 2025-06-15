# Youtube Downloader

#### A yt-dlp & FFmpeg powered YouTube downloader that serves video or audio, thumbnails and video data via FastAPI.
#### Included web client that communicates with the API to download videos.

---

## Deployment

#### Both the server and web client have been containerized and deploy on Docker Hub:
- Server: https://hub.docker.com/r/szantoksz/youtube-downloader-server
- Client: https://hub.docker.com/r/szantoksz/youtube-downloader-web-client
- Or ```docker build``` the images yourself from the ```Dockerfile```
- There is a deployment guide using ```docker-compose``` in the ```deploy``` folder

---

## Manual Deployment

#### If you choose to deploy the service manually here is a simple guide:

### Server:
- Install Python ```3.13.4```: https://www.python.org/downloads/release/python-3134/
- Install the ```requirements.txt``` in the backend src: ```pip install -r requirements.txt```
- Install FFmpeg: https://ffmpeg.org/download.html
- Add FFmpeg to environment variables
- Add ```APP``` environment variable with data: ```szantokszYtDownloader```
- Add ```VER``` environment variable with data: ```1.0.1```
- Run the ```main.py``` file: ```python3 main.py```

### Web Client:
- Install ```caddy``` or any other website server than is able to do environment variables
- Set the ```root``` folder location to the ```web``` folder
- Set the ```/``` path to ```/pages/index.html```
- Set the ```/download``` path to ```/pages/download.html```
- Serve other requests normally
- Add ```APP``` environment variable with data: ```szantokszYtDownloader```
- Add ```VER``` environment variable with data: ```1.0.1```
- Add ```API_URL``` environment variable with the data being the URL to your downloader server's API, structure: ```http(s)://<domain/ip>(:port)/api```

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

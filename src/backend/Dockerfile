FROM python:3.13.4-alpine3.22

# update package libary and ffmpeg
RUN apk add --no-cache ffmpeg

# setup the app environment
WORKDIR /app
COPY . .

# pip install the 3rd-party libaries for the python app
RUN python3 -m pip install --no-cache-dir -r requirements.txt

# expose api port
EXPOSE 8080

# make environment variables
ENV APP="szantokszYtDownloader"
ENV VER="1.0.1"

# run the app from the main.py file
CMD ["python3", "main.py"]

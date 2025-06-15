# API Endpoints

### ```/api/about```:
- ```GET``` request
- Retruned data example:
```json
{
  "APP": "szantokszYtDownloader",
  "VER": "1.0.1"
}
```
- Shows basic metadata

---

### ```/api/download/<video/audio>/<encoded-url>```:
- ```POST``` request
- Returned data example:
```json
["ZgBW5r"]
```
- This is the Job ID
- Reaplce ```<video/audio>``` with the format you want the video to be downloaded in.
- Reaplace ```<encoded-url>``` with the percent-encoded YouTube URL.
- After the download is completed the job id will expire in 15 minutes.

---

### ```/api/get/<job-id>/data```:
- ```GET``` request
- Returned data example:
```json
{
  "status": "Done",
  "title": "Rick Astley - Never Gonna Give You Up (Official Video) (4K Remaster)",
  "duration": "03:33"
}
```
- status shows the actual status of the download process
- title and duration is self explanatory
- replace ```<job-id>``` with the actual job id.

---

### ```/api/get/<job-id>/thumbnail```:
- ```GET``` request
- Return a data stream of the video's thumbnail in ```PNG```.
- Size: 1280x720 pixels.
- replace ```<job-id>``` with the actual job id.

---

### ```/api/get/<job-id>/content```:
- ```GET``` request
- Return a data stream of the video's in either ```.mp4``` or ```.mp3``` it depends on if you called video or audio in the download.
- replace ```<job-id>``` with the actual job id.

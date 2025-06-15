// organize status (video download status) handler in class
export class StatusHandler {
  // define a function to set the status to getting data
  static async set_getting_data() {
    // fetch the getting data component
    const response = await fetch("../../../../components/download/getting_data.html")

    // read the response (raw html)
    const html = await response.text()

    // insert the html onto the status displaying element
    document.getElementById("status").innerHTML = html;
  }
  
  // define a function to set the status to downloading thumbnail
  static async set_downloading_thumbnail() {
    // fetch the getting data component
    const response = await fetch("../../../../components/download/downloading_thumbnail.html")

    // read the response (raw html)
    const html = await response.text()

    // insert the html onto the status displaying element
    document.getElementById("status").innerHTML = html;
  }

  // define a function to set the status to downloading video
  static async set_downloading_video() {
    // fetch the getting data component
    const response = await fetch("../../../../components/download/downloading_video.html")

    // read the response (raw html)
    const html = await response.text()

    // insert the html onto the status displaying element
    document.getElementById("status").innerHTML = html;
  } 

  // define a function to set the status to downloading audio
  static async set_downloading_audio() {
    // fetch the getting data component
    const response = await fetch("../../../../components/download/downloading_audio.html")

    // read the response (raw html)
    const html = await response.text()

    // insert the html onto the status displaying element
    document.getElementById("status").innerHTML = html;
  }

  // define a function to set the status to transcoding video and audio together
  static async set_transcoding_video_and_audio_together() {
    // fetch the getting data component
    const response = await fetch("../../../../components/download/transcoding_video_and_audio_together.html")

    // read the response (raw html)
    const html = await response.text()

    // insert the html onto the status displaying element
    document.getElementById("status").innerHTML = html;
  } 

  // define a function to set the status to transcoding to mp3
  static async set_transcoding_to_mp3() {
    // fetch the getting data component
    const response = await fetch("../../../../components/download/transcoding_to_mp3.html")

    // read the response (raw html)
    const html = await response.text()

    // insert the html onto the status displaying element
    document.getElementById("status").innerHTML = html;
  }

 // define a function to set the status to download (done)
  static async set_download() {
    // fetch the getting data component
    const response = await fetch("../../../../components/download/download.html")

    // read the response (raw html)
    const html = await response.text()

    // insert the html onto the status displaying element
    document.getElementById("status").innerHTML = html;
  }
}

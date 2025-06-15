import { load_components } from "../../common/load_components.js"
import { change_version_text } from "../../common/change_version_text.js"
import { ApiHandler } from "../../common/api.js"
import { InfoHandler } from "./modules/display_info.js" 
import { StatusHandler } from "./modules/display_status.js"
import { download_button_click_detection_init } from "./modules/download_button_click.js"
import { start_countdown } from "./modules/start_countdown.js"

window.addEventListener("DOMContentLoaded", async () => {
  // load header and footer
  await load_components();

  // read the VER from local storage
  const VER = localStorage.getItem("VER");
  
  // change version text to the version
  await change_version_text(VER);

  // get the API_URL and JOB_ID from local storage
  const API_URL = localStorage.getItem("API_URL");
  const JOB_ID = localStorage.getItem("JOB_ID");

  // set job id text
  await InfoHandler.set_job_id_text(JOB_ID);

  // define variables for getting download porcces every second
  let status_current = null;
  let status_old = null;
  let thumbnail_done = false;

  // continnue getting the download status as long as the download is not done
  while (status_current !== "Done") {
    // get data about the download process
    const download_process = await ApiHandler.get_data(API_URL, JOB_ID);

    // check if the download_process is null (failed to get status)
    if (download_process === null) {
      // if it is, set the title and duration to ERROR
      InfoHandler.set_title_text("ERROR");
      InfoHandler.set_duration_text("ERROR");
      // stop the app from going any further in the code
      return;
    }

    // if it isn't null (it can get the status) extract the status from it
    status_current = download_process.status;

    // only change the status visual if the current status is different from the old
    if (status_current !== status_old) {
      // make the current status the old status
      status_old = status_current;

      // set the title and duration once BUT only if the proccess gets past the gettting data stage
      if (["DownloadingThumbnail", "TranscodingThumbnail", "DownloadingVideo", "DownloadingAudio", "TranscodingVideoAndAudioTogether", "TranscodingToMp3", "Done"].includes(status_current)) {
        await InfoHandler.set_title_text(download_process.title);
        await InfoHandler.set_duration_text(download_process.duration);
      }

      // set the thumbnail picture once BUT only if the thumbnail hasnt been set yet and the downlaod proccess gets past the thumbnail transcode stage
      if (!thumbnail_done && ["DownloadingVideo", "DownloadingAudio", "TranscodingVideoAndAudioTogether", "Done"].includes(status_current)) {
        // get the thumbnail source path
        const thumbnail_source = await ApiHandler.get_thumbnail_url(API_URL, JOB_ID);
        // set thumbnail source
        await InfoHandler.set_thumbnail_source(thumbnail_source);
        // set the thumbnail status to done
        thumbnail_done = true;
      }

      // change status once per download sttaus change
      switch(status_current) {
        // set status for getting data
        case "GettingData":
          // set status
          await StatusHandler.set_getting_data();
          // break from the switch
          break;
          
        // set status for downloading thumbnail
        case "DownloadingThumbnail":
          // set status
          await StatusHandler.set_downloading_thumbnail();
          // break from the switch
          break;

        // set status for downloading video
        case "DownloadingVideo":
          // set status
          await StatusHandler.set_downloading_video();
          // break from the switch
          break;

        // set status for downloading audio
        case "DownloadingAudio":
          // set status
          await StatusHandler.set_downloading_audio();
          // break from the switch
          break; 

        // set status for transcoding video and audio together
        case "TranscodingVideoAndAudioTogether":
          // set status
          await StatusHandler.set_transcoding_video_and_audio_together();
          // break from the switch
          break;

        // set status for transcoding to mp3
        case "TranscodingToMp3":
          // set status
          await StatusHandler.set_transcoding_to_mp3();
          // break from the switch
          break;
      }
    }

    // add a 1s sleep to prevent crashing
    await new Promise(i => setTimeout(i, 1000));
  }

  // download is done
  
  // load download status
  await StatusHandler.set_download();

  // get download url
  const DOWNLOAD_URL = await ApiHandler.get_download_url(API_URL, JOB_ID);

  // make the download button redirect to the download link
  await download_button_click_detection_init(DOWNLOAD_URL);

  // start the 15 minute countdown
  await start_countdown();
});

import { verify_download_type } from "./verify_download_type.js"
import { verify_download_url } from "./verify_download_url.js"
import { display_error_message, display_error } from "./display_error.js"
import { ApiHandler } from "../../../common/api.js"

// define a function that adds click detection to the download button and does the workflow
export async function download_button_click_detection_init() {
  document.getElementById("download").addEventListener("click", async function () {
    // get the download type
    const DOWNLOAD_TYPE = document.getElementById("type").value;

    // check if the download type is valid or not
    const download_type_valid = await verify_download_type(DOWNLOAD_TYPE);
    if (download_type_valid == false) {
      // if it is invalid, display error message
      await display_error_message("Type must either be video or audio.");
      // stop the app from going any further in the code
      return;
    }

    // get the download url
    const DOWNLOAD_URL = document.getElementById("url").value;

    // check if the download url is valid or not
    const download_url_valid = await verify_download_url(DOWNLOAD_URL);
    if (download_url_valid == false) {
      // if it is invalid, diplay an error message
      await display_error_message("URL must be a valid YouTube URL.");
      // stop the app from going any further in the code
      return;
    }
    
    // precent-ecode the downlaod url
    const DOWNLOAD_URL_ENCODED = encodeURIComponent(DOWNLOAD_URL);

    // everything passed, call the api to download
    // get the api url from local storage
    const API_URL = localStorage.getItem("API_URL");
    const api_server_download_response = await ApiHandler.download(API_URL, DOWNLOAD_TYPE, DOWNLOAD_URL_ENCODED);

    // check if the response is null (failed to communicate)
    if (api_server_download_response === null) {
      // if it is, display error
      await display_error("Videos can't be downloaded because the app failed to communicate with the API server.");
      // stop the app from going any further in the code
      return;
    }

    // all the checks passed (video is downloading)
    // add job id to local storage
    localStorage.setItem("JOB_ID", api_server_download_response);

    // switch to the download page
    window.location.href = "/download"
  });
}

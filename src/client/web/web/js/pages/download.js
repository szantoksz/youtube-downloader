import { change_version_text } from "../version_text.js";
import { api_download_data, api_download_thumbnail_url, get_download_url } from "../api.js"
import { set_button_args, start_countdown } from "../download_href.js";

async function set_job_id_text(job_id) {
    document.getElementById("job_id_helper").textContent = job_id;
}

async function set_title_text(text) {
    document.getElementById("title").innerHTML = text;
}

async function set_duraton_text(text) {
    document.getElementById("duration_helper").textContent = text;
}

async function download() {
    const api_url = localStorage.getItem("api_url");
    const job_id = localStorage.getItem("job_id");

    await set_job_id_text(job_id);

    let status = null;
    let status_current = null;
    let thumbnail_done = false;

    while (status !== "Done") {
        const download_data = await api_download_data(api_url, job_id);

        if (!download_data || !download_data.status) {
            status = null;
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
        }

        status = download_data.status;
        let response = null;
        let data = null;

        // Only do stuff if status changed
        if (status !== status_current) {
            status_current = status;

            // One-time info set (title + duration)
            if (["DownloadingThumbnail", "TranscodingThumbnail", "DownloadingVideo", "DownloadingAudio", "TranscodingVideoAndAudioTogether", "TranscodingToMp3", "Done"].includes(status)) {
                await set_title_text(download_data.title);
                await set_duraton_text(download_data.duration);
            }

            // Only once per status
            switch (status) {
                case "GettingData":
                    response = await fetch("/components/download/getting_data.html");
                    data = await response.text();
                    document.getElementById("status").innerHTML = data;
                    break;
                case "DownloadingThumbnail":
                    response = await fetch("/components/download/downloading_thumbnail.html");
                    data = await response.text();
                    document.getElementById("status").innerHTML = data;
                    break;
                case "TranscodingThumbnail":
                    break;
                case "DownloadingVideo":
                    response = await fetch("/components/download/downloading_video.html");
                    data = await response.text();
                    document.getElementById("status").innerHTML = data;
                    break;
                case "DownloadingAudio":
                    response = await fetch("/components/download/downloading_audio.html");
                    data = await response.text();
                    document.getElementById("status").innerHTML = data;
                    break;
                case "TranscodingVideoAndAudioTogether":
                    response = await fetch("/components/download/transcoding_video_and_audio_together.html");
                    data = await response.text();
                    document.getElementById("status").innerHTML = data;
                    break;
                case "TranscodingToMp3":
                    response = await fetch("/components/download/transcoding_to_mp3.html");
                    data = await response.text();
                    document.getElementById("status").innerHTML = data;
                    break;
            }
        }

        // Fetch thumbnail ONCE when appropriate stage reached
        if (!thumbnail_done && ["DownloadingVideo", "DownloadingAudio", "TranscodingVideoAndAudioTogether", "TranscodingToMp3", "Done"].includes(status)) {
            const thumbnail_src = await api_download_thumbnail_url(api_url, job_id);
            document.getElementById("thumbnail").src = thumbnail_src;
            thumbnail_done = true;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if(status==null) {
        await set_title_text("ERROR");
        await set_duraton_text("ERROR");
    } else {
        const response = await fetch("/components/download/download.html");
        const data = await response.text();
        document.getElementById("status").innerHTML = data;
        const download_url = await get_download_url(api_url, job_id);
        await set_button_args(download_url);
        start_countdown()
    }
    }

window.addEventListener("DOMContentLoaded", async () => {
    const ver = localStorage.getItem("version");
    change_version_text(ver);
    await download();
});
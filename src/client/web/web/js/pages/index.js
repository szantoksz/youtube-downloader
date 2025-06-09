import { change_version_text, read_version_text } from "../version_text.js";
import { api_about, api_download } from "../api.js";

window.addEventListener("DOMContentLoaded", async () => {
    let OK = null;
    let URL = null;
    let APP = null;
    let VER = null;

    try {
        // load the config file
        const response = await fetch("/meta/config.json");
        const data = await response.json();

        // verify that every metadata exists
        if (data.ver != null && data.app != null && data.api_url != null) {
            change_version_text(data.ver);
            OK = true;
            URL = data.api_url;
            APP = data.app;
            VER = data.ver;
        } else {
            const download_button = document.getElementById("download");
            download_button.disabled = true;
            download_button.classList.add("disabled");

            document.getElementById("error_message").innerHTML = "Videos can't be downloaded because the app failed to load some of its metadata.";

            if (data.ver != null) {
                change_version_text(data.ver);
            } else {
                change_version_text("ERROR");
            }
        }
    } catch (error) {
        // if there's an error display it
        const download_button = document.getElementById("download");
        download_button.disabled = true;
        download_button.classList.add("disabled");

        change_version_text("ERROR");

        document.getElementById("error_message").innerHTML = "Videos can't be downloaded because the app failed to load its metadata.";
    }

    // test api server
    if (OK === true) {
        const api_server_about_response = await api_about(URL);

        if(api_server_about_response!=null) {
            if(APP != api_server_about_response.app || VER != api_server_about_response.ver) {
                const download_button = document.getElementById("download");
                download_button.disabled = true;
                download_button.classList.add("disabled");
                if(APP != api_server_about_response.app) {
                    document.getElementById("error_message").innerHTML = "Videos can't be downloaded because the app and API server services don't match.";
                } else {
                    document.getElementById("error_message").innerHTML = "Videos can't be downloaded because the app and API server versions don't match.";
                }
            }
        } else {
            const download_button = document.getElementById("download");
            download_button.disabled = true;
            download_button.classList.add("disabled");

            document.getElementById("error_message").innerHTML = "Videos can't be downloaded because the app failed to establish a connection with the API server.";
        }
    }
});

async function verify_url_bar() {
    const url_value = document.getElementById("url").value;
    if(url_value=="") {
        return false;
    } else {
        const url_prefixes = ["https://www.youtube.com/", "http://www.youtube.com/", "https://youtu.be/", "http://youtu.be/", "https://music.youtube.com/", "http://music.youtube.com/", "https://youtube.com/", "http://youtube.com/", "https://m.youtube.com/", "http://m.youtube.com/"]
        const within_prefix = url_prefixes.some(prefix => url_value.startsWith(prefix));
        if(!within_prefix) {
            return false;
        } else {
            return true;

        }
    }
}

async function encode_url() {
    const url = document.getElementById("url").value;
    const encoded_url = encodeURIComponent(url);
    return encoded_url;
}

async function get_type() {
    const type = document.getElementById("type").value;
    return type;
}

async function verify_type() {
    const type_value = document.getElementById("type").value;
    if(type_value=="none") {
        return false;
    } else {
        return true;
    }
}

async function get_api_url() {
    try {
        const response = await fetch("/meta/config.json");
        const data = await response.json();

        if(data.api_url!=null) {
            return data.api_url;
        } else {
            const download_button = document.getElementById("download");
            download_button.disabled = true;
            download_button.classList.add("disabled");

            document.getElementById("error_message").innerHTML = "Videos can't be downloaded because the app failed to load some of its metadata.";
        }
    } catch (error) {
        const download_button = document.getElementById("download");
        download_button.disabled = true;
        download_button.classList.add("disabled");

        change_version_text("ERROR");

        document.getElementById("error_message").innerHTML = "Videos can't be downloaded because the app failed to load its metadata.";
    }
}

document.getElementById("download").addEventListener("click", async function() {
    const type_valid = await verify_type();

    if(!type_valid) {
        document.getElementById("error_message").innerHTML = "Type must either be video or audio.";
    } else {
        const url_valid = await verify_url_bar();
        if(!url_valid) {
            document.getElementById("error_message").innerHTML = "URL must be a valid YouTube URL.";
        } else {
            const video_url = await encode_url();
            const type = await get_type();
            const api_url = await get_api_url();
            const job_id = await api_download(type, api_url, video_url);
            if(job_id==null) {
                document.getElementById("error_message").innerHTML = "Failed to make download request to API server.";
            } else {
                const ver = read_version_text();
                localStorage.setItem("version", ver);
                localStorage.setItem("api_url", api_url);
                localStorage.setItem("job_id", job_id);
                window.location.href = "/pages/download.html"
            }
        }
    }
});
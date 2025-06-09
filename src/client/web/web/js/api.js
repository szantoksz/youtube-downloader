function cleanup_url(url) {
    if (!url.endsWith("/api")) {
        return url + "/api";
    }
    return url;
}

export async function api_about(url) {
    // make the url /api/about
    const cleaned_up_url = cleanup_url(url);
    const test_url = cleaned_up_url + "/about"

    // try to make the request
    try {
        // read and make into json
        const response = await fetch(test_url);
        const data = await response.json();

        // return the json data
        return data;
    } catch (error) {
        // if there's an error, return null
        return null;
    }
}

export async function api_download(type, api_url, video_url) {
    const cleaned_up_url = cleanup_url(api_url);
    const call_url = cleaned_up_url + "/download/" + type + "/" + video_url

    try {
        const response = await fetch(call_url, {
            method: "POST"
        })
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

export async function api_download_data(api_url, job_id) {
    const cleaned_up_url = cleanup_url(api_url);
    const call_url = cleaned_up_url + "/get/" + job_id + "/data";

    try {
        const response = await fetch(call_url);
        const data = await response.json()

        return data;
    } catch (error) {
        return null;
    }
}

export async function api_download_thumbnail_url(api_url, job_id) {
    const cleaned_up_url = cleanup_url(api_url);
    const call_url = cleaned_up_url + "/get/" + job_id + "/thumbnail";

    return call_url;
}

export async function get_download_url(api_url, job_id) {
    const cleaned_up_url = cleanup_url(api_url);
    const call_url = cleaned_up_url + "/get/" + job_id + "/content";

    return call_url;
}
// organize api handler in a class
export class ApiHandler {
  // define a function that cleanups the url (always ends with /api)
  static cleanup_url(url) {
    if (!url.endsWith("/api")) {
      return url + "/api";
}
    return url;
  }

  // define a function that calls api about and returns the response
  static async about(api_url) {
    // cleanup api url
    const clean_api_url = this.cleanup_url(api_url);

    // make call url (/api/about)
    const call_url = clean_api_url + "/about"

    // try to make the request
    try {
      const response = await fetch(call_url);
      const data = await response.json();

      // return the response
      return data;
    } catch {
      // if it cant make the request, make the returned data null
      return null;
    }
  }

  // define a function that calls api download and returns the job id
  static async download(api_url, download_type, download_url_encoded) {
    // cleanup api url
    const clean_api_url = this.cleanup_url(api_url);

    // make call url (/api/download/<video/audio>/<encoded url>)
    const call_url = clean_api_url + "/download/" + download_type + "/" + download_url_encoded;

    // try to make the request
    try {
      const response = await fetch(call_url, {
        method: "POST"
      });
      const data = await response.json();

      // return the job id
      return data;
    } catch {
      // if it cant make the request, make the returned data null
      return null;
    }
  }

  // define a function that calls the download status data and returns the response
  static async get_data(api_url, job_id) {
    // cleanup the api url
    const clean_api_url = this.cleanup_url(api_url);

    // make call url (/api/get/<job_id>/data)
    const call_url = clean_api_url + "/get/" + job_id + "/data";

    // try to make the request
    try {
      const response = await fetch(call_url);
      const data = await response.json();

      // return the response
      return data;
    } catch {
      // if it cant make the request, return data null
      return null;
    }
  }

  // define a function that return the thumbnail url
  static async get_thumbnail_url(api_url, job_id) {
    // cleanup the api url
    const clean_api_url = this.cleanup_url(api_url);

    // make call url (/api/get/<job_id>/thumbnail)
    const call_url = clean_api_url + "/get/" + job_id + "/thumbnail";

    // return the call url
    return call_url;
  }

  // define a function that retuerns the download url
  static async get_download_url(api_url, job_id) {
    // cleanup the api url
    const clean_api_url = this.cleanup_url(api_url);

    // make call url (/api/get/<job_id>/content)
    const call_url = clean_api_url + "/get/" + job_id + "/content";
    
    // return the call url
    return call_url;
  }
}

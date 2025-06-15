// define a function that verifies the download url to make sure that it's valid
export async function verify_download_url(download_url) {
  // check if the download field is empty
  if (download_url == "") {
    // if it is empty, return false
    return false;
  }

  // check if the url isnt a valid youtube url
  const valid_youtube_url_prefixes = ["https://www.youtube.com/", "http://www.youtube.com/", "https://youtu.be/", "http://youtu.be/", "https://music.youtube.com/", "http://music.youtube.com/", "https://youtube.com/", "http://youtube.com/", "https://m.youtube.com/", "http://m.youtube.com/"]
  // checksum for the if function
  const is_valid = valid_youtube_url_prefixes.some(i => download_url.startsWith(i));

  // check if it's an invalid youtube url
  if(!is_valid) {
    // if it is invalid, return false
    return false;
  }

  // no other tests remain (the url must be valid), return true
  return true;
}

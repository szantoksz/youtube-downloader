// define a function that checks if the download type is valid
export async function verify_download_type(download_type) {
  // check if the download type is invalid
  if (download_type == "none") {
    // if it is invalid, return false
    return false;
  }

  // no other tests remain (download type must be valid), return true
  return true;
}

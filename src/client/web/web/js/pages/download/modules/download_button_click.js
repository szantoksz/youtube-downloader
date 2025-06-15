// define a function that add click detection to the download button and open the url given in the parameter in a new tab
export async function download_button_click_detection_init(href) {
  // click detection
  document.getElementById("download_button").addEventListener("click", function () {
    // open url in new tab
    window.open(href, "_blank");
  });
}

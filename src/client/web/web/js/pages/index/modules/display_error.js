// define a funtion that takes an error message parameter, disables downlaoding video and displays the download message
export async function display_error(error_message) {
  // disable downloading videos
  const download_button = document.getElementById("download");
  download_button.disabled = true;
  download_button.classList.add("disabled");

  // display error text
  document.getElementById("error_message").innerHTML = error_message;
}

// define a function that takes an error message parameter and displayes error message
export async function display_error_message(error_message) {
  // display error text
  document.getElementById("error_message").innerText = error_message;
}

import { load_components } from "../../common/load_components.js"
import { read_environment_variables } from "./modules/read_environment_variables.js"
import { display_error } from "./modules/display_error.js"
import { change_version_text } from "../../common/change_version_text.js"
import { ApiHandler } from "../../common/api.js"
import { download_button_click_detection_init } from "./modules/download_button_click.js"

window.addEventListener("DOMContentLoaded", async () => {
  // load header and footer
  await load_components();

  // read APP, VER and API_URL environment read_environment_variables
  const [APP, VER, API_URL] = await read_environment_variables(["APP", "VER", "API_URL"]);
    
  // check and handle metadata errors
  if (APP === null && VER === null && API_URL === null) {
    await display_error("Videos can't be downloaded because the app failed to load all of its metadata.");
    // change version text to error
    await change_version_text("ERROR");
    // stop the app from going any further in the code
    return;
  } else if (APP === null || VER === null || API_URL === null) {
    await display_error("Videos can't be downloaded because the app failed to load some of its metadata.")
    // check if the app can load the version
    if (VER !== null) {
      // if it can load it
      await change_version_text(VER);
    }
    // stop the app from going any further in the code
    return;
  }

  // change version text to the version
  await change_version_text(VER);

  // call the api to get it's metadata
  const api_server_about_response = await ApiHandler.about(API_URL);

  // check if the response if null (failed to communicate)
  if (api_server_about_response === null) {
    // if it is, display error
    await display_error("Videos can't be downloaded because the app failed to communicate with the API server.");
    // stop the app from going any further in the code
    response;
  }

  // get the api's APP and VER
  const API_APP = api_server_about_response.APP;
  const API_VER = api_server_about_response.VER;

  // check if the app's and api's APP or VER dont match up
  if (APP != API_APP || VER != API_VER) {
    // if they dont, display error
    await display_error("Videos can't be downloaded because the app's and API server's metadata don't match.");
    // stop the app from going any further in the code
    return;
  }
  
  // put the app's VER and API_URL into local storage
  localStorage.setItem("VER", VER);
  localStorage.setItem("API_URL", API_URL);

  // initialize download button
  await download_button_click_detection_init();
});

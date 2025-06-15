// organize info (video info) handler in class
export class InfoHandler {
  // define a function to change job id text
  static set_job_id_text(job_id) {
    // change job id text
    document.getElementById("job_id_helper").textContent = job_id;
  }

  // define a function to change title text
  static set_title_text(title) {
    // change title text
    document.getElementById("title").innerHTML = title;
  }

  // define a function to change duration text
  static set_duration_text(duration) {
    // change duration text
    document.getElementById("duration_helper").textContent = duration;
  }
  
  // define a function to set the thumbnail image
  static set_thumbnail_source(source) {
    // change the thumbnail source
    document.getElementById("thumbnail").src = source;
  }
}

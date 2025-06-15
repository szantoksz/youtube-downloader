// define a function that starts a 15 minute countdown and after it runs out it redirects to the mai npage
export function start_countdown() {
  // define the timer text
  const timer_text = document.getElementById("time_left");
  
  // define the duration in ms (1st number is the minutes)
  const duration = 15 * 60 * 1000;

  // define when the countdown ends with the date so it always has accurate time
  const time_end = Date.now() + duration;

  // define a fucntion to update the timer
  function update() {
    // get the current time
    const time_now = Date.now();

    // calculate the remaining time
    const time_remaining = Math.max(time_end - time_now, 0);

    // calculate the number of minutes remaining
    const time_remaining_minutes = Math.floor(time_remaining / 60000);
    
    // calculate the number of seconds remaining
    const time_remaining_seconds = Math.floor((time_remaining % 60000) / 1000);

    // display the remaining time
    timer_text.textContent = `${String(time_remaining_minutes).padStart(2, "0")}:${String(time_remaining_seconds).padStart(2, "0")}`;

    // check if the remaing time is 0 (coutdown ran out)
    if (time_remaining <= 0) {
      // clear the 1 second update interval
      clearInterval(countdown_interval);

      // redirect to the main page
      window.location.href = "/"
    }
  }

  // initial update call
  update()
  // set an inetrval where the update function gets called every second
  const countdown_interval = setInterval(update, 1000);
}

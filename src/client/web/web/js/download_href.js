export async function set_button_args(href) {
    document.getElementById("download_button").addEventListener("click", function() {
        window.open(href, "_blank");
    });
}

export async function start_countdown() {
  const timer_text = document.getElementById('time_left');
  let time_left = 15 * 60;

  function update_timer() {
    const minutes = Math.floor(time_left / 60);
    const seconds = time_left % 60;
    timer_text.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (time_left <= 0) {
      clearInterval(timer_interval);
      window.location.href = 'index.html';
    }
    time_left--;
  }

  update_timer();
  const timer_interval = setInterval(update_timer, 1000);
}
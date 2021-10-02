let cronometer;

export function resetTime() {
  clearInterval(cronometer);
}

export function startTime() {
  let seconds = 0;
  const segundos = document.getElementById("seconds");
  const minutos = document.getElementById("minutes");

  cronometer = setInterval(function () {
    seconds++;
    let secs = seconds;
    let mins = 0;

    while (secs >= 60) {
      mins++;
      secs -= 60;
    }
    segundos.innerHTML = secs;
    minutos.innerHTML = mins;
  }, 1000);
}

export default {startTime, resetTime };

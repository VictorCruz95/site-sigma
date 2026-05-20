let seconds = 10;
const timerEl = document.getElementById('timer');
const interval = setInterval(() => {
  seconds--;
  timerEl.textContent = seconds;
  if (seconds <= 0) {
    clearInterval(interval);
    window.location.href = 'index.html';
  }
}, 1000);

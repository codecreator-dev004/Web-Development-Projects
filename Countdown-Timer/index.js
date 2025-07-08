const startBtn = document.getElementById("start-btn");
const startInput = document.getElementById("start-input");
const endInput = document.getElementById("end-input");
const inputs = document.querySelectorAll("#countdown-container input");
const message = document.getElementById("message");
const blinker = document.getElementById("blinker");
const liveIndicator = document.getElementById("live-indicator");
let interval;

function updateClock(endDate) {
  const now = new Date();
  const end = new Date(endDate);
  const diff = (end - now) / 1000;

  if (diff <= 0) {
    clearInterval(interval);
    inputs.forEach((input) => (input.value = 0));
    message.classList.remove("hidden");
    blinker.classList.remove("blink");
    liveIndicator.style.display = "none";
    return;
  }

  inputs[0].value = Math.floor(diff / 3600 / 24); // days
  inputs[1].value = Math.floor(diff / 3600) % 24; // hours
  inputs[2].value = Math.floor(diff / 60) % 60; // minutes
  inputs[3].value = Math.floor(diff) % 60; // seconds
}

startBtn.addEventListener("click", () => {
  const startDate = new Date(startInput.value);
  const endDate = new Date(endInput.value);

  if (isNaN(startDate) || isNaN(endDate) || startDate >= endDate) {
    alert("Please enter a valid start and end date.");
    return;
  }

  const now = new Date();
  if (now < startDate) {
    alert("Countdown hasn't started yet. Please wait until the start time.");
    return;
  }

  clearInterval(interval);
  message.classList.add("hidden");
  blinker.classList.add("blink");
  liveIndicator.style.display = "flex";
  updateClock(endDate);
  interval = setInterval(() => updateClock(endDate), 1000);
});

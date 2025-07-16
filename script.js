function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}

setInterval(() => {
  const now = new Date();
  const time = now.toLocaleTimeString();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];

  const day = days[now.getDay()];
  const date = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  document.getElementById("clock").textContent = time;
  document.getElementById("day").textContent = day;
  document.getElementById("date").textContent = date;

  checkAlarm(now);
}, 1000);

// Alarm
let alarmTime = null;
function setAlarm() {
  alarmTime = document.getElementById("alarmTime").value;
  document.getElementById("alarmStatus").textContent = "Alarm set for " + alarmTime;
}

function checkAlarm(current) {
  if (!alarmTime) return;
  const now = current.toTimeString().substring(0, 5);
  if (now === alarmTime) {
    playBeep();
    alert("⏰ Alarm Ringing!");
    alarmTime = null;
    document.getElementById("alarmStatus").textContent = "";
  }
}

// Stopwatch
let swInterval, swSeconds = 0;
function updateStopwatch() {
  let hrs = Math.floor(swSeconds / 3600);
  let mins = Math.floor((swSeconds % 3600) / 60);
  let secs = swSeconds % 60;
  document.getElementById("stopwatch").textContent =
    `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
function startStopwatch() {
  if (swInterval) return;
  swInterval = setInterval(() => {
    swSeconds++;
    updateStopwatch();
  }, 1000);
}
function stopStopwatch() {
  clearInterval(swInterval);
  swInterval = null;
}
function resetStopwatch() {
  stopStopwatch();
  swSeconds = 0;
  updateStopwatch();
}

// Timer
let timerInterval, timerSeconds = 0;
function startTimer() {
  timerSeconds = parseInt(document.getElementById("timerInput").value);
  if (isNaN(timerSeconds) || timerSeconds <= 0) return;
  updateTimer();
  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimer();
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      playBeep();
      alert("⏳ Timer Done!");
    }
  }, 1000);
}

function updateTimer() {
  let mins = Math.floor(timerSeconds / 60);
  let secs = timerSeconds % 60;
  document.getElementById("timerDisplay").textContent =
    `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Beep Sound
function playBeep() {
  const beep = document.getElementById("beep");
  beep.currentTime = 0;
  beep.play();
}

// Theme Toggle with Label Switch
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById("themeToggle");

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    btn.textContent = "☀️ Light Mode";
  } else {
    btn.textContent = "🌙 Dark Mode";
  }
}

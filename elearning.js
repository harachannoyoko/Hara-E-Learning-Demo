// === CONFIG ===
const GAS_PROGRESS_URL = "https://script.google.com/macros/s/AKfycbzTTyobSPZ_Gg-elLDRvbP2HlrCkZEbN_I2Fs7Fx_yQnIsE5km_ObUplyD_cFwcs9x8/exec";

// === ELEMENTS ===
const video = document.getElementById('trainingVideo');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const logDiv = document.getElementById('log');
const btnComplete = document.getElementById('btnComplete');

// === SESSION INFO ===
const sessionId = localStorage.getItem('sessionId');
const employeeId = localStorage.getItem('employeeId');
const name = localStorage.getItem('name');
const videoId = "VID001";

document.getElementById('displayName').innerText = name || "ไม่ทราบชื่อ";

// === LOG FUNCTION ===
function addLog(msg) {
  const time = new Date().toLocaleTimeString();
  logDiv.innerHTML += `<div>[${time}] ${msg}</div>`;
  logDiv.scrollTop = logDiv.scrollHeight;
}

// === SAVE PROGRESS FUNCTION ===
function saveProgress(progress) {
  fetch(GAS_PROGRESS_URL, {
    method: 'POST',
    body: JSON.stringify({
      sessionId,
      employeeId,
      name,
      videoId,
      progress
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "success") {
      addLog(`Progress saved: ${progress}%`);
    } else {
      addLog(`Error saving progress`);
    }
  })
  .catch(err => addLog("Fetch error: " + err));
}

// === AUTO UPDATE PROGRESS EVERY 10 SECONDS ===
setInterval(() => {
  if (!video.duration || video.duration === 0) return;
  const progress = Math.floor((video.currentTime / video.duration) * 100);
  progressText.textContent = progress + "%";
  progressFill.style.width = progress + "%";
  saveProgress(progress);
}, 10000);

// === COMPLETE BUTTON ===
btnComplete.addEventListener('click', () => {
  saveProgress(100);
  progressText.textContent = "100%";
  progressFill.style.width = "100%";
  addLog("✅ Video marked as complete");
});

// === LOGOUT ===
document.getElementById('btnLogout').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = "index.html";
});

// === QUIZ BUTTON ===
document.getElementById('btnQuiz').addEventListener('click', () => {
  window.location.href = "quiz.html"; // สร้างหน้า quiz ต่อภายหลัง
});

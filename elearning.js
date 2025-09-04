// ---------------------- CONFIG ----------------------
const GAS_PROGRESS_URL = "https://script.google.com/macros/s/AKfycbzTTyobSPZ_Gg-elLDRvbP2HlrCkZEbN_I2Fs7Fx_yQnIsE5km_ObUplyD_cFwcs9x8/exec";
const VIDEO_ID = "13puKcmpSmgCDFydEccWTG_kC4w0aW8xK";

// *** NOTE ***
// Session ID, Employee ID, และ Name สามารถดึงจาก sessionStorage หรือจากระบบ login จริง
const SESSION_ID = sessionStorage.getItem("sessionId") || "S001";
const EMPLOYEE_ID = sessionStorage.getItem("employeeId") || "EMP001";
const USER_NAME = sessionStorage.getItem("name") || "Test User";

// ---------------------- ELEMENTS ----------------------
const video = document.getElementById('learningVideo');
const progressDisplay = document.getElementById('progressDisplay');
const saveProgressBtn = document.getElementById('saveProgressBtn');
const logoutBtn = document.getElementById('btnLogout');
const logBox = document.getElementById('log');

document.getElementById('displayName').textContent = USER_NAME;
document.getElementById('videoIdLabel').textContent = VIDEO_ID;

// ---------------------- FUNCTIONS ----------------------

// Log Helper
function log(message) {
  console.log(message);
  logBox.innerHTML += message + "<br>";
  logBox.scrollTop = logBox.scrollHeight;
}

// Update progress display
video.addEventListener('timeupdate', () => {
  if (!video.duration) return;
  const progress = (video.currentTime / video.duration) * 100;
  progressDisplay.textContent = `Progress: ${progress.toFixed(2)}%`;
});

// Save progress to Google Sheet via GAS
async function saveProgress() {
  if (!video.duration) {
    alert("วิดีโอยังโหลดไม่เสร็จ");
    return;
  }

  const progress = (video.currentTime / video.duration) * 100;

  const payload = {
    sessionId: SESSION_ID,
    name: USER_NAME,
    employeeId: EMPLOYEE_ID,
    videoId: VIDEO_ID,
    progress: progress.toFixed(2),
    event: "progress"
  };

  log("กำลังบันทึก Progress...");
  try {
    await fetch(GAS_PROGRESS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    log("✅ Progress ถูกบันทึกแล้ว: " + progress.toFixed(2) + "%");
    alert("Progress ถูกบันทึกเรียบร้อยแล้ว!");
  } catch (error) {
    log("❌ Error: " + error.message);
    alert("เกิดข้อผิดพลาดในการบันทึก Progress");
  }
}

// Logout
logoutBtn.addEventListener('click', () => {
  sessionStorage.clear();
  window.location.href = "index.html";
});

// Event Listeners
saveProgressBtn.addEventListener('click', saveProgress);

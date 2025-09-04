// === CONFIG ===
const GAS_PROGRESS_URL = "https://script.google.com/macros/s/AKfycbyiZeKZD8FgZOUL2Nlh2pyypb1cPU7iG9tMXrx_KHgPNSpEIMlS0BAo9MYengtpyyKDlA/exec";
const VIDEO_ID = "13puKcmpSmgCDFydEccWTG_kC4w0aW8xK"; // Google Drive file ID
const VIDEO_URL = `https://drive.google.com/uc?export=download&id=${VIDEO_ID}`;

// === DOM Elements ===
const logBox = document.getElementById("log");
const displayName = document.getElementById("displayName");
const videoPlayer = document.getElementById("videoPlayer");
const videoSource = document.getElementById("videoSource");

// === Session Info ===
const name = sessionStorage.getItem("name");
const employeeId = sessionStorage.getItem("employeeId");

// === Helpers ===
function log(msg){
  logBox.innerHTML += msg + "<br>";
  logBox.scrollTop = logBox.scrollHeight;
}

// === INIT ===
if(!name || !employeeId){
  alert("⚠️ ไม่พบ session กรุณาเข้าสู่ระบบใหม่");
  window.location.href = "index.html";
} else {
  displayName.textContent = name;
  videoSource.src = VIDEO_URL;
  videoPlayer.load();
  log("✅ โหลดวิดีโอเรียบร้อย");
}

// === Event: Update Progress ===
document.getElementById("btnPing").addEventListener("click", ()=>{
  const progress = Math.round((videoPlayer.currentTime / videoPlayer.duration) * 100);
  const payload = {
    event: "video_progress",
    videoId: VIDEO_ID,
    name: name,
    employeeId: employeeId,
    progress: progress,
    timestamp: new Date().toISOString()
  };

  fetch(GAS_PROGRESS_URL, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(r => r.json())
  .then(data => log(`📡 Progress updated: ${progress}%`))
  .catch(err => log("❌ Error: "+err));
});

// === Event: Quiz (placeholder) ===
document.getElementById("btnQuiz").addEventListener("click", ()=>{
  alert("ฟีเจอร์ Quiz ยังไม่เปิดใช้งานครับ");
});

// === Event: Logout ===
document.getElementById("btnLogout").addEventListener("click", ()=>{
  sessionStorage.clear();
  window.location.href = "index.html";
});

const ENDPOINT = "https://script.google.com/macros/s/AKfycbxYvpBYs3UhTOK-9ZMSlOGP_kilYysbCylKdNc5mMmCDHZ7MXclyktt4-U4eYwl-NDvuw/exec";
let currentSessionId = null;

function logMessage(msg) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += msg + "<br>";
  logBox.scrollTop = logBox.scrollHeight;
}

function sendEvent(params) {
  if (currentSessionId) params.sessionId = currentSessionId;

  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");

  const url = `${ENDPOINT}?${query}`;

  return fetch(url, { method: "GET" })
    .then(r => r.json())
    .then(data => {
      console.log("Response:", data);
      logMessage("✅ ส่ง event: " + JSON.stringify(params));
    })
    .catch(err => {
      console.error("Fetch error:", err);
      logMessage("❌ Error: " + err);
    });
}

function login(name, empId, videoId='') {
  currentSessionId = Date.now() + "_" + Math.floor(Math.random() * 1000);
  sendEvent({ event: "login", name, employeeId: empId, videoId });
}

function ping(progress, videoId='') {
  sendEvent({ event: "ping", progress: progress.toFixed(2), videoId });
}

function quiz(quizId, quizCorrect, videoId='') {
  sendEvent({ event: "quiz", quizId, quizCorrect, videoId });
}

function resetSession() {
  if (!currentSessionId) {
    logMessage("⚠️ ยังไม่มี session ให้ resume, ต้อง Login ก่อน");
    return;
  }
  logMessage("🔄 Session ถูก reset/resume: " + currentSessionId);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnLogin").addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const empId = document.getElementById("employeeId").value.trim();
    const videoId = document.getElementById("videoId").value.trim();
    const empIdPattern = /^\d{6}$/;

    if (!name || !empId) {
      logMessage("⚠️ ต้องกรอกชื่อและรหัสพนักงานก่อนนะ");
      return;
    }
    if (!empIdPattern.test(empId)) {
      logMessage("⚠️ รหัสพนักงานต้องเป็นตัวเลข 6 หลักเท่านั้น");
      return;
    }

    login(name, empId, videoId);
  });

  document.getElementById("btnPing").addEventListener("click", () => {
    const videoId = document.getElementById("videoId").value.trim();
    ping(Math.random() * 100, videoId);
  });

  document.getElementById("btnQuiz").addEventListener("click", () => {
    const videoId = document.getElementById("videoId").value.trim();
    quiz("Q1", Math.random() > 0.5, videoId);
  });

  document.getElementById("btnReset").addEventListener("click", () => {
    resetSession();
  });
});

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

function login(name, empId) {
  currentSessionId = Date.now() + "_" + Math.floor(Math.random() * 1000);
  sendEvent({ action: "login", name, empId });
}

function ping(progress, videoId = '') {
  sendEvent({ action: "ping", progress: progress.toFixed(2), videoId });
}

function quiz(questionId, correct, videoId = '') {
  sendEvent({ action: "quiz", qid: questionId, correct, videoId });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnLogin").addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const empId = document.getElementById("employeeId").value.trim();
    const empIdPattern = /^\d{6}$/;

    if (!name || !empId) {
      logMessage("⚠️ ต้องกรอกชื่อและรหัสพนักงานก่อนนะ");
      return;
    }
    if (!empIdPattern.test(empId)) {
      logMessage("⚠️ รหัสพนักงานต้องเป็นตัวเลข 6 หลักเท่านั้น");
      return;
    }

    login(name, empId);
  });

  document.getElementById("btnPing").addEventListener("click", () => {
    ping(Math.random() * 100, 'VID001'); // ใส่ videoId ตัวอย่าง
  });

  document.getElementById("btnQuiz").addEventListener("click", () => {
    quiz("Q1", Math.random() > 0.5, 'VID001');
  });
});

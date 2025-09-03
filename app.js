// กำหนด endpoint ของ Google Apps Script (หรือ backend ที่พี่ใช้)
const ENDPOINT = "https://script.google.com/macros/s/AKfycbxYvpBYs3UhTOK-9ZMSlOGP_kilYysbCylKdNc5mMmCDHZ7MXclyktt4-U4eYwl-NDvuw/exec";

// ฟังก์ชัน log ลงกล่องข้อความ
function logMessage(msg) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += msg + "<br>";
  logBox.scrollTop = logBox.scrollHeight;
}

// ฟังก์ชันยิง event ไปยัง GAS
function sendEvent(params) {
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

// ฟังก์ชันย่อยแต่ละ action
function login(name, empId) {
  sendEvent({ action: "login", name, empId });
}

function ping(progress) {
  sendEvent({ action: "ping", progress: progress.toFixed(2) });
}

function quiz(questionId, correct) {
  sendEvent({ action: "quiz", qid: questionId, correct });
}

// Event listener ตอนกดปุ่ม
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnLogin").addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const empId = document.getElementById("employeeId").value.trim();
    if (!name || !empId) {
      logMessage("⚠️ ต้องกรอกชื่อและรหัสพนักงานก่อนนะ");
      return;
    }
    login(name, empId);
  });

  document.getElementById("btnPing").addEventListener("click", () => {
    ping(Math.random() * 100); // จำลอง progress แบบสุ่ม %
  });

  document.getElementById("btnQuiz").addEventListener("click", () => {
    quiz("Q1", Math.random() > 0.5); // จำลองตอบถูก/ผิด
  });
});

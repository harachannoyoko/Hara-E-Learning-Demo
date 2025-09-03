function logMessage(msg) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += msg + "<br>";
  logBox.scrollTop = logBox.scrollHeight;
}

// ปรับ sendEvent ให้ log ลงหน้าด้วย
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

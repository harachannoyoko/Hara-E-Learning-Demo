// ==========================
// Hara E-Learning Demo app.js
// ==========================

const ENDPOINT = "https://script.google.com/macros/s/AKfycbw-XHnHj_RcnyayLMwYPQHl4DAybLyN4mayGqSYCAeCvi_h9ndlxaDfa0b5a5u2qANe2w/exec";

let state = {
  name: "",
  employeeId: "",
  sessionId: "",
  videoId: "demo"
};

document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");
  const loginBtn = document.getElementById("loginBtn");
  const pingBtn = document.getElementById("pingBtn");

  // ---- Login Form Submit ----
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    state.name = document.getElementById("name").value.trim();
    state.employeeId = document.getElementById("employeeId").value.trim();
    state.sessionId = Math.random().toString(36).substring(2, 10); // สร้าง session id ชั่วคราว

    // ส่งข้อมูล Login → GAS
    const loginUrl = `${ENDPOINT}?event=login&name=${encodeURIComponent(state.name)}&employeeId=${encodeURIComponent(state.employeeId)}&sessionId=${state.sessionId}&note=${encodeURIComponent(navigator.userAgent)}`;
    fetch(loginUrl)
      .then(r => r.json())
      .then(console.log)
      .catch(console.error);

    alert(`Login สำเร็จ! Session: ${state.sessionId}`);
  });

  // ---- Ping Button ----
  pingBtn.addEventListener("click", async () => {
    if (!state.name || !state.employeeId || !state.sessionId) {
      alert("กรุณา login ก่อนส่ง Ping!");
      return;
    }

    const pingUrl = `${ENDPOINT}?event=ping&videoId=${state.videoId}&name=${encodeURIComponent(state.name)}&employeeId=${encodeURIComponent(state.employeeId)}&sessionId=${state.sessionId}&progress=12.34&note=test+write`;
    fetch(pingUrl)
      .then(r => r.json())
      .then(console.log)
      .catch(console.error);

    alert("Ping ส่งเรียบร้อย!");
  });

});

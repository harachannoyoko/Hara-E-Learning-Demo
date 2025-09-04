const nameInput = document.getElementById("name");
const employeeIdInput = document.getElementById("employeeId");
const positionInput = document.getElementById("position");
const departmentInput = document.getElementById("department");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const btnSubmit = document.getElementById("btnSubmit");
const btnReset = document.getElementById("btnReset");
const btnBack = document.getElementById("btnBack");
const logDiv = document.getElementById("log");

// ฟังก์ชันโชว์ Log พร้อมไอคอนและสี
function showLog(message, type="info") {
  let color, icon;
  switch(type) {
    case "error":
      color = "#e74c3c"; // แดง
      icon = "❌";
      break;
    case "success":
      color = "#2ecc71"; // เขียว
      icon = "✅";
      break;
    case "warning":
      color = "#f39c12"; // ส้ม
      icon = "⚠️";
      break;
    default:
      color = "#34495e"; // ดำเข้ม
      icon = "ℹ️";
  }
  const p = document.createElement("p");
  p.innerHTML = `<span style="font-weight:bold; margin-right:6px;">${icon}</span>${message}`;
  p.style.color = color;
  p.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  p.style.margin = "0.2rem 0";
  logDiv.appendChild(p);
  logDiv.scrollTop = logDiv.scrollHeight;
}

// Reset ฟอร์ม
btnReset.addEventListener("click", () => {
  [nameInput, employeeIdInput, positionInput, departmentInput, emailInput, phoneInput].forEach(i => i.value = "");
  logDiv.innerHTML = "";
  showLog("♻ ฟอร์มถูกรีเซ็ตเรียบร้อย", "info");
});

// กลับหน้า Login
btnBack.addEventListener("click", () => {
  window.location.href = "index.html";
});

// Submit ฟอร์ม
btnSubmit.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const employeeId = employeeIdInput.value.trim();
  const position = positionInput.value.trim();
  const department = departmentInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  // ตรวจสอบค่าว่าง
  if (!name || !employeeId || !position || !department || !email || !phone) {
    showLog("กรุณากรอกข้อมูลให้ครบทุกช่อง", "error");
    return;
  }

  // ตรวจสอบอีเมล์ @airportthai.co.th
  if (!email.endsWith("@airportthai.co.th")) {
    showLog("อีเมล์ต้องลงท้ายด้วย @airportthai.co.th", "error");
    return;
  }

  // เรียก Google Apps Script ผ่าน JSONP
  const callbackName = `jsonpCallback_${Date.now()}`;
  window[callbackName] = function(response) {
    if (response.status === "success") {
      showLog("สมัครเรียบร้อยแล้ว", "success");
    } else if (response.status === "duplicate") {
      showLog("รหัสพนักงานหรืออีเมล์ซ้ำ ระบบไม่บันทึก", "warning");
    } else {
      showLog("เกิดข้อผิดพลาด กรุณาลองใหม่", "error");
    }
    delete window[callbackName];
  };

  const script = document.createElement("script");
  const url = `https://script.google.com/macros/s/AKfycbzP2fm5Io9vZvP8GC8pQ7ybdgVZ1QotfUEeGzKomoWZ5xihWmiIqdhrkDz06RXoLBrNvg/exec?name=${encodeURIComponent(name)}&employeeId=${encodeURIComponent(employeeId)}&position=${encodeURIComponent(position)}&department=${encodeURIComponent(department)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&callback=${callbackName}`;
  script.src = url;
  document.body.appendChild(script);
});

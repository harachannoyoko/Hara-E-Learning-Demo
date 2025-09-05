const GAS_URL = "https://script.google.com/macros/s/AKfycbwnvak47K0J86zy1Idn6wnQv2JJyr756qlALQFEkaSeEkMtXDDaj6C1vkAUTEDmjc1HsA/exec";
const logEl = document.getElementById("log");

function log(message) {
  logEl.innerHTML += message + "<br>";
  logEl.scrollTop = logEl.scrollHeight;
}

function clearLog() {
  logEl.innerHTML = "";
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("employeeId").value = "";
  document.getElementById("position").value = "";
  document.getElementById("department").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  clearLog();
}

document.getElementById("btnReset").onclick = resetForm;
document.getElementById("btnBack").onclick = () => { window.location.href = "index.html"; };

document.getElementById("btnSubmit").onclick = () => {
  clearLog();

  const name = document.getElementById("name").value.trim();
  const employeeId = document.getElementById("employeeId").value.trim();
  const position = document.getElementById("position").value.trim();
  const department = document.getElementById("department").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !employeeId || !position || !department || !email || !phone) {
    log("❌ กรุณากรอกข้อมูลให้ครบทุกช่อง");
    return;
  }

  if (!email.endsWith("@airportthai.co.th")) {
    log("❌ Email ต้องลงท้ายด้วย @airportthai.co.th");
    return;
  }

  const callbackName = "handleResponse_" + Date.now();
  window[callbackName] = function(response) {
    if(response.status === "duplicate") {
      log("❌ รหัสพนักงานซ้ำในระบบ");
    } else if(response.status === "success") {
      log("✅ สมัครสำเร็จ!");
      resetForm();
    } else {
      log("❌ เกิดข้อผิดพลาด: " + (response.message || "Unknown"));
    }
    delete window[callbackName];
  };

  const script = document.createElement("script");
  script.src = `${GAS_URL}?callback=${callbackName}&name=${encodeURIComponent(name)}&employeeId=${encodeURIComponent(employeeId)}&position=${encodeURIComponent(position)}&department=${encodeURIComponent(department)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;
  document.body.appendChild(script);
};

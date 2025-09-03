const ENDPOINT_REG = "YOUR_REGISTRATION_GAS_URL_HERE"; // ใส่ URL ของ Web App

function logMessage(msg){
  const logBox = document.getElementById("log");
  if(logBox){ logBox.innerHTML = msg + "<br>"; logBox.scrollTop = logBox.scrollHeight; } 
  else { console.log(msg); }
}

function checkLogin(name, empId){
  if(!name || !empId){
    logMessage("⚠️ ต้องกรอกชื่อและรหัสพนักงานก่อนนะ");
    return;
  }

  fetch(ENDPOINT_REG, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, employeeId: empId, action: "check" })
  })
  .then(r => r.json())
  .then(data => {
    if(data.status === "found"){
      logMessage("✅ Login สำเร็จ!");
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("employeeId", empId);
      window.location.href = "elearning.html";
    } else {
      logMessage("❌ ไม่พบผู้ใช้นี้ กรุณาลงทะเบียนก่อน");
    }
  })
  .catch(err => logMessage("❌ Error: "+err));
}

document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("btnLogin").addEventListener("click", ()=>{
    const name = document.getElementById("name").value.trim();
    const empId = document.getElementById("employeeId").value.trim();
    checkLogin(name, empId);
  });

  document.getElementById("btnRegister").addEventListener("click", ()=>{
    window.location.href = "registration.html";
  });
});

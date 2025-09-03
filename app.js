const ENDPOINT_REG = "https://script.google.com/macros/s/AKfycbyk7I7l1884g-xu_VS92znYM3V51_fl1NLHkkJTv4_3E7nNv3qjWp_wyuaOMKYyAYWf3g/exec"; // ใส่ URL ของ GAS

function logMessage(msg, isError=false){
  const logBox = document.getElementById("log");
  if(logBox){
    logBox.innerHTML = msg;
    logBox.style.color = isError ? "red":"green";
  } else {
    console.log(msg);
  }
}

function checkLogin(name, empId){
  if(!name || !empId){
    logMessage("⚠️ ต้องกรอกชื่อและรหัสพนักงานก่อนนะ", true);
    return;
  }

  fetch(ENDPOINT_REG, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, employeeId: empId, action:"check" })
  })
  .then(r=>r.json())
  .then(data=>{
    if(data.status === "found"){
      logMessage("✅ Login สำเร็จ!");
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("employeeId", empId);
      window.location.href = "elearning.html"; // หน้าเรียน
    } else {
      logMessage("❌ ไม่พบผู้ใช้นี้ กรุณาลงทะเบียนก่อน", true);
    }
  })
  .catch(err=> logMessage("❌ Login Error", true));
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

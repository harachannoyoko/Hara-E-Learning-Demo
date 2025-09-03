// === ENDPOINT Registration Sheet ===
const ENDPOINT_REG = "https://script.google.com/macros/s/AKfycbzsvHl_kbagbXJ2-lMWdsG2uXDqYgDlCAcAkwhpcNZ-ox8Xp4DzBWJJWP798XZFHHUpmg/exec";

// === ฟังก์ชัน log ===
function logMessage(msg, isSensitive=false){
  const logBox=document.getElementById("log");
  let displayMsg=msg;
  if(isSensitive){ displayMsg=msg.split(":")[0]+": [ข้อมูลถูกซ่อนไว้]"; }
  if(logBox){ logBox.innerHTML+=displayMsg+"<br>"; logBox.scrollTop=logBox.scrollHeight; } 
  else { console.log(displayMsg); }
}

function checkLogin(name, empId){
  if(!name||!empId){ logMessage("⚠️ ต้องกรอกชื่อและรหัสพนักงานก่อนนะ"); return; }

  const url=`${ENDPOINT_REG}?name=${encodeURIComponent(name)}&employeeId=${encodeURIComponent(empId)}&action=check`;
  fetch(url)
    .then(r=>r.json())
    .then(data=>{
      if(data.status==="found"){
        logMessage("✅ Login สำเร็จ!", true);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("employeeId", empId);
        window.location.href="elearning.html";
      } else {
        logMessage("❌ ไม่พบผู้ใช้นี้ กรุณาลงทะเบียนก่อน");
      }
    })
    .catch(err=>{ logMessage("❌ Login Error", true); });
}

// === ฟังก์ชันเช็ค Login ===
function checkLogin(name, empId){
  if(!name || !empId){
    logMessage("⚠️ ต้องกรอกชื่อและรหัสพนักงานก่อนนะ");
    return;
  }

  // GET check กับ Registration Sheet
  const url = `${ENDPOINT_REG}?name=${encodeURIComponent(name)}&employeeId=${encodeURIComponent(empId)}&action=check`;
  fetch(url)
    .then(r => r.json())
    .then(data => {
      if(data.status === "found"){
        logMessage("✅ Login สำเร็จ!");
        // เก็บ session แบบง่าย
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("employeeId", empId);
        // redirect ไปหน้า elearning
        window.location.href = "elearning.html";
      } else {
        logMessage("❌ ไม่พบผู้ใช้นี้ กรุณาลงทะเบียนก่อน");
      }
    })
    .catch(err => { logMessage("❌ Error: "+err); });
}

// === DOM Ready ===
document.addEventListener("DOMContentLoaded", ()=>{
  const btnLogin = document.getElementById("btnLogin");
  const btnRegister = document.getElementById("btnRegister");

  if(btnLogin){
    btnLogin.addEventListener("click", ()=>{
      const name = document.getElementById("name").value.trim();
      const empId = document.getElementById("employeeId").value.trim();
      checkLogin(name, empId);
    });
  }

  if(btnRegister){
    btnRegister.addEventListener("click", ()=>{
      // กลับไปหน้าลงทะเบียน
      window.location.href = "registration.html";
    });
  }
});


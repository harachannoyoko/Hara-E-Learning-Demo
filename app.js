// === ENDPOINT ===
const ENDPOINT_REG = "https://script.google.com/macros/s/AKfycbzsvHl_kbagbXJ2-lMWdsG2uXDqYgDlCAcAkwhpcNZ-ox8Xp4DzBWJJWP798XZFHHUpmg/exec"; // Registration Sheet

function logMessage(msg){
  const logBox = document.getElementById("log");
  if(logBox){
    logBox.innerHTML += msg+"<br>";
    logBox.scrollTop = logBox.scrollHeight;
  } else console.log(msg);
}

// --- ตรวจสอบ Login ---
function checkLogin(name, employeeId){
  const url = `${ENDPOINT_REG}?action=check&name=${encodeURIComponent(name)}&employeeId=${encodeURIComponent(employeeId)}`;
  fetch(url)
    .then(r=>r.json())
    .then(res=>{
      if(res.status==="success" && res.exists){
        logMessage("✅ ล็อกอินสำเร็จ!");
        showDashboard(name);
      } else {
        logMessage("❌ ชื่อหรือรหัสพนักงานไม่ถูกต้อง");
      }
    })
    .catch(err=>{ logMessage("❌ Error: "+err); });
}

// --- แสดง Dashboard ---
function showDashboard(name){
  document.getElementById("loginForm").style.display="none";
  document.getElementById("dashboard").style.display="block";
  document.getElementById("userName").innerText = name;
}

// --- DOM Ready ---
document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("btnLogin").addEventListener("click", ()=>{
    const name = document.getElementById("name").value.trim();
    const empId = document.getElementById("employeeId").value.trim();
    if(!name || !empId){
      logMessage("⚠️ กรุณากรอกชื่อและรหัสพนักงานก่อนเข้าสู่ระบบ");
      return;
    }
    checkLogin(name, empId);
  });

  document.getElementById("btnLogout").addEventListener("click", ()=>{
    document.getElementById("dashboard").style.display="none";
    document.getElementById("loginForm").style.display="block";
    document.getElementById("name").value="";
    document.getElementById("employeeId").value="";
    logMessage("🔹 ออกจากระบบแล้ว");
  });

  document.getElementById("btnStartLearning").addEventListener("click", ()=>{
    // ลิงก์ไปหน้าหลัก E-Learning
    window.location.href = "elearning.html";
  });
});

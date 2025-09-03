const ENDPOINT_REG = "https://script.google.com/macros/s/AKfycbztSpiCBWgX7d28YiQFuZbe5ssk0gkTJTss2hkoFZSBfQWKsjik2JiB0VdYL3z2DH_f5w/exec"; // ใส่ URL GAS ของ Registration

function logMessage(msg){
  const logBox = document.getElementById("log");
  logBox.innerHTML += msg + "<br>";
  logBox.scrollTop = logBox.scrollHeight;
}

function submitRegistration(){
  const data = {
    name: document.getElementById("name").value.trim(),
    employeeId: document.getElementById("employeeId").value.trim(),
    position: document.getElementById("position").value.trim(),
    department: document.getElementById("department").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim()
  };

  if(!data.name || !data.employeeId){
    logMessage("⚠️ ต้องกรอกชื่อและรหัสพนักงานด้วยนะ");
    return;
  }

  fetch(ENDPOINT_REG, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(r => r.json())
  .then(d => logMessage("✅ สมัครเรียบร้อย: "+ JSON.stringify(d.data)))
  .catch(err => logMessage("❌ Error: "+err));
}

function resetForm(){
  ["name","employeeId","position","department","email","phone"].forEach(id=>{
    document.getElementById(id).value = "";
  });
  logMessage("♻ ฟอร์มถูกรีเซ็ตเรียบร้อย");
}

document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("btnSubmit").addEventListener("click", submitRegistration);
  document.getElementById("btnReset").addEventListener("click", resetForm);
  document.getElementById("btnBack").addEventListener("click", ()=>{
    window.location.href = "index.html"; // ลิงก์ไปหน้า Login
  });

});


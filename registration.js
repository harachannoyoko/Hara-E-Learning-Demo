const ENDPOINT_REG = "https://script.google.com/macros/s/AKfycbzPgMepC4JuX_4C49_2OqzmlfdLwUYgxOITZGG1wRsosu-5fxugrM-XReCLF7oHEAGwqg/exec";

document.getElementById("btnSubmit").addEventListener("click", () => {
  const data = {
    name: document.getElementById("name").value.trim(),
    employeeId: document.getElementById("employeeId").value.trim(),
    position: document.getElementById("position").value.trim(),
    department: document.getElementById("department").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim()
  };

  if(!data.name || !data.employeeId || !data.position || !data.department || !data.email || !data.phone){
    log("⚠️ กรุณากรอกข้อมูลให้ครบทุกช่อง");
    return;
  }

  const callbackName = "registerCallback";
  window[callbackName] = function(res){
    if(res.status === "success"){
      log("✅ สมัครเรียบร้อย!");
      document.getElementById("btnReset").click();
    } else {
      log("❌ เกิดข้อผิดพลาด: " + res.message);
    }
    delete window[callbackName];
    document.body.removeChild(script);
  };

  const script = document.createElement("script");
  script.src = `${ENDPOINT_REG}?name=${encodeURIComponent(data.name)}&employeeId=${encodeURIComponent(data.employeeId)}&position=${encodeURIComponent(data.position)}&department=${encodeURIComponent(data.department)}&email=${encodeURIComponent(data.email)}&phone=${encodeURIComponent(data.phone)}&callback=${callbackName}`;
  document.body.appendChild(script);
});

document.getElementById("btnReset").addEventListener("click", () => {
  document.querySelectorAll("input").forEach(i => i.value = "");
  log("♻ รีเซ็ตข้อมูลเรียบร้อย");
});

document.getElementById("btnBack").addEventListener("click", () => {
  window.location.href = "index.html";
});

function log(msg){
  document.getElementById("log").innerHTML = msg;
}

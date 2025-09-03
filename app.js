document.getElementById("btnLogin").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const empId = document.getElementById("employeeId").value.trim();
  if(!name || !empId) { log("⚠️ กรอกชื่อและรหัสพนักงานด้วยนะ"); return; }

  const script = document.createElement("script");
  const callbackName = "loginCallback";
  window[callbackName] = function(data) {
    if(data.status === "found") {
      log("✅ Login สำเร็จ!");
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("employeeId", empId);
      window.location.href = "elearning.html";
    } else {
      log("❌ ไม่พบผู้ใช้นี้ ลงทะเบียนก่อนนะ");
    }
    document.body.removeChild(script);
    delete window[callbackName];
  };

  script.src = `https://script.google.com/macros/s/AKfycbzPgMepC4JuX_4C49_2OqzmlfdLwUYgxOITZGG1wRsosu-5fxugrM-XReCLF7oHEAGwqg/exec?name=${encodeURIComponent(name)}&employeeId=${encodeURIComponent(empId)}&callback=${callbackName}`;
  document.body.appendChild(script);
});

document.getElementById("btnRegister").addEventListener("click", () => {
  window.location.href = "registration.html";
});

function log(msg) {
  document.getElementById("log").innerHTML = msg;
}

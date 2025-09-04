document.getElementById("btnSubmit").addEventListener("click", function() {
  const name = document.getElementById("name").value.trim();
  const employeeId = document.getElementById("employeeId").value.trim();
  const position = document.getElementById("position").value.trim();
  const department = document.getElementById("department").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const log = document.getElementById("log");

  if (!name || !employeeId) {
    log.textContent = "กรุณากรอกชื่อและรหัสพนักงาน";
    return;
  }

  const scriptURL = "https://script.google.com/macros/s/AKfycbwbXhYyNQQRfBipc6muQvcU_euLgTBqSI7WjpZ1OZ-3uvh1qheuu32JFVCJW_NJlF-8bA/exec";

  // JSONP
  const callbackName = "jsonpCallback_" + Date.now();
  window[callbackName] = function(response) {
    if (response.status === "success") {
      log.textContent = "✅ ลงทะเบียนสำเร็จ!";
      document.getElementById("name").value = "";
      document.getElementById("employeeId").value = "";
      document.getElementById("position").value = "";
      document.getElementById("department").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
    } else {
      log.textContent = "❌ ลงทะเบียนล้มเหลว!";
    }
    // ลบ script หลังโหลดเสร็จ
    document.body.removeChild(scriptTag);
    delete window[callbackName];
  };

  const params = `?callback=${callbackName}&name=${encodeURIComponent(name)}&employeeId=${encodeURIComponent(employeeId)}&position=${encodeURIComponent(position)}&department=${encodeURIComponent(department)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;

  const scriptTag = document.createElement("script");
  scriptTag.src = scriptURL + params;
  document.body.appendChild(scriptTag);
});

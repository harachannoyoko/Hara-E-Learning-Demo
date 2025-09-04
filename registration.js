document.getElementById("btnSubmit").addEventListener("click", function() {
  var name = document.getElementById("name").value;
  var employeeId = document.getElementById("employeeId").value;
  var position = document.getElementById("position").value;
  var department = document.getElementById("department").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var log = document.getElementById("log");

  var script = document.createElement("script");
  var callbackName = "jsonpCallback_" + Date.now();

  window[callbackName] = function(data) {
    if (data.status === "added") {
      log.textContent = "✅ ลงทะเบียนสำเร็จ!";
    } else if (data.status === "duplicate") {
      log.textContent = "⚠ ข้อมูลซ้ำ ไม่สามารถลงทะเบียนได้";
    } else {
      log.textContent = "❌ เกิดข้อผิดพลาด";
    }
    // cleanup
    delete window[callbackName];
    document.body.removeChild(script);
  };

  var url = "https://script.google.com/macros/s/AKfycbwbXhYyNQQRfBipc6muQvcU_euLgTBqSI7WjpZ1OZ-3uvh1qheuu32JFVCJW_NJlF-8bA/exec" +
            "?callback=" + callbackName +
            "&name=" + encodeURIComponent(name) +
            "&employeeId=" + encodeURIComponent(employeeId) +
            "&position=" + encodeURIComponent(position) +
            "&department=" + encodeURIComponent(department) +
            "&email=" + encodeURIComponent(email) +
            "&phone=" + encodeURIComponent(phone);

  script.src = url;
  document.body.appendChild(script);
});

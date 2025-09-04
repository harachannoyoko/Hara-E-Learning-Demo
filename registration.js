// registration.js (JSONP Version)

document.getElementById('btnSubmit').addEventListener('click', function() {
  const name = document.getElementById('name').value.trim();
  const employeeId = document.getElementById('employeeId').value.trim();

  if(!name || !employeeId){
    alert("กรุณากรอกชื่อและรหัสพนักงาน");
    return;
  }

  // สร้าง callback function แบบ global
  window.handleRegistrationResponse = function(response){
    if(response.status === "found"){
      alert("มีข้อมูลอยู่แล้ว!");
    } else {
      alert("ลงทะเบียนสำเร็จ!");
    }
    // ทำความสะอาด script tag
    const script = document.getElementById('jsonpScript');
    if(script) script.remove();
  };

  // สร้าง script tag เพื่อเรียก JSONP
  const script = document.createElement('script');
  script.id = 'jsonpScript';
  const GAS_URL = "https://script.google.com/macros/s/AKfycbwWYf-Q4oeT_NR0EihEwuqs3Jgm8Lbd_eUs2vaLUHmFotkOPwIw2k_jiwhQxT4NM3yJbg/exec"; // ใส่ URL GAS ของพี่ตรงนี้
  script.src = `${GAS_URL}?callback=handleRegistrationResponse&name=${encodeURIComponent(name)}&employeeId=${encodeURIComponent(employeeId)}`;
  document.body.appendChild(script);
});

// รีเซ็ตฟอร์ม
document.getElementById('btnReset').addEventListener('click', function(){
  document.getElementById('name').value = "";
  document.getElementById('employeeId').value = "";
  document.getElementById('position').value = "";
  document.getElementById('department').value = "";
  document.getElementById('email').value = "";
  document.getElementById('phone').value = "";
});

// กลับไปหน้า Login
document.getElementById('btnBack').addEventListener('click', function(){
  window.location.href = "index.html";
});

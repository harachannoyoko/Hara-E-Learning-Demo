const GAS_URL = "https://script.google.com/macros/s/AKfycbwbXhYyNQQRfBipc6muQvcU_euLgTBqSI7WjpZ1OZ-3uvh1qheuu32JFVCJW_NJlF-8bA/exec";

const nameInput = document.getElementById("name");
const empInput = document.getElementById("employeeId");
const posInput = document.getElementById("position");
const deptInput = document.getElementById("department");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const log = document.getElementById("log");

document.getElementById("btnSubmit").addEventListener("click", () => {
  const name = encodeURIComponent(nameInput.value.trim());
  const empId = encodeURIComponent(empInput.value.trim());
  const pos = encodeURIComponent(posInput.value.trim());
  const dept = encodeURIComponent(deptInput.value.trim());
  const email = encodeURIComponent(emailInput.value.trim());
  const phone = encodeURIComponent(phoneInput.value.trim());

  if(!name || !empId){
    log.textContent = "กรุณากรอก ชื่อ-รหัสพนักงาน ให้ครบ!";
    return;
  }

  const url = `${GAS_URL}?name=${name}&employeeId=${empId}&position=${pos}&department=${dept}&email=${email}&phone=${phone}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if(data.status === "success"){
        log.textContent = "✅ ลงทะเบียนสำเร็จ!";
      } else {
        log.textContent = "❌ เกิดข้อผิดพลาด: " + (data.message||"ไม่ทราบ");
      }
    })
    .catch(err => {
      log.textContent = "❌ Fetch error: " + err;
    });
});

document.getElementById("btnReset").addEventListener("click", () => {
  nameInput.value = "";
  empInput.value = "";
  posInput.value = "";
  deptInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  log.textContent = "ฟอร์มถูกรีเซ็ตแล้ว";
});

document.getElementById("btnBack").addEventListener("click", () => {
  window.location.href = "index.html";
});

const formElements = {
  name: document.getElementById("name"),
  employeeId: document.getElementById("employeeId"),
  position: document.getElementById("position"),
  department: document.getElementById("department"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  log: document.getElementById("log")
};

const btnSubmit = document.getElementById("btnSubmit");
const btnReset = document.getElementById("btnReset");
const btnBack = document.getElementById("btnBack");

const GAS_URL = "https://script.google.com/macros/s/AKfycbwbXhYyNQQRfBipc6muQvcU_euLgTBqSI7WjpZ1OZ-3uvh1qheuu32JFVCJW_NJlF-8bA/exec";

function logMessage(msg) {
  formElements.log.innerText = msg;
}

function submitForm() {
  const params = {
    callback: "handleResponse",
    name: formElements.name.value,
    employeeId: formElements.employeeId.value,
    position: formElements.position.value,
    department: formElements.department.value,
    email: formElements.email.value,
    phone: formElements.phone.value
  };

  // สร้าง script tag สำหรับ JSONP
  const script = document.createElement("script");
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");
  script.src = `${GAS_URL}?${query}`;
  document.body.appendChild(script);
}

// callback ของ JSONP
function handleResponse(response) {
  if (response.status === "found") {
    logMessage("ข้อมูลนี้มีอยู่แล้วในระบบ ✅");
  } else if (response.status === "added") {
    logMessage("ลงทะเบียนสำเร็จ 🎉");
    btnReset.click(); // รีเซ็ตฟอร์มอัตโนมัติ
  } else {
    logMessage("เกิดข้อผิดพลาด ❌");
  }
}

btnSubmit.addEventListener("click", submitForm);

btnReset.addEventListener("click", () => {
  Object.keys(formElements).forEach(key => {
    if (formElements[key].tagName === "INPUT") {
      formElements[key].value = "";
    }
  });
  logMessage("Log จะแสดงที่นี่…");
});

btnBack.addEventListener("click", () => {
  window.location.href = "index.html"; // กลับไปหน้า Login
});

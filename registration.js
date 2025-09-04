const scriptURL = "https://script.google.com/macros/s/AKfycbzP2fm5Io9vZvP8GC8pQ7ybdgVZ1QotfUEeGzKomoWZ5xihWmiIqdhrkDz06RXoLBrNvg/exec";
const form = document.getElementById("registration-form");
const employeeInput = document.getElementById("employeeId");
const emailInput = document.getElementById("email");

const employeeError = document.getElementById("employee-error");
const emailError = document.getElementById("email-error");

// ฟังก์ชันตรวจสอบซ้ำ
async function checkDuplicate(field, value) {
  const url = `${scriptURL}?${field}=${encodeURIComponent(value)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.exists;
}

// ตรวจสอบ employeeId แบบ real-time
employeeInput.addEventListener("blur", async () => {
  employeeError.textContent = "";
  if (employeeInput.value.trim() === "") return;
  const exists = await checkDuplicate("employeeId", employeeInput.value.trim());
  if (exists) employeeError.textContent = "❌ รหัสพนักงานนี้มีอยู่แล้ว!";
});

// ตรวจสอบ email แบบ real-time
emailInput.addEventListener("blur", async () => {
  emailError.textContent = "";
  if (emailInput.value.trim() === "") return;
  const exists = await checkDuplicate("email", emailInput.value.trim());
  if (exists) emailError.textContent = "❌ อีเมลนี้มีอยู่แล้ว!";
});

// Submit form
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  employeeError.textContent = "";
  emailError.textContent = "";

  const idExists = await checkDuplicate("employeeId", employeeInput.value.trim());
  const emailExists = await checkDuplicate("email", emailInput.value.trim());

  if (idExists) employeeError.textContent = "❌ รหัสพนักงานนี้มีอยู่แล้ว!";
  if (emailExists) emailError.textContent = "❌ อีเมลนี้มีอยู่แล้ว!";

  if (idExists || emailExists) return;

  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form)
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "success") {
      alert(data.message);
      form.reset();
    } else {
      alert("❌ " + data.message);
    }
  })
  .catch(err => {
    console.error("Error:", err);
    alert("⚠️ เกิดข้อผิดพลาด เชื่อมต่อ server ไม่ได้");
  });
});

const scriptURL = "https://script.google.com/macros/s/AKfycbzP2fm5Io9vZvP8GC8pQ7ybdgVZ1QotfUEeGzKomoWZ5xihWmiIqdhrkDz06RXoLBrNvg/exec";

const nameInput = document.getElementById("name");
const employeeInput = document.getElementById("employeeId");
const positionInput = document.getElementById("position");
const departmentInput = document.getElementById("department");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const employeeError = document.getElementById("employee-error");
const emailError = document.getElementById("email-error");
const logDiv = document.getElementById("log");

// ฟังก์ชันตรวจสอบซ้ำ (GET)
async function checkDuplicate(field, value) {
  try {
    const url = `${scriptURL}?${field}=${encodeURIComponent(value)}&checkOnly=true`;
    const res = await fetch(url);
    const data = await res.json();
    return data.exists;
  } catch (err) {
    logDiv.textContent += "\n❌ Error checking duplicates: " + err;
    return false;
  }
}

// ตรวจสอบ realtime
employeeInput.addEventListener("blur", async () => {
  employeeError.textContent = "";
  if (!employeeInput.value) return;
  const exists = await checkDuplicate("employeeId", employeeInput.value.trim());
  if (exists) employeeError.textContent = "❌ รหัสพนักงานนี้มีอยู่แล้ว!";
});

emailInput.addEventListener("blur", async () => {
  emailError.textContent = "";
  if (!emailInput.value) return;
  const exists = await checkDuplicate("email", emailInput.value.trim());
  if (exists) emailError.textContent = "❌ อีเมลนี้มีอยู่แล้ว!";
});

// Submit
document.getElementById("btnSubmit").addEventListener("click", async (e) => {
  e.preventDefault();
  employeeError.textContent = "";
  emailError.textContent = "";

  const idExists = await checkDuplicate("employeeId", employeeInput.value.trim());
  const emailExists = await checkDuplicate("email", emailInput.value.trim());

  if (idExists) employeeError.textContent = "❌ รหัสพนักงานนี้มีอยู่แล้ว!";
  if (emailExists) emailError.textContent = "❌ อีเมลนี้มีอยู่แล้ว!";
  if (idExists || emailExists) return;

  const formData = new FormData();
  formData.append("name", nameInput.value);
  formData.append("employeeId", employeeInput.value);
  formData.append("position", positionInput.value);
  formData.append("department", departmentInput.value);
  formData.append("email", emailInput.value);
  formData.append("phone", phoneInput.value);

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    logDiv.textContent += "\n✅ " + (data.message || "สมัครเรียบร้อย!");
    formReset();
  } catch (err) {
    logDiv.textContent += "\n⚠️ Error submitting: " + err;
  }
});

// Reset form
document.getElementById("btnReset").addEventListener("click", (e) => {
  e.preventDefault();
  formReset();
});

function formReset() {
  nameInput.value = "";
  employeeInput.value = "";
  positionInput.value = "";
  departmentInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  employeeError.textContent = "";
  emailError.textContent = "";
}

// Back
document.getElementById("btnBack").addEventListener("click", () => {
  window.location.href = "login.html"; // ปรับ path หน้า login ของจริง
});

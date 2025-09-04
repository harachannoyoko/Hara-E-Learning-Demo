const formElements = {
  name: document.getElementById("name"),
  employeeId: document.getElementById("employeeId"),
  position: document.getElementById("position"),
  department: document.getElementById("department"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  log: document.getElementById("log")
};

document.getElementById("btnSubmit").addEventListener("click", async () => {
  const payload = {
    name: formElements.name.value,
    employeeId: formElements.employeeId.value,
    position: formElements.position.value,
    department: formElements.department.value,
    email: formElements.email.value,
    phone: formElements.phone.value
  };

  try {
    const res = await fetch("YOUR_GAS_WEB_APP_EXEC_URL", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    if (data.status === "success") {
      formElements.log.textContent = "✅ ลงทะเบียนสำเร็จ!";
      // รีเซ็ตฟอร์ม
      Object.values(formElements).forEach(el => { if(el.tagName==="INPUT") el.value = ""; });
    } else {
      formElements.log.textContent = "❌ เกิดข้อผิดพลาด";
    }
  } catch (err) {
    formElements.log.textContent = "❌ เกิดข้อผิดพลาด: " + err;
  }
});

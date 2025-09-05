function jsonpCallback(result) {
  const log = document.getElementById("log");
  log.textContent = result.message;
  log.style.color = result.status === "success" ? "green" : "red";
}

document.getElementById("btnSubmit").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const employeeId = document.getElementById("employeeId").value;
  const position = document.getElementById("position").value;
  const department = document.getElementById("department").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const url = `https://script.google.com/macros/s/AKfycbzP2fm5Io9vZvP8GC8pQ7ybdgVZ1QotfUEeGzKomoWZ5xihWmiIqdhrkDz06RXoLBrNvg/exec?name=${encodeURIComponent(name)}&employeeId=${encodeURIComponent(employeeId)}&position=${encodeURIComponent(position)}&department=${encodeURIComponent(department)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&callback=jsonpCallback`;

  const script = document.createElement("script");
  script.src = url;
  document.body.appendChild(script);
});

document.getElementById("btnReset").addEventListener("click", () => {
  document.querySelectorAll("input").forEach(el => el.value = "");
  const log = document.getElementById("log");
  log.textContent = "เคลียร์ข้อมูลแล้ว";
  log.style.color = "black";
});

document.getElementById("btnBack").addEventListener("click", () => {
  window.location.href = "index.html"; // ✅ เปลี่ยนเป็น index.html
});

// === ENDPOINT สำหรับ E-Learning Event ===
const ENDPOINT = "https://script.google.com/macros/s/AKfycbxYvpBYs3UhTOK-9ZMSlOGP_kilYysbCylKdNc5mMmCDHZ7MXclyktt4-U4eYwl-NDvuw/exec";

// === ฟังก์ชัน log ===
function logMessage(msg){
  const logBox=document.getElementById("log");
  logBox.innerHTML += msg+"<br>";
  logBox.scrollTop = logBox.scrollHeight;
}

// === ฟังก์ชันส่ง Event ===
function sendEvent(params){
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");
  const url = `${ENDPOINT}?${query}`;
  fetch(url, { method:"GET" })
    .then(r => r.json())
    .then(data => { logMessage("✅ ส่ง event: "+JSON.stringify(params)); })
    .catch(err => { logMessage("❌ Event Error: "+err); });
}

// === Actions ===
function login(name, empId) { sendEvent({ event:"login", name, employeeId:empId }); }
function ping(name, empId, videoId, progress) { 
  sendEvent({ event:"ping", name, employeeId:empId, videoId, progress: progress.toFixed(2) }); 
}
function quiz(name, empId, videoId, quizId, correct) { 
  sendEvent({ event:"quiz", name, employeeId:empId, videoId, quizId, quizCorrect:correct }); 
}

// === DOM Ready ===
document.addEventListener("DOMContentLoaded", ()=>{
  const btnLogin = document.getElementById("btnLogin");
  const btnPing  = document.getElementById("btnPing");
  const btnQuiz  = document.getElementById("btnQuiz");

  btnLogin.addEventListener("click", ()=>{
    const name = document.getElementById("name").value.trim();
    const empId = document.getElementById("employeeId").value.trim();
    if(!name || !empId){ logMessage("⚠️ กรุณากรอกชื่อและรหัสพนักงาน"); return; }
    login(name, empId);
  });

  btnPing.addEventListener("click", ()=>{
    const name = document.getElementById("name").value.trim();
    const empId = document.getElementById("employeeId").value.trim();
    const videoId = document.getElementById("videoId").value.trim();
    if(!name || !empId || !videoId){ logMessage("⚠️ ต้องกรอกทุกช่อง"); return; }
    ping(name, empId, videoId, Math.random()*100); // จำลอง progress %
  });

  btnQuiz.addEventListener("click", ()=>{
    const name = document.getElementById("name").value.trim();
    const empId = document.getElementById("employeeId").value.trim();
    const videoId = document.getElementById("videoId").value.trim();
    if(!name || !empId || !videoId){ logMessage("⚠️ ต้องกรอกทุกช่อง"); return; }
    quiz(name, empId, videoId, "Q1", Math.random()>0.5); // จำลอง Quiz Correct
  });
});

// === ENDPOINT ===
const ENDPOINT = "https://script.google.com/macros/s/AKfycbxYvpBYs3UhTOK-9ZMSlOGP_kilYysbCylKdNc5mMmCDHZ7MXclyktt4-U4eYwl-NDvuw/exec"; // E-Learning Sheet

// === ฟังก์ชัน log ===
function logMessage(msg){
  const logBox = document.getElementById("log");
  if(logBox){
    logBox.innerHTML += msg + "<br>";
    logBox.scrollTop = logBox.scrollHeight;
  } else {
    console.log(msg);
  }
}

// === ฟังก์ชันส่ง Event E-Learning ===
function sendEvent(params){
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");
  const url = `${ENDPOINT}?${query}`;

  fetch(url, { method: "GET" })
    .then(r => r.json())
    .then(data => { logMessage("✅ ส่ง event: "+JSON.stringify(params)); })
    .catch(err => { logMessage("❌ Event Error: "+err); });
}

// === E-Learning Actions ===
function login(name, empId){ sendEvent({ event:"login", name, employeeId:empId }); }
function ping(progress){ sendEvent({ event:"ping", progress:progress.toFixed(2) }); }
function quiz(questionId, correct){ sendEvent({ event:"quiz", quizId:questionId, quizCorrect:correct }); }

// === DOM Ready ===
document.addEventListener("DOMContentLoaded", ()=>{
  const btnLogin = document.getElementById("btnLogin");
  const btnPing = document.getElementById("btnPing");
  const btnQuiz = document.getElementById("btnQuiz");

  if(btnLogin){
    btnLogin.addEventListener("click", ()=>{
      const name = document.getElementById("name").value.trim();
      const empId = document.getElementById("employeeId").value.trim();
      if(!name || !empId){
        logMessage("⚠️ ต้องกรอกชื่อและรหัสพนักงานก่อนนะ");
        return;
      }
      login(name, empId);
    });
  }

  if(btnPing){
    btnPing.addEventListener("click", ()=>{ ping(Math.random()*100); }); // สุ่ม progress
  }

  if(btnQuiz){
    btnQuiz.addEventListener("click", ()=>{ quiz("Q1", Math.random()>0.5); }); // จำลอง quiz
  }
});

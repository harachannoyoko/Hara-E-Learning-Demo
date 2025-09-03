// === ENDPOINT E-Learning Sheet ===
const ENDPOINT = "https://script.google.com/macros/s/AKfycbxYvpBYs3UhTOK-9ZMSlOGP_kilYysbCylKdNc5mMmCDHZ7MXclyktt4-U4eYwl-NDvuw/exec";

// === ฟังก์ชัน log ===
function logMessage(msg, isSensitive=false){
  const logBox=document.getElementById("log");
  let displayMsg=msg;
  if(isSensitive){ displayMsg=msg.split(":")[0]+": [ข้อมูลถูกซ่อนไว้]"; }
  if(logBox){ logBox.innerHTML+=displayMsg+"<br>"; logBox.scrollTop=logBox.scrollHeight; } 
  else { console.log(displayMsg); }
}

function sendEvent(params){
  const query=Object.keys(params)
    .map(k=>`${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");
  const url=`${ENDPOINT}?${query}`;
  fetch(url, { method:"GET" })
    .then(r=>r.json())
    .then(data=>{
      logMessage(`✅ Event '${params.event || params.quizId}' ส่งสำเร็จ`, true);
    })
    .catch(err=>{
      logMessage("❌ Event Error", true);
    });
}

function login(name, empId){ sendEvent({ event:"login", name, employeeId:empId }); }
function ping(progress){ sendEvent({ event:"ping", progress:progress.toFixed(2) }); }
function quiz(questionId, correct){ sendEvent({ event:"quiz", quizId:questionId, quizCorrect:correct }); }

// === ส่ง event ไป GAS ===
function sendEvent(params){
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");
  const url = `${ENDPOINT}?${query}`;
  fetch(url,{method:"GET"})
    .then(r=>r.json())
    .then(data=>{ logMessage("✅ Event ส่งเรียบร้อย: "+JSON.stringify(params)); })
    .catch(err=>{ logMessage("❌ Error: "+err); });
}

// === Actions ===
function ping(progress){ 
  sendEvent({ event:"ping", videoId:"VID001", name:sessionStorage.getItem("name"), employeeId:sessionStorage.getItem("employeeId"), progress:progress.toFixed(2) });
}
function quiz(questionId, correct){ 
  sendEvent({ event:"quiz", videoId:"VID001", name:sessionStorage.getItem("name"), employeeId:sessionStorage.getItem("employeeId"), quizId:questionId, quizCorrect:correct }); 
}

// === DOM Ready ===
document.addEventListener("DOMContentLoaded", ()=>{
  // ตรวจ session
  const name = sessionStorage.getItem("name");
  const empId = sessionStorage.getItem("employeeId");
  if(!name || !empId){
    alert("⚠️ ยังไม่ได้ล็อกอิน! กลับไปหน้าแรก");
    window.location.href = "index.html";
    return;
  }
  document.getElementById("displayName").textContent = name;

  // ปุ่ม Ping
  document.getElementById("btnPing").addEventListener("click", ()=>{ ping(Math.random()*100); });

  // ปุ่ม Quiz
  document.getElementById("btnQuiz").addEventListener("click", ()=>{ quiz("Q1", Math.random()>0.5); });

  // Logout
  document.getElementById("btnLogout").addEventListener("click", ()=>{
    sessionStorage.clear();
    window.location.href = "index.html";
  });
});

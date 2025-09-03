// === ENDPOINT ===
const ENDPOINT_REG = "https://script.google.com/macros/s/AKfycbzsvHl_kbagbXJ2-lMWdsG2uXDqYgDlCAcAkwhpcNZ-ox8Xp4DzBWJJWP798XZFHHUpmg/exec"; // Registration Sheet
const ENDPOINT = "https://script.google.com/macros/s/AKfycbxYvpBYs3UhTOK-9ZMSlOGP_kilYysbCylKdNc5mMmCDHZ7MXclyktt4-U4eYwl-NDvuw/exec"; // E-Learning Sheet

// === ฟังก์ชัน log ===
function logMessage(msg){
  const logBox=document.getElementById("log");
  if(logBox){
    logBox.innerHTML+=msg+"<br>";
    logBox.scrollTop=logBox.scrollHeight;
  } else {
    console.log(msg);
  }
}

// === ฟังก์ชันส่ง Registration ===
function sendRegistration(data){
  fetch(ENDPOINT_REG,{
    method:"POST",
    body: JSON.stringify(data)
  })
  .then(r=>r.json())
  .then(res=>{
    logMessage("✅ ลงทะเบียนเรียบร้อย: "+JSON.stringify(data));
  })
  .catch(err=>{
    logMessage("❌ Registration Error: "+err);
  });
}

// === ฟังก์ชันส่ง Event E-Learning ===
function sendEvent(params){
  const query = Object.keys(params)
    .map(k=>`${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");
  const url = `${ENDPOINT}?${query}`;
  fetch(url, { method:"GET" })
    .then(r=>r.json())
    .then(data=>{ logMessage("✅ ส่ง event: "+JSON.stringify(params)); })
    .catch(err=>{ logMessage("❌ Event Error: "+err); });
}

// === E-Learning Actions ===
function login(name, empId){ sendEvent({ event:"login", name, employeeId:empId }); }
function ping(progress){ sendEvent({ event:"ping", progress:progress.toFixed(2) }); }
function quiz(questionId, correct){ sendEvent({ event:"quiz", quizId:questionId, quizCorrect:correct }); }

// === DOM Ready ===
document.addEventListener("DOMContentLoaded", ()=>{
  // --- Registration Page ---
  const form=document.getElementById("registerForm");
  if(form){
    form.addEventListener("submit",(e)=>{
      e.preventDefault();
      const data={
        name: document.getElementById("name").value.trim(),
        employeeId: document.getElementById("employeeId").value.trim(),
        position: document.getElementById("position").value.trim(),
        department: document.getElementById("department").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim()
      };
      if(!data.name||!data.employeeId||!data.position||!data.department||!data.email||!data.phone){
        logMessage("⚠️ กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return;
      }
      sendRegistration(data);
      form.reset();
    });
  }

  // --- E-Learning Page ---
  const btnLogin = document.getElementById("btnLogin");
  const btnPing = document.getElementById("btnPing");
  const btnQuiz = document.getElementById("btnQuiz");

  if(btnLogin){
    btnLogin.addEventListener("click",()=>{
      const name = document.getElementById("name").value.trim();
      const empId = document.getElementById("employeeId").value.trim();
      if(!name||!empId){
        logMessage("⚠️ ต้องกรอกชื่อและรหัสพนักงานก่อนนะ");
        return;
      }
      login(name, empId);
    });
  }

  if(btnPing){
    btnPing.addEventListener("click",()=>{ ping(Math.random()*100); }); // สุ่ม progress
  }

  if(btnQuiz){
    btnQuiz.addEventListener("click",()=>{ quiz("Q1", Math.random()>0.5); }); // จำลอง quiz
  }
});

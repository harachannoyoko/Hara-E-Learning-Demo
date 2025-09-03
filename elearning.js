const ENDPOINT_EVENT = "https://script.google.com/macros/s/AKfycbxYvpBYs3UhTOK-9ZMSlOGP_kilYysbCylKdNc5mMmCDHZ7MXclyktt4-U4eYwl-NDvuw/exec";

const name = sessionStorage.getItem("name");
const employeeId = sessionStorage.getItem("employeeId");

if(!name || !employeeId){
  window.location.href = "index.html";
}

document.getElementById("displayName").textContent = name;

function log(msg){
  document.getElementById("log").innerHTML = msg;
}

function sendEvent(event, params={}){
  const callbackName = "eventCallback";
  window[callbackName] = function(res){
    if(res.status === "success"){
      log(`✅ Event '${event}' ส่งเรียบร้อย`);
    } else {
      log(`❌ Event '${event}' ผิดพลาด: ${res.message}`);
    }
    delete window[callbackName];
    document.body.removeChild(script);
  };

  const query = new URLSearchParams({event, name, employeeId, ...params, callback: callbackName}).toString();
  const script = document.createElement("script");
  script.src = `${ENDPOINT_EVENT}?${query}`;
  document.body.appendChild(script);
}

document.getElementById("btnPing").addEventListener("click", () => {
  const progress = Math.floor(Math.random()*100);
  sendEvent("ping", {progress});
});

document.getElementById("btnQuiz").addEventListener("click", () => {
  const correct = Math.random() > 0.5 ? 1 : 0;
  sendEvent("quiz", {quizId:"Q1", quizCorrect:correct});
});

document.getElementById("btnLogout").addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "index.html";
});

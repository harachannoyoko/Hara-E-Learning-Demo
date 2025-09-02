// ใส่ URL ของ GAS Web App ตรงนี้
const ENDPOINT = 'https://script.google.com/macros/s/AKfycbxSLjq843CFTjBwelljIKuIvX-AscZbtR6ZHAU8YXrZDVZLD-KeIJbw9GWtOPUgTNRiWQ/exec';


const state = {
sessionId: null,
name: null,
employeeId: null,
};


function uid() {
if (crypto && crypto.randomUUID) return crypto.randomUUID();
return 'sess_' + Math.random().toString(36).slice(2);
}


const loginForm = document.getElementById('login');
const pingBtn = document.getElementById('ping');


loginForm.addEventListener('submit', async (e) => {
e.preventDefault();
state.name = document.getElementById('name').value.trim();
state.employeeId = document.getElementById('emp').value.trim();
state.sessionId = uid();


// เก็บไว้ให้หน้าอื่นใช้
localStorage.setItem('sess', JSON.stringify(state));


// ยิง event login ไปที่ชีต
  const body = new URLSearchParams({
    event: 'login',
    name: state.name,
    employeeId: state.employeeId,
    sessionId: state.sessionId,
    extra: navigator.userAgent
  });

  await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString()
  }).catch(() => {});


pingBtn.disabled = false;
alert('เริ่ม session แล้วงับ');
});


pingBtn.addEventListener('click', async () => {
const sess = JSON.parse(localStorage.getItem('sess') || '{}');
if (!sess.sessionId) return alert('ยังไม่เริ่ม session');


  const body = new URLSearchParams({
    event: 'ping',
    videoId: 'demo',
    name: sess.name,
    employeeId: sess.employeeId,
    sessionId: sess.sessionId,
    progress: '12.34',
    note: 'test write'
  });

  await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString()
  }).catch(() => {});


alert('ส่ง ping แล้ว ลองไปดูในชีตแท็บ events');
});


// auto restore session ถ้ามี
(function restore(){
try {
const sess = JSON.parse(localStorage.getItem('sess') || '{}');
if (sess.sessionId) pingBtn.disabled = false;
} catch (e) {}

})();

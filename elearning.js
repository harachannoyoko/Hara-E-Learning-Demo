const GAS_VIDEO_URL = "https://script.google.com/macros/s/AKfycbwbXhYyNQQRfBipc6muQvcU_euLgTBqSI7WjpZ1OZ-3uvh1qheuu32JFVCJW_NJlF-8bA/exec";
const GAS_PROGRESS_URL = "https://script.google.com/macros/s/1PfNRwkbaTJ5drL6LgCijGCj2JvWjRKtO86_fsMAg9jcwukyNnX7Vtetc/exec";

const VIDEO_ID = "dQw4w9WgXcQ"; // Rick Roll
const USER_NAME = "Hara";
const EMPLOYEE_ID = "EMP001";

function generateSessionId() {
  return 'sess_' + Math.random().toString(36).substr(2, 9);
}

let sessionId = localStorage.getItem("sessionId") || generateSessionId();
localStorage.setItem("sessionId", sessionId);

// โหลดวิดีโอจาก GAS
async function fetchVideo() {
  try {
    const res = await fetch(`${GAS_VIDEO_URL}?videoId=${VIDEO_ID}`);
    const data = await res.json();

    if (data.error) {
      alert("โหลดวิดีโอไม่ได้: " + data.error);
      return;
    }

    document.getElementById("videoTitle").innerText = data.title;
    document.getElementById("videoFrame").src = `https://www.youtube.com/embed/${VIDEO_ID}`;
  } catch (err) {
    console.error("Video error:", err);
  }
}

// โหลด progress
async function loadProgress() {
  try {
    const res = await fetch(`${GAS_PROGRESS_URL}?userId=${EMPLOYEE_ID}&videoId=${VIDEO_ID}`);
    const data = await res.json();

    if (data.progress > 0) {
      alert(`คุณเรียนถึง ${data.progress}% แล้ว`);
    }
  } catch (err) {
    console.error("Progress load error:", err);
  }
}

// บันทึก progress
async function saveProgress(progress, quizScore = 0) {
  const body = {
    name: USER_NAME,
    employeeId: EMPLOYEE_ID,
    videoId: VIDEO_ID,
    progress,
    quizCompleted: "Yes",
    quizCorrect: quizScore,
    sessionId
  };

  try {
    const res = await fetch(GAS_PROGRESS_URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    });
    const result = await res.json();
    console.log("Progress saved:", result);
  } catch (err) {
    console.error("Save progress error:", err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchVideo();
  await loadProgress();

  document.getElementById("saveProgressBtn").addEventListener("click", () => {
    const progress = Math.floor(Math.random() * 100);
    const quizScore = Math.floor(Math.random() * 10);
    saveProgress(progress, quizScore);
    alert(`บันทึก Progress: ${progress}% Quiz: ${quizScore}`);
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("sessionId");
    alert("ออกจากระบบแล้ว");
    location.reload();
  });
});

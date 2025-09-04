const GAS_URL = "https://script.google.com/macros/s/AKfycbwbXhYyNQQRfBipc6muQvcU_euLgTBqSI7WjpZ1OZ-3uvh1qheuu32JFVCJW_NJlF-8bA/exec";

// ใส่ Video ID ที่ได้จาก YouTube
const VIDEO_ID = "dQw4w9WgXcQ"; 

// โหลดข้อมูลวิดีโอ
async function loadVideo(videoId) {
  const res = await fetch(`${GAS_URL}?id=${videoId}`);
  const data = await res.json();
  console.log("Video Info:", data);

  if (data.items && data.items.length > 0) {
    const title = data.items[0].snippet.title;
    const duration = data.items[0].contentDetails.duration;
    document.getElementById("video-title").innerText = title;
    document.getElementById("video-player").src = `https://www.youtube.com/embed/${videoId}`;
    console.log(`Duration: ${duration}`);
  } else {
    alert("Video not found or invalid Video ID");
  }
}

// ส่ง Progress
async function sendProgress(progress) {
  const payload = {
    name: "Hara",
    employeeId: "EMP001",
    videoId: VIDEO_ID,
    sessionId: "SESSION123",
    progress: progress
  };

  const res = await fetch(GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const result = await res.json();
  console.log("Progress Response:", result);
}

// ทดสอบอัพเดท Progress ทุก ๆ 5 วินาที
setInterval(() => {
  const randomProgress = Math.floor(Math.random() * 100);
  sendProgress(randomProgress);
}, 5000);

// เรียกโหลดวิดีโอ
loadVideo(VIDEO_ID);

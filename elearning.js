// URL ของ Google Apps Script
const GAS_VIDEO_URL = "https://script.google.com/macros/s/AKfycbwbXhYyNQQRfBipc6muQvcU_euLgTBqSI7WjpZ1OZ-3uvh1qheuu32JFVCJW_NJlF-8bA/exec";
const GAS_PROGRESS_URL = "https://script.google.com/macros/s/1PfNRwkbaTJ5drL6LgCijGCj2JvWjRKtO86_fsMAg9jcwukyNnX7Vtetc/exec";

// ค่า Video ID (ตัวอย่าง Rick Roll)
const VIDEO_ID = "dQw4w9WgXcQ";

// โหลดข้อมูลวิดีโอผ่าน GAS (ซ่อน API Key)
async function fetchVideoDetails() {
    try {
        const response = await fetch(`${GAS_VIDEO_URL}?videoId=${VIDEO_ID}`);
        const data = await response.json();

        if (data.error) {
            console.error("Error fetching video details:", data.error);
            alert("ไม่สามารถโหลดข้อมูลวิดีโอได้");
            return;
        }

        // อัปเดต UI
        document.getElementById("videoTitle").innerText = data.title;
        document.getElementById("videoFrame").src = `https://www.youtube.com/embed/${VIDEO_ID}`;
    } catch (error) {
        console.error("Fetch video failed:", error);
    }
}

// บันทึกความคืบหน้าการเรียน
async function saveProgress(userId, progress) {
    try {
        const response = await fetch(GAS_PROGRESS_URL, {
            method: "POST",
            body: JSON.stringify({ userId, videoId: VIDEO_ID, progress }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await response.json();
        console.log("Progress saved:", result);
    } catch (error) {
        console.error("Error saving progress:", error);
    }
}

// โหลดความคืบหน้าที่เคยบันทึก
async function loadProgress(userId) {
    try {
        const response = await fetch(`${GAS_PROGRESS_URL}?userId=${userId}&videoId=${VIDEO_ID}`);
        const data = await response.json();
        console.log("Loaded progress:", data);
        return data.progress || 0;
    } catch (error) {
        console.error("Error loading progress:", error);
        return 0;
    }
}

// เริ่มต้นเมื่อโหลดหน้าเสร็จ
document.addEventListener("DOMContentLoaded", () => {
    fetchVideoDetails();

    const userId = "testUser001"; // สมมติ userId
    loadProgress(userId).then(progress => {
        if (progress > 0) {
            alert(`คุณเคยเรียนถึง ${progress}% แล้ว`);
        }
    });

    // ปุ่มบันทึกความคืบหน้า
    document.getElementById("saveProgressBtn").addEventListener("click", () => {
        const progress = Math.floor(Math.random() * 100); // สมมติ progress
        saveProgress(userId, progress);
        alert(`บันทึกความคืบหน้า: ${progress}%`);
    });
});

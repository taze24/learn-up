const studioBtn = document.getElementById("studioBtn");

studioBtn.addEventListener("click", () => {
    const userId = localStorage.getItem("userID")
    console.log(userId);
    window.location.href = `studio.html?id=${userId}`;
});
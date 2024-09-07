const profileBtn = document.getElementById("profileBtn");


profileBtn.addEventListener("click", () => {
    const userId = localStorage.getItem("userID")
    console.log(userId);
    window.location.href = `profile.html?id=${userId}`;
});
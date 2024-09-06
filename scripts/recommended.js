const recommendedTemplate = document.getElementById("recommended-template");
const cardContainer = document.querySelector("[card-container]");
const nav = document.getElementById("navbarSupportedContent");

const logoutBtn = document.getElementById("Logout");
logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html"
});

nav.addEventListener("click", () => {
    window.location.href = "#"
})

fetch('http://localhost:8080/users')
    .then(res => res.json())
    .then(data => {
        data.forEach(user => {
            const card = recommendedTemplate.content.cloneNode(true);
            const userName = card.querySelector("[user-name]");
            const title = card.querySelector("[title]");
            const education = card.querySelector("[education]");
            const userType = card.querySelector("[userType]");
            const btn = card.querySelector('[button]');

            //const urlParams = new URLSearchParams(window.location.search);

            title.textContent = user.bio;
            userName.textContent = user.nameSurname;

            if (education && userType) {
                education.textContent = user.education.charAt(0).toUpperCase() + user.education.slice(1);
                userType.textContent = user.userType.charAt(0).toUpperCase() + user.userType.slice(1);
            }

            if (btn) {

                btn.addEventListener("click", () => {
                    // Post the creatorID that user wanted to visit and direct to his profile
                    window.location.href = `profile.html?id=${user.userID}`;
                });
            }

            cardContainer.appendChild(card);
        });

    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });

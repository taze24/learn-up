

const nav = document.getElementById("navbarSupportedContent");
const welcomeName = document.getElementById("name");
const profileName = document.getElementById("profileName");
const bio = document.querySelector("[bio]");

const urlParams = new URLSearchParams(window.location.search);
const info = urlParams.get('id');
const currentCreator = info.slice(2)
const currentUser = info.slice(0, 2)


nav.addEventListener("click", () => {
    window.location.href = "#"
})

document.addEventListener("DOMContentLoaded", () => {
    const fetchUserData = (userID) => {
        fetch(`http://localhost:8080/videos/${userID}`)
            .then(res => res.json())
            .then(data => {
                // display the videos of the selected professor on his profile 
                displayUserData(data);
                // Display the info about user
                welcomeName.textContent = data[0].nameSurname.split(" ")[0];
                bio.textContent = data[0].bio;
                profileName.textContent = data[0].nameSurname
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                document.querySelector(".userProfileContainer").innerHTML = "<div class='error'>Error fetching user data. Please try again.</div>";
            });
    };

    const displayUserData = (user) => {
        const container = document.querySelector(".userProfileContainer");
        const template = document.getElementById("recommended-template");


        user.forEach(user => {
            const clone = template.content.cloneNode(true);
            const name = clone.querySelector("[creatorName]");
            const title = clone.querySelector("[videoTitle]");

            name.textContent = "Lecturer: " + user.nameSurname;
            title.textContent = "Title: " + user.title;

            clone.querySelector('.btn').addEventListener("click", () => {
                window.location.href = `lectureRoom.html?id=${currentUser}?${currentCreator}?${user.idvideos}`;
            })

            container.appendChild(clone);
        });
    };

    // First two numbers are current active user ID
    // Second two numbers are the professors/user ID's to get the videos.
    // Maybe add later for the quizz, courses or smth like that.

    if (currentCreator) {
        fetchUserData(currentCreator);
    } else {
        console.error("User ID not found in the URL");
    }

});

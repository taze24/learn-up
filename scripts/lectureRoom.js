// Max length on displayed titles in the containers
document.addEventListener("DOMContentLoaded", function () {
    const titles = document.querySelectorAll(".title");
    const maxTitleLength = 100; // Set the max character limit

    const logoutBtn = document.getElementById("Logout");
    logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "login.html"
    });

    const url = window.location.href;

    // Extract the first part (id=1) and split by `=`
    let idPart = url.split('?')[1].split('=');
    let id = idPart[1]; // This is the value for `id` of the creator of the video
    const currentVideo = url.split("?")[2];

    console.log(currentVideo, id)
    fetch(`http://localhost:8080/videos/${id}/${currentVideo}`)
        .then(res => res.json())
        .then(data => {
            // Path to the video
            const path = data[0].videoPath;
            // Element that will contain the source
            let videoElement = document.getElementById('watchingVideo');
            // Source element and appending the video path source
            let sourceElement = document.createElement('source');
            sourceElement.src = path;

            videoElement.appendChild(sourceElement);
            // load the video
            videoElement.load();
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
            searchResults.innerHTML = "<div class='searchResultItem'>Error fetching video results. Please try again.</div>";
        });

    const currentPage = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
    const navLinks = document.querySelectorAll('li a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref.includes(currentPage)) {
            link.classList.add('active');
        }
    });

    titles.forEach((title) => {
        if (title.textContent.length > maxTitleLength) {
            title.textContent =
                title.textContent.substring(0, maxTitleLength) + "...";
        }
    });
});


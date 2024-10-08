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


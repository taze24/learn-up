// Event listener for 'Create Account' button
document.getElementById("createAccountButton").addEventListener("click", () => {
    window.location.href = 'register.html';
});

// Event listener for 'Login Text' click
document.getElementById("loginText").addEventListener("click", () => {
    const welcomeSection = document.getElementById("welcomeSection");
    const loginForm = document.getElementById("loginForm");

    welcomeSection.classList.add('hidden');
    setTimeout(() => {
        welcomeSection.style.display = 'none';
        loginForm.classList.add('show');
    }, 500); // Match transition duration in CSS
});

// Event listener for 'Login Button' click
document.getElementById("loginButton").addEventListener("click", async (event) => {
    event.preventDefault();
    await performLogin();
});
// Event listener for Enter key press in the form
document.getElementById("loginForm").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission
        document.getElementById("loginButton").click(); // Trigger the click event of the login button
    }
});

// Function to handle login 
async function performLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
        localStorage.setItem('nameSurname', result.nameSurname);
        localStorage.setItem('userID', result.userID)
        fetch('http://localhost:8080/login')
            .then(res => res.json())
            .then(allUsers => {
                const user = allUsers[0]
            });
        window.location.href = `./home.html?id=${result.userID}`;
    } else {
        alert(`Error: ${result.message}`);
    }
}

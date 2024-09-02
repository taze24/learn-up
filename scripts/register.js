document.getElementById("registerButton").addEventListener("click", async (event) => {
  event.preventDefault();

  const nameSurname = document.getElementById("nameSurname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const userGender = document.getElementById("userGender").value;
  const age = document.getElementById("age").value;
  const userType = document.getElementById("userType").value;
  const education = document.getElementById("education").value;

  // Basic validation
  if (!nameSurname) {
    alert("Please enter your Name and Surname.");
    return;
  }

  if (!email) {
    alert("Please enter your email.");
    return;
  }

  // Email format validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!password) {
    alert("Please enter your password.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Password strength validation (example: minimum 6 characters)
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  if (!userType) {
    alert("Please select user type.");
    return;
  }

  if (!education) {
    alert("Please select your education.");
    return;
  }

  // Optional fields validation
  if (age && (age < 10 || age > 100)) {
    alert("Please enter a valid age between 10 and 100.");
    return;
  }

  const userData = {
    nameSurname,
    email,
    password,
    userType,
    education,
  };

  // Add optional fields if provided
  if (userGender) {
    userData.userGender = userGender;
  }
  if (age) {
    userData.age = age;
  }

  try {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Registration successful!");
      window.location.href = './login.html';
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

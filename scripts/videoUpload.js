const input = document.getElementById("inputVideo");

input.addEventListener("click", async (event) => {
    event.preventDefault();

    const userID = localStorage.getItem("userID");
    const file = input.files[0]; // Get the selected file
    const videoTitle = document.getElementById("inputTitle").value;

    if (!file) {
        alert("Please select a video file.");
        return;
    }

    const formData = new FormData();
    formData.append("userID", userID); // Append userID to FormData
    formData.append("video", file); // Append the video file to FormData
    formData.append("videoTitle", videoTitle); // Append videoTitle to FormData

    try {
        const response = await fetch(`http://localhost:8080/videos`, {
            method: "POST",
            body: formData, // Send the FormData object (contains the video file and other info)
        });

        if (!response.ok) {
            const errorText = await response.text(); // Handle non-JSON responses like HTML error pages
            throw new Error(errorText);
        }

        const result = await response.json(); // Parse JSON response if successful
        alert("Video upload successful!");
        window.location.reload(); // Optionally reload or update the page

    } catch (error) {
        alert(`Error: ${error.message}`);
    }

});

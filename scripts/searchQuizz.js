// search.js
document.addEventListener("DOMContentLoaded", () => {
    const searchQuery = document.getElementById("searchQuery");
    const mainContainer = document.querySelector(".mainContainer");
    const recommendedTemplate = document.getElementById("recommended-template").content.cloneNode(true);

    const currentUserID = localStorage.getItem("userID")
    console.log(currentUserID)

    searchQuery.addEventListener("input", () => {
        const query = searchQuery.value;
        if (query.length < 1) {
            fetchResults("");
            return;
        }

        fetchResults(query);
    });

    const fetchResults = (query) => {
        fetch(`http://localhost:8080/searchQuizzes?q=${query}`)
            .then(res => res.json())
            .then(data => {
                mainContainer.innerHTML = ""; // Clear previous results

                let results = data.slice(0, 30); // Get top 30 results

                if (results.length < 20) {
                    fetch('http://localhost:8080/quizzes')
                        .then(res => res.json())
                        .then(allUsers => {
                            const additionalResults = allUsers.filter(user => !results.some(result => result.idquizzes === user.idquizzes));
                            results = results.concat(additionalResults.slice(0, 20 - results.length));
                            displayResults(results);
                        });
                } else {
                    displayResults(results);
                }
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
                mainContainer.innerHTML = "<div class='searchResultItem'>Error fetching search results. Please try again.</div>";
            });
    };

    const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const displayResults = (results) => {
        results.forEach(result => {
            const card = recommendedTemplate.cloneNode(true);
            const userName = card.querySelector("[user-name]");
            const title = card.querySelector("[title]");
            const rating = card.querySelector("[rating]");
            const difficulty = card.querySelector("[difficulty]");
            const attempts = card.querySelector("[attempts]");
            const price = card.querySelector("[price]");

            title.textContent = result.title || "No Title";
            userName.textContent = result.nameSurname || "Jhon Wick";
            rating.textContent = `Rating: ${result.rating}/5`;
            difficulty.textContent = `Difficulty: ${result.difficulty}/10`;
            attempts.textContent = `Attempts: ${result.attempts}`;
            price.textContent = `Price: ${result.price}$`;

            card.querySelector('.cardContainer').addEventListener("click", () => {
                window.location.href = `quizzSolving.html?id=${result.userID}`;
            });

            mainContainer.appendChild(card);
        });
    };

    // Initial load without any search query
    fetchResults("");
});

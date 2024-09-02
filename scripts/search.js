document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const searchQuery = document.getElementById("searchQuery");
    const searchResults = document.getElementById("searchResults");

    searchQuery.addEventListener("input", () => {
        const query = searchQuery.value;
        if (query.length < 1) {
            searchResults.innerHTML = "";
            return;
        }

        fetch(`http://localhost:8080/search?q=${query}`)
            .then(res => res.json())
            .then(data => {
                searchResults.innerHTML = "";
                const results = data.slice(0, 5);
                results.forEach(result => {
                    const item = document.createElement("div");
                    item.classList.add("searchResultItem");

                    const nameSurname = document.createElement("div");
                    nameSurname.classList.add("searchResultName");
                    nameSurname.textContent = result.nameSurname;

                    const email = document.createElement("div");
                    email.classList.add("searchResultEmail");
                    email.textContent = result.email;

                    const title = document.createElement("div");
                    title.classList.add("searchResultTitle");
                    title.textContent = result.title || "No Title"; // Modify if title is available in the results

                    item.appendChild(nameSurname);
                    nameSurname.appendChild(email);
                    item.appendChild(title);

                    item.addEventListener("click", () => {
                        window.location.href = `profile.html?id=${result.userID}`;
                    });

                    searchResults.appendChild(item);
                });
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
                searchResults.innerHTML = "<div class='searchResultItem'>Error fetching search results. Please try again.</div>";
            });
    });

    document.addEventListener("click", (event) => {
        if (!searchForm.contains(event.target)) {
            searchResults.innerHTML = "";
        }
    });
});

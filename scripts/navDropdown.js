async function fetchData(endpoint) {
    try {
        const response = await fetch(`http://localhost:8080/${endpoint}`);  // endpoint = professors || classes
        return response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
    }
}

async function dropDiv(event) {
    const dataMap = {
        'My Classes': 'classes',
        'Favourite Professors': 'professors'
    };

    // Get the clicked container
    const clickedContainer = event.currentTarget;

    // if Quizz rederect to that page
    if (clickedContainer.id == 'Quizz') {
        window.location.href = "./quizz.html";
        return;
    }

    // create the card for top 5 results
    const profileName = clickedContainer.querySelector('.profileName').textContent;
    const title = clickedContainer.querySelector('.title').textContent;
    const key = `${profileName} ${title}`.trim();

    const endpoint = dataMap[key];
    if (!endpoint) {
        return;
    }

    const data = await fetchData(endpoint);

    let container = document.querySelector('.dropdown-container');
    if (!container) {
        container = document.createElement('div');
        container.classList.add('dropdown-container');
    }
    container.innerHTML = '';

    data.forEach(result => {
        const div = document.createElement('div');
        div.classList.add('dropdownItem');
        div.innerHTML = `<strong>${result.name}</strong>: ${result.title}`;
        container.appendChild(div);
    });

    // Append the dropdown container after the clicked container
    clickedContainer.insertAdjacentElement('afterend', container);

    container.style.display = container.style.display === 'block' ? 'none' : 'block';
}

const responseDiv = document.querySelector("#response");
const searchButton = document.querySelector("#search-btn");
const resetButton = document.querySelector("#reset-btn");
const searchInput = document.querySelector("#search-input");


resetButton.addEventListener("click", resetRecommendations);

searchButton.addEventListener("click", showRecommendations);

async function fetchRecommendations() {
    const url = '/travel_recommendation_api.json';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error.message);

    }

}

async function showRecommendations() {
    const categoryMap = {
        temple: "temples",
        temples: "temples",
        beach: "beaches",
        beaches: "beaches"
    };

    const searchQuery = searchInput.value.toLowerCase().trim();
    const recommendations = await fetchRecommendations();

    const validSearchResult = categoryMap[searchQuery];

    responseDiv.innerHTML = "";

    if (validSearchResult && recommendations[validSearchResult]) {
        recommendations[validSearchResult].forEach((recommendation) => {
            const recommendationContainer = document.createElement("div");
            recommendationContainer.classList.add("recommendation-container");

            recommendationContainer.innerHTML = `
                <img src="${recommendation.imageUrl}">
                <h2>${recommendation.name}</h2>
                <p>${recommendation.description}</p>
            `;
            responseDiv.appendChild(recommendationContainer);
        });
    } else {
        const country = recommendations.countries && recommendations.countries.find(
            (country) => country.name.toLowerCase() === searchQuery
        );

        if (country) {
            country.cities.forEach((city) => {
                const recommendationContainer = document.createElement("div");
                recommendationContainer.classList.add("recommendation-container");

                recommendationContainer.innerHTML = `
                    <img src="${city.imageUrl}">
                    <h2>${city.name}</h2>
                    <p>${city.description}</p>
                `;
                responseDiv.appendChild(recommendationContainer);
            });
        } else {
            console.log("Categoria ou país inválido");
        }
    }
}

function resetRecommendations() {
    responseDiv.innerHTML = "";
}

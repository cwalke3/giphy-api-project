// Giphy API configuration
const apiKey = "9KfjXhVRV7BVVZMeKUnLppZi3ojYUEOw";

// Fetch GIFs from Giphy
async function fetchGifs() {
const searchInput = document.querySelector("#search-input");
const searchTerm = searchInput.value.trim() || "basketball";

const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=8`;

const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error("Failed to fetch GIFs");
    }

    const data = await response.json();

    const images = data.data.map(gif => gif.images.original.url);

    console.log(images);

    return images;
}

// Select the button and GIF container
const fetchButton = document.querySelector("#fetch-gif-btn");
const gifContainer = document.querySelector("#gif-container");

// Display GIFs when the button is clicked
fetchButton.addEventListener("click", async function () {
    try {
        const images = await fetchGifs();

        gifContainer.innerHTML = "";

        images.forEach(function (imageUrl) {
            gifContainer.innerHTML += `<img src="${imageUrl}" class="col-3 mb-3" alt="Giphy GIF">`;
        });
    } catch (error) {
        console.error(error);
        gifContainer.textContent = "Unable to load GIFs. Please try again.";
    }
});
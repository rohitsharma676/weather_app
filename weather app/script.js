  const apiKey = "54a5a36af489ecd35bcf11fb1637ed21";

// HTML elements
const cityInput = document.getElementById("cityInput");
const form = document.querySelector("form");

const cityName = document.querySelector("h1");
const temperature = document.querySelector(".temp");
const description = document.querySelector(".desc");
const weatherCharacter = document.getElementById("weatherCharacter");

const details = document.querySelectorAll(".details div");

// Form submit
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter city name");
        return;
    }

    getWeather(city);
});


// Weather function
async function getWeather(city) {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // City name
        cityName.innerText = data.name;

        // Temperature
        temperature.innerText = `${Math.round(data.main.temp)}°C`;
const temp = data.main.temp;

if (temp >= 35) {
    weatherCharacter.textContent = "☀️😭";
} else if (temp >= 30) {
    weatherCharacter.textContent = "☀️🥵";
} else if (temp >= 20) {
    weatherCharacter.textContent = "☀️😎";
} else if (temp >= 10) {
    weatherCharacter.textContent = "☀️🧥";
} else {
    weatherCharacter.textContent = "☀️🥶";
}
        // Weather description
        description.innerText = data.weather[0].description;

        // Humidity
        details[1].innerText =
            `Humidity: ${data.main.humidity}%`;

        // Wind speed
        details[2].innerText =
            `Wind Speed: ${data.wind.speed} m/s`;

        // Feels like
        details[0].innerText =
            `Feels Like: ${Math.round(data.main.feels_like)}°C`;

    } catch (error) {

        alert("City not found. Please enter a valid city name.");

        console.log(error);
    }
}
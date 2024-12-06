const API_KEY = '18934ac9e1b872f83173293a9f4f0339';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather(city) {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data: ' + error.message);
    }
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weather');
    weatherContainer.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Description: ${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
    `;
}

document.getElementById('searchButton').addEventListener('click', () => {
    const cityInput = document.getElementById('cityInput').value;
    if (cityInput) {
        getWeather(cityInput);
    } else {
        alert('Please enter a city name');
    }
});

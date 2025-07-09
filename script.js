const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const notFoundSection = document.querySelector('.not-found');
const searchSection = document.querySelector('.search-city');
const wheatherInfoSection = document.querySelector('.weather-info');

const apiKey = 'f3bbfae56737f4c910952f628023577a';

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&units=metric&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    return response.json();
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city);

    if(weatherData.cod !== 200) {
        showDisplaySection(notFoundSection)
        return;
    }
    
}

function showDisplaySection(section) {
    [wheatherInfoSection, searchSection, notFoundSection ]
        .forEach(section => section.style.display = 'none');
}

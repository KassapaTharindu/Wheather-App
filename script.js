const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const notFoundSection = document.querySelector('.not-found');
const searchSection = document.querySelector('.search-city');
const wheatherInfoSection = document.querySelector('.wheather-info');

const countryText = document.querySelector('.country-text');
const temptxt = document.querySelector('.temp-text');
const conditionText = document.querySelector('.condition-text');
const humidityText = document.querySelector('.humidity-value-txt');
const windSpeedText = document.querySelector('.wind-value-txt');
const wheatherSummeryImg = document.querySelector('.wheather-summery-img');
const currentDateText = document.querySelector('.current-date-text');

const apiKey = 'f3bbfae56737f4c910952f628023577a';

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value.trim());
        cityInput.value = '';
        cityInput.blur();
    }
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value.trim());
        cityInput.value = '';
        cityInput.blur();
    }
});

async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    return response.json();
}

function getWheatherIconId(id) {
    if (id <= 232) return 'thunder.png';
    if (id <= 321) return 'drizzle.png';
    if (id <= 531) return 'raining.png';
    if (id <= 622) return 'snow.png';
    if (id <= 781) return 'atmosphere.png';
    if (id === 800) return 'clear.png';
    return 'clouds.png';
}

function getCurrentDate() {
    const currentDate = new Date();
    const options = {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
    };
    return currentDate.toLocaleDateString('en-GB', options);
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city);

    if (!weatherData || weatherData.cod !== 200) {
        showDisplaySection(notFoundSection);
        return;
    }

    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed },
    } = weatherData;

    countryText.textContent = country;
    temptxt.textContent = `${temp}°C`;
    conditionText.textContent = main;
    humidityText.textContent = `${humidity}%`;
    windSpeedText.textContent = `${speed} M/s`;
    currentDateText.textContent = getCurrentDate();
    wheatherSummeryImg.src = `Assets/wheather/${getWheatherIconId(id)}`;

    await updateWeatherForecast(city);
    showDisplaySection(wheatherInfoSection);
}

async function updateWeatherForecast(city) {
    const forecastsData = await getFetchData('forecast', city);
    const timeTaken = '12:00:00';
    const todayDate = new Date().toISOString().split('T')[0];

    forecastsData.list.forEach(forecastWeather => {
        if (
            forecastWeather.dt_txt.includes(timeTaken) &&
            !forecastWeather.dt_txt.includes(todayDate)
        ) {
            console.log(forecastWeather); // You can update UI here later
        }
    });
}

function showDisplaySection(section) {
    [wheatherInfoSection, searchSection, notFoundSection].forEach(sec => {
        sec.style.display = 'none';
    });
    section.style.display = 'flex';
}

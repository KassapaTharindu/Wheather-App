const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const notFoundSection = document.querySelector('.not-found');
const searchSection = document.querySelector('.search-city');
const wheatherInfoSection = document.querySelector('.weather-info');

const countryText = document.querySelector('.country-text');
const temptxt = document.querySelector('.temp-text');
const conditionText = document.querySelector('.condition-text');
const humidityText = document.querySelector('.humidity-value-txt');
const windSpeedText = document.querySelector('.wind-value-txt');
const wheatherSummeryImg = document.querySelector('.weather-summery-img');
const currentDateText = document.querySelector('.current-date-txt');

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

function getWheatherIconId(id) {
    if(id <= 232) return
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city);

    if(weatherData.cod !== 200) {
        showDisplaySection(notFoundSection)
        return;
    }
    console.log(weatherData);

    const{
        name: country,
        main:{temp, humidity},
        wheather:[{id, main}],
        wind:{speed},
    } = weatherData
    
    countryText.textContent = country
    temptxt.textContent = temp+'°C'
    conditionText.textContent = main
    humidityText.textContent = humidity+'%'
    windSpeedText.textContent = speed+'M/s'
    wheatherSummeryImg.src = `Assets/wheather/${getWheatherIconId(id)}`;
 

    showDisplaySection(wheatherInfoSection);
}

function showDisplaySection(section) {
    [wheatherInfoSection, searchSection, notFoundSection ]
        .forEach(section => section.style.display = 'none');

        section.style.display = 'flex'
}

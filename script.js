const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const notFoundSection = document.querySelector('.not-found');
const searchSection = document.querySelector('.search-city');
const weatherInfoSection = document.querySelector('.weather-info');

const countryText = document.querySelector('.country-text');
const temptxt = document.querySelector('.temp-text');
const conditionText = document.querySelector('.condition-txt');
const humidityText = document.querySelector('.humidity-value-txt');
const windSpeedText = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const currentDateText = document.querySelector('.current-date-text');
const forecastItemsContainer = document.querySelector('.forecast-item-container');

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

function getWeatherIconId(id) {
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
  const options = { weekday: 'short', month: 'short', day: '2-digit' };
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
  weatherSummaryImg.src = `Assets/weather/${getWeatherIconId(id)}`;

  await updateWeatherForecast(city);
  showDisplaySection(weatherInfoSection);
}

async function updateWeatherForecast(city) {
  const forecastsData = await getFetchData('forecast', city);
  const timeTaken = '12:00:00';
  const todayDate = new Date().toISOString().split('T')[0];

  forecastItemsContainer.innerHTML = '';

  forecastsData.list.forEach(forecastWeather => {
    if (
      forecastWeather.dt_txt.includes(timeTaken) &&
      !forecastWeather.dt_txt.includes(todayDate)
    ) {
      renderForecastItem(forecastWeather);
    }
  });
}

function renderForecastItem(weatherData) {
  const {
    dt_txt: date,
    weather: [{ id }],
    main: { temp },
  } = weatherData;

  const dateTaken = new Date(date);
  const dateOption = { day: '2-digit', month: 'short' };
  const dateResult = dateTaken.toLocaleDateString('en-US', dateOption);

  const forecastItem = `
    <div class="forecast-item">
      <h5 class="forecast-item-date regular-text">${dateResult}</h5>
      <img src="Assets/weather/${getWeatherIconId(id)}" class="forecast-item-img" />
      <h5 class="forecast-item-temp">${Math.round(temp)}°C</h5>
    </div>
  `;

  forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem);
}

function showDisplaySection(section) {
  [weatherInfoSection, searchSection, notFoundSection].forEach(sec => {
    sec.style.display = 'none';
  });
  section.style.display = 'flex';
}

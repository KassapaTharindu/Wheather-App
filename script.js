const cityInput =document.querySelector('.city-input');
const searchBtn =document.querySelector('.search-btn');

const apiKey = 'f3bbfae56737f4c910952f628023577a'

searchBtn.addEventListener('click', () => {
   if(cityInput.value.trim() !=''){
         updateWheaterInfo(cityInput.value);
         cityInput.value =''
         cityInput.blur()
   }
});

cityInput.addEventListener('keydown', (event) => {
    if(event.key =='Enter' && cityInput.value.trim() !=''){
         updateWheaterInfo(cityInput.value);
         cityInput.value =''
         cityInput.blur()
    }
})

async function getFetchData(endPoint,city) {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}'

    const response =await fetch(apiUrl)
    return response.json();
}
async function updateWheaterInfo(city) {
        const wheatherData =await getFetchData('weather', city);
        console.info(wheatherData);
}
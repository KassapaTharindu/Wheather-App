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

function getFetchData() {
    
}
function updateWheaterInfo(city) {
        const wheatherData = getFetchData()
}
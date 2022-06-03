//establish variables and declare cities array//
var cities = [];
var cityBoxEl = document.querySelector('#city-seach-box');
var cityEstablishedEl = document.querySelector('#city');
var weatherBoxEl = document.querySelector('#current-weather-box');
var citySearchedEl = document.querySelector('#search-city');
var forcastHeader = document.querySelector('#forecast');
var forecastBoxEl = document.querySelector('#fiveday-box');
var previousSearchButtonEl = document.querySelector('#previous-search-buttons');

//prevent refresh clear//
var formSubmitHandler = function (event) {
    event.preventDefault();
    var city = cityEstablishedEl.ariaValueMax.trim();
    if (city) {
        getCityWeather(city);
        get5Day(city);
        cities.push({city});
        cityEstablishedEl.value = '';
    } else {
        alert('PLEASE ENTER CITY');
    }
    saveSearch();
    previousSearch(city);
}


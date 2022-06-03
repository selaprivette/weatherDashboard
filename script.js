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
//save searches to local storage//
var saveSearch = function () {
    localStorage.setItem('cities', JSON.stringify(cities));
};
//weather API//
var getCityWeather = function (city) {
    var apiKey = '8b62e1bd62c44925cbf6e9bb8f211dba'
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}'
    
    fetch(apiUrl)
    .then(function (response) {
        response.json().then(function (data) {
            displayWeather(data, city);
        });
    });

};
//clear search//
var displayWeather = function (weather, searchCity) {
    weatherBoxEl.textContent = '';
    citySearchedEl.textContent = searchCity;

    //date section//
    var currentDate = document.createElement('section')
    currentDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    citySearchedEl.appendChild(currentDate);

    //weather symbols//
    var weatherSymbol = document.createElement('img')
    weatherSymbol.setAttribute('src', `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` );
    citySearchedEl.appendChild(weatherSymbol);

    //temp section//
    var tempEl = document.createElement('section')
    tempEl.textContent = 'Temperature:' + weather.main.temp + ' °F';
    tempEl.classList = 'list-group-item'

    //humidity section//
    var humidityEl = document.createElement("section");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item"
    
    //wind section//
    var windEl = document.createElement("section");
    windEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windEl.classList = "list-group-item"
    
    //append all to weather box//
    weatherBoxEl.appendChild(tempEl);
    weatherBoxEl.appendChild(humidityEl);
    weatherBoxEl.appendChild(windEl);

    //weather coordinates//
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    getUvIndex(lat, lon)
}
//UV index API //
var getUvIndex = function (lat, lon) {
    var apiKey = '8b62e1bd62c44925cbf6e9bb8f211dba'
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                displayUvIndex(data)
            });
        });

}

var displayUvIndex = function (index) {
    var uvIndexEl = document.createElement('section');
    uvIndexEl.textContent = 'UV Index:'
    uvIndexEl.classList = 'list-group-item'
    
    uvIndexValue = document.createElement('section')
    uvIndexValue.textContent = index.value
    
}
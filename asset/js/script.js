var searchButton = $("#search-button");
var clearHistory = $("#clear-history");
var cityName = $("#city-name");
var currentPicture = $("#current-picture");
var currentTemp = $("#temperature");
var currentHumidity = $("#humidity");
var currentWindSpeed = $("#wind-speed");
var currentUV = $("#UV-index");
var enterCity = $("#enter-city");
var city = "";
var date
var weatherPicture
var iconURL
var searchedCity = [];


searchButton.click(weather);

function weather(event) {
    event.preventDefault();
    if (enterCity.val().trim() !== "") {
        city = enterCity.val().trim();
        currentWeather(city);
    }
}

function currentWeather(city) {
    console.log(city)
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=37fc43925c5a51f9ab5bea46e987dda6&lang=en";

    fetch(apiURL)
    .then(function (response) {
        response.json()
        .then(function (data) {
            console.log(data)
            date = new Date(data.dt * 1000).toLocaleDateString();
            weatherPicture = data.weather[0].icon;
            iconURL = "https://openweathermap.org/img/wn/" + weatherPicture + "@2x.png";
            cityName.append(data.name + "(" + date + ")" + "<img src=" + iconURL + ">");
            currentTemp.append(data.main.temp + "°F");
            currentHumidity.append(data.main.humidity + "%");
            currentWindSpeed.append(data.wind.speed + "MPH");
            UVIndex(data.coord.lon, data.coord.lat);
        })
    }) 
}

var uvURL
function UVIndex(latitude, longitude) {
    uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=37fc43925c5a51f9ab5bea46e987dda6&lat="+latitude+"&lon="+longitude;

    fetch(uvURL)
    .then(function (response) {
        response.json()
        .then(function (data) {
            console.log(data)
            currentUV.append(data.value)
        })
    })
}


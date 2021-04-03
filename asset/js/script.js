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

function weather(event) {
    event.preventDefault();
    if (enterCity.val().trim() !== "") {
        city = enterCity.val().trim();
        currentWeather(city);
    }
}

searchButton.click(weather);


function currentWeather(city) {
    console.log(city)
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=37fc43925c5a51f9ab5bea46e987dda6&lang=en";
    console.log(apiURL)

    fetch(apiURL)
        .then(function (response) {
            return response.json()
            .then(function (data) {
               

            });
        });
};


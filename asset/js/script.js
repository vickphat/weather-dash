var searchButton = $("#search-button");
var clearHistory = $("#clear-history");
var cityName = $("#city-name");
var currentPicture = $("#current-picture");
var currentTemp = $("#temperature");
var currentHumidity = $("#humidity");
var currentWindSpeed = $("#wind-speed");
var currentUV = $("#UV-index");
var enterCity = $("#enter-city")

searchButton.click(weather);


function weather(apiURL) {

    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + enterCity + "&units=imperial&appid=37fc43925c5a51f9ab5bea46e987dda6&lang=en";

    fetch(apiURL)
        .then(function (response) {
            response.json()
            .then(function (data) {
                console.log(this)

            });
        });
};


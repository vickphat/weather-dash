var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var cityName = $("#city-name");
var currentPicture = $("#current-picture");
var currentTemp = $("#temperature");
var currentHumidity = $("#humidity");
var currentWindSpeed = $("#wind-speed");
var currentUV = $("#UV-index");
var enterCity = $("#enter-city");
var oneDay = document.querySelector(".one-day");
var fiveDay = document.querySelector(".five-day");
var city = "";
var searchedCity = [];

// Button for search button
searchButton.click(weather);

// Clear history button
clearButton.click(clearHistory);

// Retreives text input
function weather(event) {
    event.preventDefault();
    if (enterCity.val().trim() !== "") {
        city = enterCity.val().trim();
        currentWeather(city);
        oneDay.classList.remove("d-none");
        fiveDay.classList.remove("d-none");
    }
}

// Prevents searched cities to duplicate in history
function find(city) {
    for (var i = 0; i < searchedCity.length; i++) {
        if (city.toUpperCase() === searchedCity[i]) {
            return -1;
        }
    }
    return 1;
}

// Add searches to history
function addToHistory(history) {
    var listEl = $("<li>" + history.toUpperCase() + "</li>");
    $(listEl).attr("class", "list-group-item");
    $(listEl).attr("data-value", history.toUpperCase());
    $(".list-group").append(listEl);
}

//Clears search history 
function clearHistory(event) {
    event.preventDefault();
    searchedCity = [];
    localStorage.removeItem("cityname");
    document.location.reload();
}

// When city is clicked in history, returns that city's weather
function previousSearch(event) {
    var liEl = event.target;
    if (event.target.matches("li")) {
        city = liEl.textContent.trim();
        currentWeather(city);
        oneDay.classList.remove("d-none");
        fiveDay.classList.remove("d-none");
    }
}
$(document).on("click", previousSearch);

// Uploads the last searched city
function lastSearch() {
    $("ul").empty();
    var searchedCity = JSON.parse(localStorage.getItem("cityname"));
    if (searchedCity !== null) {
        searchedCity = JSON.parse(localStorage.getItem("cityname"));
        for (i = 0; i < searchedCity.length; i++) {
            addToHistory(searchedCity[i]);
        }
        city = searchedCity[i - 1];
        currentWeather(city);
        oneDay.classList.remove("d-none");
        fiveDay.classList.remove("d-none");
    }
}
$(window).on("load", lastSearch);

// Retrieves current weather
function currentWeather(city) {
    console.log(city)
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=37fc43925c5a51f9ab5bea46e987dda6&lang=en";

    fetch(apiURL)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    console.log(data)
                    // Sets current date
                    var date = new Date(data.dt * 1000).toLocaleDateString();
                    var weatherPicture = data.weather[0].icon;
                    var iconURL = "https://openweathermap.org/img/wn/" + weatherPicture + "@2x.png";
                    cityName.html(data.name + "(" + date + ")" + "<img src=" + iconURL + ">");
                    currentTemp.html(data.main.temp + "°F");
                    currentHumidity.html(data.main.humidity + "%");
                    currentWindSpeed.html(data.wind.speed + "MPH");
                    UVIndex(data.coord.lon, data.coord.lat);
                    fiveDayForcast(data.id)
                    if (data.cod == 200) {
                        searchedCity = JSON.parse(localStorage.getItem("cityname"));
                        console.log(searchedCity);
                        if (searchedCity == null) {
                            searchedCity = [];
                            searchedCity.push(city.toUpperCase());
                            localStorage.setItem("cityname", JSON.stringify(searchedCity));
                            addToHistory(city);
                        }
                        else {
                            if (find(city) > 0) {
                                searchedCity.push(city.toUpperCase());
                                localStorage.setItem("cityname", JSON.stringify(searchedCity));
                                addToHistory(city);
                            }
                        }
                    }

                })
        })
}

// Retrieves current UV index
function UVIndex(latitude, longitude) {
    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=37fc43925c5a51f9ab5bea46e987dda6&lat=" + latitude + "&lon=" + longitude;

    fetch(uvURL)
        .then(function (response) {
            response.json()
                .then(function (response) {
                    console.log(response);
                    currentUV.html(response.value);

                    var badgeColor = document.querySelector("#UV-index")
                    // Sets UV background color according to UV-Index for favorable, moderate, or severe conditions
                if (response.value < 3 ) {
                    badgeColor.classList.add("badge", "bg-success", "text-white");
                }
                else if (response.value > 3 && response.value < 10) {
                    badgeColor.classList.add("badge", "bg-warning", "text-white");
                }
                else {
                    badgeColor.classList.add("badge", "bg-danger", "text-white");
                }

                })       
        })
}

// Displays 5 day forecast for current city
function fiveDayForcast(id) {
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&units=imperial&appid=37fc43925c5a51f9ab5bea46e987dda6&lang=en";

    fetch(fiveDayURL)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    console.log(data);
                    //  For loop to set date, icon, temperature and humidity
                    for (i = 0; i < 5; i++) {
                        var fiveDate = new Date((data.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
                        var fivePicture = data.list[((i + 1) * 8) - 1].weather[0].icon;
                        var fivePictureURL = "https://openweathermap.org/img/wn/" + fivePicture + ".png";
                        var fiveTemp = data.list[((i + 1) * 8) - 1].main.temp;
                        var fiveHumidity = data.list[((i + 1) * 8) - 1].main.humidity;

                        $("#fiveDate" + i).html(fiveDate);
                        $("#fivePicture" + i).html("<img src=" + fivePictureURL + ">");
                        $("#fiveTemp" + i).html(fiveTemp + "°F");
                        $("#fiveHumidity" + i).html(fiveHumidity + "%");
                    }
                })
        })
}



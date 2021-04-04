var searchButton = $("#search-button");
var clearButton = $("#clear-history");
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
clearButton.click(clearHistory);

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
            cityName.html(data.name + "(" + date + ")" + "<img src=" + iconURL + ">");
            currentTemp.html(data.main.temp + "°F");
            currentHumidity.html(data.main.humidity + "%");
            currentWindSpeed.html(data.wind.speed + "MPH");
            UVIndex(data.coord.lon, data.coord.lat);
            if(data.cod == 200) {
                searchedCity = JSON.parse(localStorage.getItem("cityname"));
                console.log(searchedCity);
                if(searchedCity==null) {
                    searchedCity = [];
                    searchedCity.push(city.toUpperCase());
                    localStorage.setItem("cityname", JSON.stringify(searchedCity));
                    addToList(city);
                }
                else {
                    if(find(city)>0) {
                        searchedCity.push(city.toUpperCase());
                        localStorage.setItem("cityname", JSON.stringify(searchedCity));
                        addToList(city)
                    }
                }
            }

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
            currentUV.html(data.value)
        })
    })
}

function find(city){
    for (var i=0; i < searchedCity.length; i++){
        if(city.toUpperCase()===searchedCity[i]){
            return -1;
        }
    }
    return 1;
}

// Add searches to history
function addToList(c){
    var listEl= $("<li>"+c.toUpperCase()+"</li>");
    $(listEl).attr("class","list-group-item");
    $(listEl).attr("data-value",c.toUpperCase());
    $(".list-group").append(listEl);
}

//Clears search history 
function clearHistory(event){
    event.preventDefault();
    searchedCity=[];
    localStorage.removeItem("cityname");
    document.location.reload();
}



# Weather DashBoard

I was tasked with creating a Weather DashBoard to show the weather outlook for multiple cities.
<h1>The following is the acceptance criteria:</h1>

    *   GIVEN a weather dashboard with form inputs
    *   WHEN I search for a city
    *   THEN I am presented with current and future conditions for that city and that city is added to the search history
    *   WHEN I view current weather conditions for that city
    *   THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    *   WHEN I view the UV index
    *   THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    *   WHEN I view future weather conditions for that city
    *   THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
    *   WHEN I click on a city in the search history
    *   THEN I am again presented with current and future conditions for that city

First, when the Weather DashBoard is loaded, the user will see the input form in the top left where they will be able to type in a city to search.

<img src= "https://github.com/vickphat/weather-dash/blob/master/asset/images/weather1.JPG">

After the user types in a city name and click the search bar, they will be presented with the current day's weather conditions. This will include the current date, a weather icon,  temperature, humidity, wind-speed and UV-index. The background color of the UV index will be either green, yellow or red which will show whether the conditions are favorable, moderate or servere.

It will also show a 5 day forecast of that selected city. This will show the date of the day, a weather icon of the predicted weather, predicted temperature and humidity. 

<img src= "https://github.com/vickphat/weather-dash/blob/master/asset/images/weather2.JPG">

<img src= "https://github.com/vickphat/weather-dash/blob/master/asset/images/weather3.JPG">

As you can see, the UV index in Cleveland is low which will indicate it favorable. However, in Paris, the UV index is higher and is now red instead of green. 

While searching for different cities, each city will be saved into the history section.

<img src= "https://github.com/vickphat/weather-dash/blob/master/asset/images/weather4.JPG">

If the user wanted to see the weather conditions of a previous search, they can simply hover over the city's name and click on it. It will bring up the selected city's weather conditions. 

<img src= "https://github.com/vickphat/weather-dash/blob/master/asset/images/weather5.JPG">

If the user wants to start all over again, they can click on the clear history button which will reset all searches. 

<img src= "https://github.com/vickphat/weather-dash/blob/master/asset/images/weather1.JPG">

<h1>Technology Used</h1>

   * JavaScript
   * HTML
   * CSS 

<h1>Link to deployed application:</h1>

https://vickphat.github.io/weather-dash/
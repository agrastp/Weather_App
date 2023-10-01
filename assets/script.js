var searchBtn = document.getElementById("button");
var cityInput = document.getElementById("city-input");
var APIkey = "7d1a630efe515812d5181c337b746a9f";
// var city;

function getWeatherDetails(cityName, lat, lon) {
    var weather_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=` + APIkey + `&units=imperial`;
    fetch(weather_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

           renderCurrentWeather(data);
           renderFiveDayForcast(data);
        })
        .catch(function () {
            alert("An error occured while retriving your weather forecast!")
        })
}

var dayOneWeatherCard = document.getElementById("weather-details");
var dayOneIconCard = document.getElementById("icon-img");
var dayOneWeatherConditionCard =document.getElementById("weather-condition");

function renderCurrentWeather(data){
    
    var currentCity = data.city.name;
    var dayOneDate = data.list[0].dt_txt.split(" ")[0];
    var dayOneTemp = data.list[0].main.temp;
    var dayOneWind = data.list[0].wind.speed;
    var dayOneWeatherCondition = data.list[0].weather[0].description;
    var dayOneWeatherIcon = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    var dayOneHumidity = data.list[0].main.humidity;
  
    var currentDayCard = document.createElement("p");
    currentDayCard.innerHTML = currentCity+", \n" + dayOneDate + "<br> Temperature: " + Math.round(dayOneTemp) + " °F <br> Wind: " + dayOneWind + " mph <br> Humidity: " + dayOneHumidity + " %";
    dayOneWeatherCard.appendChild(currentDayCard);

    var currentWeatherCondition = document.createElement("p");
    currentWeatherCondition.innerHTML = dayOneWeatherCondition;
    dayOneWeatherConditionCard.appendChild(currentWeatherCondition);

    var currentIcon = document.createElement("img");
    dayOneIconCard.innerHTML = "<img src="+ dayOneWeatherIcon + ">";
    dayOneIconCard.appendChild(currentIcon);

    setCityInStorage();
}

function setCityInStorage(){

}

var fiveDayForecastCards = document.getElementsByClassName("card");

function renderFiveDayForcast(data){
    
            
    for (let i = 0; i < data.list.length; i += 8) {
                var currentDayWeather = data.list[i];
                var date = currentDayWeather.dt_txt.split(" ")[0];
                var wind = currentDayWeather.wind.speed;
                var weatherCondition = currentDayWeather.weather.description;
                var weatherIcon = `https://openweathermap.org/img/wn/${currentDayWeather.weather.icon}@2x.png`;
                var temperature = currentDayWeather.main.temp;
                var humidity = currentDayWeather.main.humidity; 

                var fiveDayCards = document.createElement("p");
                fiveDayCard.innerHTML = date + "<br> Temp: " + Math.round(temperature) + " °F <br> Wind: " + wind + " mph <br> Humidity: " + humidity + " %";
                fiveDayCards.appendChildren(fiveDayCards);


            }
    
}

function getCityCoordinates() {
    var cityName = cityInput.value.trim();
    if (!cityName) return;

    var coordinates_API = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + APIkey;

    fetch(coordinates_API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data.length)
                return alert("No data for " + cityName);
            var { name, lat, lon } = data[0];
            getWeatherDetails(name, lat, lon)
        }).catch(function (error) {
        });

}




searchBtn.addEventListener("click", getCityCoordinates);


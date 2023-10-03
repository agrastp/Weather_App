var searchBtn = document.getElementById("button");
var cityInput = document.getElementById("city-input");
var APIkey = "7d1a630efe515812d5181c337b746a9f";


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

    
}

var fiveDayForecastCards = document.querySelector(".weather-cards");
function renderFiveDayForcast(data){
            
    for (let i = 0; i < data.list.length; i += 8) {
                var currentDayWeather = data.list[i];
                var date = currentDayWeather.dt_txt.split(" ")[0];
                var wind = currentDayWeather.wind.speed;
                var weatherCondition = currentDayWeather.weather[0].description;
                var weatherIcon = `https://openweathermap.org/img/wn/${currentDayWeather.weather[0].icon}@2x.png`;
                var weatherIconSrc = "<img src="+ weatherIcon + ">"
                var temperature = currentDayWeather.main.temp;
                var humidity = currentDayWeather.main.humidity; 

                var fiveDays = document.createElement("div");
                fiveDays.innerHTML = date + "<br> Temp: " + Math.round(temperature) + " °F <br> Wind: " + wind + " mph <br> Humidity: " + humidity + " % <br>" + weatherCondition + "<br><br>"+ weatherIconSrc;
                fiveDayForecastCards.appendChild(fiveDays);
                fiveDays.setAttribute("class", "card");
            }  
        }


var pastHistory = document.querySelector("#history");

function handleInputedCities(cityName){
    var cityName = cityInput.value.trim();

    const localStorageContent = localStorage.getItem('cityHistory');

    let cityHistory;
    if (localStorageContent === null){
        cityHistory = [];
    } else {
        cityHistory = JSON.parse(localStorageContent);
    }

    cityHistory.push(cityName);
    localStorage.setItem('cityHistory', JSON.stringify(cityHistory));

    for (let i = 0; i< cityHistory.length; i+=1)
    var eachCity = cityHistory[i];

    var cityButton = document.createElement("button");
    cityButton.innerHTML = eachCity;
    pastHistory.appendChild(cityButton);
    cityButton.setAttribute("class", "cityButton");
    console.log(cityButton.textContent)
}

var cityBtn = document.querySelector(".cityButton");

function searchHistory(){
    var cityName = cityBtn.textContent;
    console.log(cityName)
    if (!cityName) return;
    handleInputedCities();

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


function getCityCoordinates(cityName) {
    var cityName = cityInput.value.trim();
    if (!cityName) return;
    handleInputedCities();

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

cityBtn.addEventListener("click", searchHistory);


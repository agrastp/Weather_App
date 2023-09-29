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
            console.log(data);
            for (let i=0; i<data.list.length; i+=8){
                var currentDayWeather = data.list[i]
                var wind = currentDayWeather.wind.speed;
                var weatherCondition = currentDayWeather.weather.description;
                var weatherIcon = `https://openweathermap.org/img/wn/${currentDayWeather.weather.icon}@2x.png`;
                var temperature = currentDayWeather.main.temp;
                var humidity = currentDayWeather.main.humidity;
            }
        })


        .catch(function () {
            alert("An error occured while retriving your weather forecast!")
        })
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


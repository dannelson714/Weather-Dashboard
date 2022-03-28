var cityID = $("#city-name-input");
var searchBtn = $('#searchBtn');
var cityList = $('#city-list');
var cityStoredList = [];

//Draws list from local storage and prints it on reload
function printList() {
    if (localStorage.getItem("cityList") === null) {
        return
    }
    else {
        cityStoredList = JSON.parse(localStorage.getItem('cityList'));
        console.log (cityStoredList);
        for (i=0; i<cityStoredList.length; i++) {
            var listEl = $('<li>');
            listEl.addClass('list-group-item').text(cityStoredList[i]);
            listEl.appendTo(cityList);
        };
    };
};

printList()

//Adds a new item to list, stores list
var printCity = function (name) {
    cityStoredList.push(name);
    //limits the number of items that can be held in storage to 10
    if (cityStoredList.length > 9) {
        var city = document.getElementById("city-list");
        city.removeChild(city.firstElementChild);
    }
    var listEl = $('<li>');
    listEl.addClass('list-group-item').text(name);
    listEl.appendTo(cityList);
    console.log(cityList);
    localStorage.setItem("cityList", JSON.stringify(cityStoredList));
};

//Establishes search button functionality
var handleFormClick = function (event) {
    event.preventDefault();
    var cityInput = cityID.val().trim();
    if (!cityInput) {
        console.log('You need to name a city!');
        return;
    }
    printCity(cityInput);
    clearPrevData();
    getWeatherApi(cityInput);
    cityID.val('');
};

searchBtn.on('click', handleFormClick);




function getWeatherApi(location) {
    apiKey = '12117bc8be17aa8c9d5018f64b84cc34';
    cityName = location + ", US";
    console.log(cityName);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey +"&units=imperial";
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            weatherToday = $('#weather-today');
            var cityInfo = $('<h2>');
            var Temp = $('<p>');
            var Wind = $('<p>');
            var Humid = $('<p>');
            var UV = $('<p>');
            var icon = $('<img>');
            var imageID = data.weather[0].icon;
            var lonVal = data.coord.lon;
            var latVal = data.coord.lat;
            console.log(data.weather);
            console.log(imageID);
            var iconURL = "http://openweathermap.org/img/wn/"+imageID+"@2x.png";
            icon.attr('src', iconURL);
            Temp.text(" Temp: " + data.main.temp);
            Wind.text(" Wind " + data.wind.speed)
            Humid.text(" Humidity: " + data.main.humidity);
            cityInfo.text(data.name);
            cityInfo.append(icon);

            weatherToday.append(cityInfo);
            weatherToday.append(Temp);
            weatherToday.append(Wind);
            weatherToday.append(Humid)

            //Taking lat and lon values from previous API call to formulate an openweather one-call for UV and forecast data for
            //city by name
            queryURL2 = "http://api.openweathermap.org/data/2.5/onecall?lat="+latVal+"&lon="+lonVal+"&appid=" + apiKey +"&units=imperial";
            fetch(queryURL2)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                console.log(data);
                if (data.current.uvi <= 2) {
                    UV.text(data.current.uvi).attr('class', 'uvi-good');
                    weatherToday.append(UV);
                }
            })   
            
    });
}
//Clears out child elements of id='weather-today'
function clearPrevData () {
    var toClear = $('#weather-today');
    toClear.empty()
}

function UVIdata (data) {
    if (data.current.uvi <= 2) {
        UV.text(data.current.uvi).attr('.uvi-good');
        weatherToday.append(UV);
    }

}


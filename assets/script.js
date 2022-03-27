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
    getWeatherApi(cityInput)
    cityID.val('');
};

searchBtn.on('click', handleFormClick);






weatherToday = $('#weather-today');

function getWeatherApi(location) {
    apiKey = '12117bc8be17aa8c9d5018f64b84cc34';
    cityName = location + ", US";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey +"&units=imperial";
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
    }




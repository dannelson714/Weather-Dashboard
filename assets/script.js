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
        for (i=0; i<cityStoredList.length; i++) {
            var listEl = $('<li>');
            listEl.addClass('list-group-item').text(cityStoredList[i]);
            listEl.appendTo(cityList);
        };
        return cityStoredList;
    };
};

printList()

//Adds a new item to list, stores list
var printCity = function (name) {
    cityStoredList.push(name);
    //limits the number of items that can be held in storage to 9
    if (cityStoredList.length > 9) {
        var city = document.getElementById("city-list");
        city.removeChild(city.firstElementChild);
        cityStoredList = cityStoredList.slice(1);
    }
    var listEl = $('<li>');
    listEl.addClass('list-group-item').text(name);
    listEl.appendTo(cityList);
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
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey +"&units=imperial";
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var unixFormat = moment.unix(data.dt).format("MMM Do, YYYY")
            var weatherToday = $('#weather-today');
            var cityInfo = $('<h2>');
            var Temp = $('<p>');
            var Wind = $('<p>');
            var Humid = $('<p>');
            var UV = $('<p>');
            var icon = $('<img>');
            var imageID = data.weather[0].icon;
            var lonVal = data.coord.lon;
            var latVal = data.coord.lat;
            var iconURL = "http://openweathermap.org/img/wn/"+imageID+"@2x.png";
            icon.attr('src', iconURL);
            Temp.text(" Temp: " + data.main.temp + "°F");
            Wind.text(" Wind " + data.wind.speed + "MPH")
            Humid.text(" Humidity: " + data.main.humidity+"%");
            UV.text(" UV Index: ")
            cityInfo.text(data.name + " (" + unixFormat +")");
            cityInfo.append(icon);

            weatherToday.append(cityInfo);
            weatherToday.append(Temp);
            weatherToday.append(Wind);
            weatherToday.append(Humid);
            weatherToday.append(UV);

            //Taking lat and lon values from previous API call to formulate an openweather one-call for UV and forecast data for
            //city by name
            queryURL2 = "http://api.openweathermap.org/data/2.5/onecall?lat="+latVal+"&lon="+lonVal+"&appid=" + apiKey +"&units=imperial";
            fetch(queryURL2)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                if (data.current.uvi <= 2) {
                    var UVvalue = $('<span>');
                    UVvalue.text(data.current.uvi).attr('class', 'uvi-good');
                    UV.append(UVvalue);
                }
                else if (data.current.uvi > 2 && data.current.uvi <= 5) {
                    var UVvalue = $('<span>');
                    UVvalue.text(data.current.uvi).attr('class', 'uvi-moderate');
                    UV.append(UVvalue);
                }
                else if (data.current.uvi > 5 && data.current.uvi <= 8) {
                    var UVvalue = $('<span>');
                    UVvalue.text(data.current.uvi).attr('class', 'uvi-high');
                    UV.append(UVvalue);
                }
                else if (data.current.uvi > 8) {
                    var UVvalue = $('<span>');
                    UVvalue.text(data.current.uvi).attr('class', 'uvi-very-high');
                    UV.append(UVvalue);
                }
                //creating the lower block of five day forecasts
                titleCard = $('#five-day-forecast');
                titleCard.text("5-Day Forecast:");

                $("#card-1").removeClass("hidden");
                card1 = $('#card-1').children().eq(0);
                createCard(data, card1, 1);

                $("#card-2").removeClass("hidden");
                card2 = $('#card-2').children().eq(0);
                createCard(data, card2, 2);

                $("#card-3").removeClass("hidden");
                card3 = $('#card-3').children().eq(0);
                createCard(data, card3, 3);

                $("#card-4").removeClass("hidden");
                card4 = $('#card-4').children().eq(0);
                createCard(data, card4, 4);

                $("#card-5").removeClass("hidden");
                card5 = $('#card-5').children().eq(0);
                createCard(data, card5, 5);
                
            })   
            
    });
}

//Clears out child elements of id='weather-today' & id='forecast-row'
function clearPrevData () {
    var toClear = $('#weather-today');
    var clearCard1 = $("#card-1").children().eq(0);
    var clearCard2 = $("#card-2").children().eq(0);
    var clearCard3 = $("#card-3").children().eq(0);
    var clearCard4 = $("#card-4").children().eq(0);
    var clearCard5 = $("#card-5").children().eq(0);
    var toClear3 = $('#card-2');
    toClear.empty();
    clearCard1.empty();
    clearCard2.empty();
    clearCard3.empty();
    clearCard4.empty();
    clearCard5.empty();
}

//Dynamically populates each daily forecast card
function createCard(data, card, i) {
    cardHead = $('<h5>');
    cardIcon = $('<img>')
    cardTemp = $('<p>');
    cardWind = $('<p>');
    cardHumid = $('<p>');
    
    cardDate = moment.unix(data.daily[i].dt).format("MM/DD/YYYY")
    imageIcon = data.daily[i].weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/"+imageIcon+"@2x.png";
    cardIcon.attr('src', iconURL);
    cardHead.text(cardDate);
    cardTemp.text("Temp: " + data.daily[i].temp.day+"°F");
    cardWind.text("Wind: " + data.daily[i].wind_speed + "MPH");
    cardHumid.text("Humidity: " + data.daily[i].humidity + "%");
    
    card.append(cardHead);
    card.append(cardIcon);
    card.append(cardTemp);
    card.append(cardWind);
    card.append(cardHumid);
}


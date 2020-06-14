var apiAQKey = 'afb80771-0c67-4a2e-a14c-1a274a7c0597'

var searchCityEl = document.querySelector("#searchCity");
var submitBtnEl = document.querySelector("#submit-btn");

//using visitors IP it looks up the city it belongs to
var localIp = function () {
    getUserIp = "https://json.geoiplookup.io/"

    fetch(getUserIp)
        .then(function (response) {

            if (response.ok) {
                //parse data for JSON payload
                response.json()
                    .then(function (data) {                                               
                        var lat = data.latitude
                        var long = data.longitude
                        //displays pollen count with the latitude and longitude from the JSON payload
                        //currentWeather(lat, long);
                        
                    })
            } else {
                alert("Error: " + response.statusText);
            }
        })
}
//display AQI on page
var displayAQI = function(info){
    var aqi= info.data.current.pollution.aqius;
    $("#aq").text("Air Quality Index (AQI)= "+aqi);
}
localIp();

// Matt's work 

function cityDisplay(localIp) {
    const inputEl = document.getElementById("cityInput");
    const searchEl = document.getElementById("searchButton"); // need a search button ID
    const historyEl = document.getElementById("history");
    const clearEl = document.getElementById("clear-history"); // need a clear history button if I am going to use this
    const cityEl = document.getElementById("cityName");
    const temperatureEl = document.getElementById("temp-display");
    const pollenEl = document.getElementById("pc");
    
    // climacell API key
    const APIKey = "lvn6KyrmNhV8burwAPT5d50820IijJYY"
    // AirVisual API key const APIKey = "3aed9b70-9747-443a-9751-b784377b3b0d"

    // Stores searched city name
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

    function getAirQuality(cityName) {
        // API request
        let lat = response.data.coord.lat;
        let lon = response.data.coord.lon;
        let queryURL = `https://api.climacell.co/v3/realtime/pollen_tree?lat=${lat}&lot=${lon}&key${APIKey}`;
        axios.get(queryURL)

        .then(function(response){
            // Display Temperature
            temperatureEl.innerHTML = "Temperature: " + degree(response.data.main.temp) + " &#176F";
            // Display Pollen Count
            pollenEl.innerHTML = "Pollen: " + response.data/*SOMETHING*/;
        })
        .catch(function(error) {
            alert("Unable to connect to server");
        });
    };

    // Search History
    function renderSearchHistory() {
        historyEl.innerHTML = "";
        for (let i = 0; i < searchHistory.length; i++) {
            const historyItem = document.createElement("input");
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", /*set CSS class attributes*/);
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click", function() {
                getAirQuality(historyItem.value);
            })
            historyEl.append(historyItem);
        }
    }

    // Saves user's search history and displays them 
    renderSearchHistory();
    if (searchHistory.length > 0) {
        getAirQuality(searchHistory[searchHistory.length -1]);
    }
}

cityDisplay ();

// end Matt's work


//get air quality info receiving as parameters latitude and longitude
var getAirQuality = function(lat, lon){
    //API to get AQI of current location
    //var apiUrl = `https://api.airvisual.com/v2/nearest_city?key=${apiAQKey}`
    //API to get AQI data by city, state and country name
    //var apiUrl = `https://api.airvisual.com/v2/city?city=Miami&state=florida&country=USA&key=${apiAQKey}`
    //API to get AQI using coordinates
    var apiUrl = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${apiAQKey}`
    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            console.log(data)
            displayAQI(data);
        });
        } else {
          alert("Error: City not found, Please try again");
        }
    })
    .catch(function(error) {
        alert("Unable to connect with server");
    });
};


//on page load initialize modal
$(document).ready(function() {
    $('.modal').modal();
});


var buttonClickHandler = function(event) {
    var city = event.value;
    getAirQuality(city);
    console.log(city);
    // call Florha and Matt's functions with the value of the text button
    pageGenerate(city);
    console.log(city);
}

  submitBtnEl.addEventListener("click", function() {
    buttonClickHandler(searchCityEl);
}); 
//on page load grab users ip and parse data for latitude and logitude
localIp();
//use latitude and logitude to get air quality data

getAirQuality(35.6914300,-100.6381900);


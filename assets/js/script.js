var apiAQKey = 'afb80771-0c67-4a2e-a14c-1a274a7c0597'
// API Key from Climacell
const ClimaKey = "3X1a6FbacRvPShNS2gvctGSUfYkogDkv"
var searchCityEl = document.querySelector("#searchCity");
var submitBtnEl = document.querySelector("#submit-btn");
const inputEl = document.getElementById("cityInput");
const searchEl = document.getElementById("searchButton"); // need a search button ID
const historyEl = document.getElementById("history");
const clearEl = document.getElementById("clear-history"); // need a clear history button if I am going to use this
const cityEl = document.getElementById("cityName");
const temperatureEl = document.getElementById("temp-display");
const pollenEl = document.getElementById("pc");

//changes date to today's day
$("#date").text(moment().format('MMMM Do, YYYY'));

// Stores searched city name
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

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
                        var lon = data.longitude
                        //displays pollen count with the latitude and longitude from the JSON payload
                        getAirQuality(lat, lon);
                        getPollenCount(lat, lon)
                    })
            } else {
                alert("Error: " + response.statusText);
            }
        })
}

//display AQI on page
var displayAQI = function (info) {
    var aqi = info.data.current.pollution.aqius;
    $("#aq").text("Air Quality Index: " + aqi);
}

// Matt's work 
function getPollenCount(lat, lon) {
    // let lat = lat;
    // let lon = lon;   
    // Display Temperature
    const tempField = "unit_system=us&fields=temp"
    let tempQueryURL = `https://api.climacell.co/v3/weather/realtime?${tempField}&lat=${lat}&lon=${lon}&apikey=${ClimaKey}`
    axios.get(tempQueryURL)
        .then(function (response) {
            temperatureEl.innerHTML= "";
            const tempEl = document.querySelectorAll("temp-display");
            const cityTemperature = document.createElement("h1");
            // cityTemperature.setAttribute("");
            cityTemperature.innerHTML = Math.round(response.data.temp.value) + " &#176F";
            temperatureEl.append(cityTemperature);
        })
    // Display Pollen Count
    const pollenFields = "pollen_tree,pollen_weed,pollen_grass";
    // let pollenQueryURL = `https://api.climacell.co/v3/weather/realtime?fields=${pollenFields}&lat=40.7608&lon=111.891&apikey=${ClimaKey}`
    // Need working lat/lon to use this
    let pollenQueryURL = `https://api.climacell.co/v3/weather/realtime?fields=${pollenFields}&lat=${lat}&lon=${lon}&apikey=${ClimaKey}`
    axios.get(pollenQueryURL)
        .then(function (response) {
            
            pollenEl.innerHTML = "";

            // Grass Pollen Count
            const grassPollenCount = document.createElement("p");
            // grassPollenCount.setAttribute("");
            grassPollenCount.textContent = "Grass Index: " + response.data.pollen_grass.value;
            pollenEl.append(grassPollenCount);
            // Weed Pollen Count
            const weedPollenCount = document.createElement("p");
            // grassPollenCount.setAttribute("");
            weedPollenCount.textContent = "Weed Index: " + response.data.pollen_weed.value;
            pollenEl.append(weedPollenCount);
            // Tree Pollen Count
            const treePollenCount = document.createElement("p");
            // treePollenCount.setAttribute("");
            treePollenCount.textContent = "Tree Index: " + response.data.pollen_tree.value;
            pollenEl.append(treePollenCount);
        })
};

// Search History
function renderSearchHistory() {
    historyEl.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
        const historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("class", /*PLACEHOLDER to set CSS class attributes*/ );
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click", function () {
            getAirQuality(historyItem.value);
        })
        historyEl.append(historyItem);
    }
}

//Saves user's search history and displays them 
renderSearchHistory();
if (searchHistory.length > 0) {
    getAirQuality(searchHistory[searchHistory.length - 1]);
}
//end Matt's work

//get air quality info receiving as parameters latitude and longitude
var getAirQuality = function (lat, lon) {
    //API to get AQI using coordinates
    var apiUrl = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${apiAQKey}`
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    if (searchCityEl.value.length === 0) {
                        cityEl.innerHTML = data.data.city;
                    }
                    // this will display the entered value in the input field
                    else {
                        cityEl.innerHTML = searchCityEl.value;
                    }

                    console.log("Air Quality", data.data);
                    displayAQI(data);
                });
            } else {
                alert("Error: City not found, Please try again");
            }
        })
        .catch(function (error) {
            alert("Unable to connect with server");
        });
}
//on page load initialize modal
$(document).ready(function () {
    $('.modal').modal();
});

var buttonClickHandler = function (event) {
    var city = event.value;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=65fd11245a646ac22c447bd4432d911d`).then(function (response) {
        return response.json()
    }).then(function (results) {
        console.log(results);
        console.log(results.coord.lat, results.coord.lon)
        getAirQuality(results.coord.lat, results.coord.lon);
        getPollenCount(results.coord.lat,results.coord.lon);
    })

    // call Florha and Matt's functions with the value of the text button
    //pageGenerate(city);
    searchCityEl.value = "";
}

submitBtnEl.addEventListener("click", function () {
    buttonClickHandler(searchCityEl);
});

//on page load grab users ip and parse data for latitude and logitude
localIp();

// API Keys
var apiAQKey = 'afb80771-0c67-4a2e-a14c-1a274a7c0597'
const ClimaKey = "3X1a6FbacRvPShNS2gvctGSUfYkogDkv"

var searchCityEl = document.querySelector("#searchCity");
var submitBtnEl = document.querySelector("#submit-btn");
const inputEl = document.getElementById("cityInput");
const historyEl = document.getElementById("history-container");
const clearEl = document.getElementById("clear-history");
const cityEl = document.getElementById("cityName");
const temperatureEl = document.getElementById("temp-display");
const pollenEl = document.getElementById("pc");
var mainEl = document.querySelector("#body")

//changes date to today's day
$("#date").text(moment().format('MMMM Do, YYYY'));
$("#date").addClass("date-text");

// Stores searched city name
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

//using visitors IP it looks up the city it belongs to
var localIp = function () {
    getUserIp = "https://json.geoiplookup.io/"
    fetch(getUserIp)
        .then(function (response) {
            if (!response.ok) {
                var ipErrorModalContainer = document.createElement("div");
                ipErrorModalContainer.setAttribute("class", "modal modal-error");
                ipErrorModalContainer.setAttribute("id", "badIp-error");

                mainEl.appendChild(ipErrorModalContainer);

                var ipErrorModal = document.createElement("div");
                ipErrorModal.setAttribute("class", "modal-content red-text center-align");
                ipErrorModal.innerText = (response.statusText + " Unable to get local air quality, please type in a city manually")

                ipErrorModalContainer.appendChild(ipErrorModal)

                var ipErrorInstance = M.Modal.init(ipErrorModalContainer);

                ipErrorInstance.open();

                return;
            }
            //parse data for JSON payload
            response.json()
                .then(function (data) {
                    var lat = data.latitude
                    var lon = data.longitude
                    getAirQuality(lat, lon);
                    getPollenCount(lat, lon)
                })
        })
        //if geoIPlookup is offline
        .catch(function (error) {
            var ipdownModalContainer = document.createElement("div");
            ipdownModalContainer.setAttribute("class", "modal modal-error");
            ipdownModalContainer.setAttribute("id", "local-down");

            mainEl.appendChild(ipdownModalContainer);

            var ipdownModal = document.createElement("div");
            ipdownModal.setAttribute("class", "modal-content red-text center-align");
            ipdownModal.innerText = (response.statusText + " Unable to get local air quality, please type in a city manually")

            ipdownModalContainer.appendChild(ipdownModal)

            var ipdownInstance = M.Modal.init(ipdownModalContainer);

            ipdownInstance.open();
        });
}

//display AQI on page
var displayAQI = function (info) {
    $("#aq span").remove();
    $("#body").removeClass();
    var aqi = info.data.current.pollution.aqius;
    if (aqi <= 50.99) {
        $("#aq").append(`<span class ='new-badge green'> ${aqi} <i class=" tiny material-icons">thumb_up</i></span>`);
        $("#body").addClass("white-text background-img-good");
    } else if (aqi <= 100.99) {
        $("#aq").append(`<span class ='new-badge yellow'> ${aqi} <i class=" tiny material-icons">info</i></span>`);
        $("#body").addClass("white-text background-img-moderate");
    } else if (aqi <= 150.99) {
        $("#aq").append(`<span class ='new-badge orange'> ${aqi} <i class=" tiny material-icons">info</i></span>`);
        $("#body").addClass("white-text background-img-sensitive");
    } else if (aqi <= 200.99) {
        $("#aq").append(`<span class ='new-badge red'> ${aqi} <i class=" tiny material-icons">warning</i></span>`);
        $("#body").addClass("white-text background-img-unhealthy");
    } else if (aqi <= 300.99) {
        $("#aq").append(`<span class ='new-badge purple'> ${aqi} <i class=" tiny material-icons">warning</i></span>`);
        $("#body").addClass("white-text background-img-vunhealthy");
    } else if (aqi <= 500) {
        $("#aq").append(`<span class ='new-badge maroon'> ${aqi} <i class=" tiny material-icons">warning</i></span>`);
        $("#body").addClass("white-text background-img-hazardous");
    }
}

function getPollenCount(lat, lon) {
    // Display Temperature
    const tempField = "unit_system=us&fields=temp"
    let tempQueryURL = `https://api.climacell.co/v3/weather/realtime?${tempField}&lat=${lat}&lon=${lon}&apikey=${ClimaKey}`
    axios.get(tempQueryURL)
        .then(function (response) {
            temperatureEl.innerHTML = "";
            const tempEl = document.querySelectorAll("temp-display");
            const cityTemperature = document.createElement("h1");
            //cityTemperature.setAttribute("");
            cityTemperature.innerHTML = Math.round(response.data.temp.value) + " &#176F";
            temperatureEl.append(cityTemperature);
        })
    // Display Pollen Count
    const pollenFields = "pollen_tree,pollen_weed,pollen_grass";
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

//get air quality info receiving as parameters latitude and longitude
var getAirQuality = function (lat, lon) {
    //API to get AQI using coordinates
    var apiUrl = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${apiAQKey}`
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    // ensures that the keyed in city will be displayed.
                    if (searchCityEl.value.length === 0) {
                        cityEl.innerHTML = data.data.city;
                        cityEl.setAttribute("class", "city-title")
                        searchCityEl.value = "";
                    }
                    // this will display the entered value in the input field
                    else {
                        cityEl.innerHTML = searchCityEl.value.toLowerCase();
                        cityEl.setAttribute("class", "city-title cities")
                        searchCityEl.value = "";
                    }
                    displayAQI(data);
                });
            } else {
                var aqErrorModalContainer = document.createElement("div");
                aqErrorModalContainer.setAttribute("class", "modal modal-error");
                aqErrorModalContainer.setAttribute("id", "aq-down");

                mainEl.appendChild(aqErrorModalContainer);

                var aqErrorModal = document.createElement("div");
                aqErrorModal.setAttribute("class", "modal-content red-text center-align");
                aqErrorModal.innerText = (response.statusText)

                aqErrorModalContainer.appendChild(aqErrorModal)

                var aqErrorInstance = M.Modal.init(aqErrorModalContainer);

                aqErrorInstance.open();
            }
        })
        .catch(function (error) {
            var avDownModalContainer = document.createElement("div");
            avDownModalContainer.setAttribute("class", "modal modal-error");
            avDownModalContainer.setAttribute("id", "av-down");

            mainEl.appendChild(avDownModalContainer);

            var avDownModal = document.createElement("div");
            avDownModal.setAttribute("class", "modal-content red-text center-align");
            avDownModal.innerText = ("Unable to connect with server")

            avDownModalContainer.appendChild(avDownModal)

            var avDownInstance = M.Modal.init(avDownModalContainer);

            avDownInstance.open();

        });
}
//on page load initialize modal
$(document).ready(function () {
    $('.modal').modal();
});
// prevent duplicate searches from being saved in localstorage
var preventDuplicate = function (name) {
    var i = 0;
    while (i < searchHistory.length) {
        if (searchHistory[i].toUpperCase() === name.toUpperCase()) {
            return true;
        }
        i++
    }
    return false;
}
var buttonClickHandler = function (event) {
    var city = event.value;
    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=65fd11245a646ac22c447bd4432d911d`)
            .then(function (response) {
                if (response.ok) {
                    response.json()
                        .then(function (results) {
                            getAirQuality(results.coord.lat, results.coord.lon);
                            getPollenCount(results.coord.lat, results.coord.lon);

                            //save and display user's search history. Moved this from Global to this function to prevent 
                            //invalid entries from being saved on the history list.
                            if (searchHistory.length > 0) {
                                var validate = preventDuplicate(city)
                                if (validate === false) {
                                    searchHistory.push(city);
                                    localStorage.setItem("search", JSON.stringify(searchHistory));
                                    renderSearchHistory();
                                }
                            } else if (searchHistory.length === 0) {
                                searchHistory.push(city);
                                localStorage.setItem("search", JSON.stringify(searchHistory));
                                renderSearchHistory();
                            }
                        })
                } else {
                    var errorModalContainer = document.createElement("div");
                    errorModalContainer.setAttribute("class", "modal modal-error");
                    errorModalContainer.setAttribute("id", "city-error");

                    mainEl.appendChild(errorModalContainer);

                    var errorModal = document.createElement("div");
                    errorModal.setAttribute("class", "modal-content red-text center-align");
                    errorModal.innerText = (response.statusText + " Please Try Another City")

                    errorModalContainer.appendChild(errorModal)

                    var errorInstance = M.Modal.init(errorModalContainer);

                    errorInstance.open();
                };
            });
    };
}

submitBtnEl.addEventListener("click", function () {
    buttonClickHandler(searchCityEl);
});

// Clear Search History
clearEl.addEventListener("click", function () {
    searchHistory = [];
    localStorage.clear();
    renderSearchHistory();
})

// Search History
function renderSearchHistory() {
    //Display user's search history
    if (searchHistory.length > 0) {
        // Search history will be limited to 6 items.
        if (searchHistory.length > 6) {
            searchHistory.splice(0, 1);
        }
    }
    historyEl.innerHTML = "";

    for (let i = 0; i < searchHistory.length; i++) {

        const historyItem = document.createElement("a");
        /* const historyBtnEl = document.createElement("a") */
        var name = searchHistory[i].toLowerCase();

        historyItem.setAttribute("class", "collection-item waves-effect active white-text transparent cities");
        historyItem.textContent = name;
        historyEl.appendChild(historyItem);
    }
}

historyEl.addEventListener("click", function (e) {
    searchCityEl.value = e.target.text;
    buttonClickHandler(searchCityEl)
});

//on page load grab users ip and parse data for latitude and logitude
localIp();
// calls to display any pervious entries from local storage
renderSearchHistory();
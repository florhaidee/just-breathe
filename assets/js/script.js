var apiAQKey = 'afb80771-0c67-4a2e-a14c-1a274a7c0597'

var searchCityEl = document.querySelector("#searchCity");
var submitBtnEl = document.querySelector("#submit-btn");

// used jquery to target the input's id.
var cityNameEl = $("#searchCity");

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
                        // for consistency Phil said to drop the g. 
                        var lon = data.longitude

                        console.log("localip", lat, lon)
                        getAirQuality(lat, lon)
                        //displays pollen count with the latitude and longitude from the JSON payload
                        //currentWeather(lat, long);
                        
                    })
            } else {
                alert("Error: " + response.statusText);
            }
        })
}
//on page load grab users ip and parse data for latitude and longitude

localIp();


//get air quality info receiving as parameters latitude and longitude
var getAirQuality = function(lat, lon){

    var apiUrl = `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${apiAQKey}`
    console.log(apiUrl);
    fetch(apiUrl)
    .then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(results) {
                // this if statement will display the current city location using the localIp function
                if (cityNameEl.val().length === 0) {
                    $('#cityName').html("City: " + results.data.city)
                }
                // this will display the entered value in the input field
                else {
                    $('#cityName').html("City: " + cityNameEl.val())
                }
            
              console.log("Air Quality", results.data);
            });
        } else {
          alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect with server");
    });
}
// getAirQuality()
// Matt's work 

// function cityDisplay(localIp) {
//     const inputEl = document.getElementById("cityInput");
//     const searchEl = document.getElementById("searchButton"); // need a search button ID
//     const historyEl = document.getElementById("history");
//     const clearEl = document.getElementById("clear-history"); // need a clear history button if I am going to use this
//     const cityEl = document.getElementById("cityName");
//     const temperatureEl = document.getElementById("temp-display");
//     const pollenEl = document.getElementById("pc");
    
//     // climacell API key
//     const APIKey = "lvn6KyrmNhV8burwAPT5d50820IijJYY"
//     // AirVisual API key const APIKey = "3aed9b70-9747-443a-9751-b784377b3b0d"

//     // Stores searched city name
//     let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

//     function getPollenCount(cityName) {
//         // API request
//         let lat = response.data.coord.lat;
//         let lon = response.data.coord.lon;
//         let queryURL = `https://api.climacell.co/v3/realtime/pollen_tree?lat=${lat}&lon=${lon}&key${APIKey}`;
//         axios.get(queryURL)

//         .then(function(response){
//             // Display Temperature
//             temperatureEl.innerHTML = "Temperature: " + degree(response.data.main.temp) + " &#176F";
//             // Display Pollen Count
//             pollenEl.innerHTML = "Pollen: " + response.data/*SOMETHING*/;
//         })
//         .catch(function(error) {
//             alert("Unable to connect to server");
//         });
//     };

//     // Search History
//     function renderSearchHistory() {
//         historyEl.innerHTML = "";
//         for (let i = 0; i < searchHistory.length; i++) {
//             const historyItem = document.createElement("input");
//             historyItem.setAttribute("type", "text");
//             historyItem.setAttribute("readonly", true);
//             historyItem.setAttribute("class", /*set CSS class attributes*/);
//             historyItem.setAttribute("value", searchHistory[i]);
//             historyItem.addEventListener("click", function() {
//                 getAirQuality(historyItem.value);
//             })
//             historyEl.append(historyItem);
//         }
//     }

//     // Saves user's search history and displays them 
//     renderSearchHistory();
//     if (searchHistory.length > 0) {
//         getAirQuality(searchHistory[searchHistory.length -1]);
//     }
// }

// cityDisplay ();

// end Matt's work



//on page load initialize modal
$(document).ready(function() {
    $('.modal').modal();
     });


var buttonClickHandler = function(event) {
    var city = event.value;

    // Phil suggested some changes here. We used the Open Weather API to get the current lat and lon and then fed that into the getAirQuality function.
    // WE can use another API if you all want. 
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=65fd11245a646ac22c447bd4432d911d`).then(function(response) {
        return response.json()
    }).then(function(results){
        console.log(results.coord.lat,results.coord.lon )
        getAirQuality(results.coord.lat,results.coord.lon);

    })

     

    console.log(city);
    //pageGenerate(city);
    console.log(city);
}

  submitBtnEl.addEventListener("click", function() {
    buttonClickHandler(searchCityEl);
}); 
//on page load grab users ip and parse data for latitude and logitude
localIp();
//use latitude and logitude to get air quality data

//using visitors IP it looks up the city it belongs to
var localIp = function () {
    getUserIp = "https://json.geoiplookup.io/"

    fetch(getUserIp)
        .then(function (response) {

            if (response.ok) {
                //parse data for JSON payload
                response.json()
                    .then(function (data) {
                        console.log(data);                        
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
//on page load grab users ip and parse data for latitude and longitude

localIp();

function pageGenerate(cityName) {
    const inputEl = document.getElementById("city-input");
    const searchEl = document.getElementById("search-button");
    const historyEl = document.getElementById("history");
    const clearEl = document.getElementById("clear-history");
    const cityEl = document.getElementById("city-name");
    const pollenEl = document.getElementById("pollen");
    
    // climacell API key
    // const APIKey = "lvn6KyrmNhV8burwAPT5d50820IijJYY"

    // AirVisual API key
    const APIKey = "3aed9b70-9747-443a-9751-b784377b3b0d"

    // Stores searched city name
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

    function getAirQuality(cityName) {
        // Gets API request from AirVisual 
        let queryURL = `https://api.airvisual.com/v2/city?city=${cityName}&country=USA&key=${APIKey}`;
        axios.get(queryURL)

        // Display Pollen Count
        pollenEl.innerHTML = "Pollen: " + response.data.pollen_tree;
    };
}
pageGenerate();
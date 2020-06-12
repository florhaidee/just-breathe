var apiAQKey = 'afb80771-0c67-4a2e-a14c-1a274a7c0597'

var searchCity = document.querySelector("#searchCity");

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
//display AQI on page
var displayAQI = function(info){
    var aqi= info.data.current.pollution.aqius;
    $("#aq").text("Air Quality Index (AQI)= "+aqi);

}
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
}


//on page load initialize modal
$(document).ready(function(){
    $
});


var buttonClickHandler = function(event) {

}

// captures city name when entered in input field
$( "#searchCity" ).keypress(function() {
    var city = document.getElementById("searchCity").value;
    console.log(city);
    // call Florha and Matt's functions with the value of the text button
});

//on page load grab users ip and parse data for latitude and logitude
localIp();
//use latitude and logitude to get air quality data
getAirQuality(40.7608,-111.891);

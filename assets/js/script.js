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
# Just Breathe

## Description
An application that uses third-party API:"Air Visual" and "Climacell", to display air quality index, pollen count and temperature for a given city.

## Motivation for development
Given the current situation with global warming, and every day cities are getting closer to factories, the level of air quality, pollution and pollen allergies are getting worse. We wanted to create an application where everyone can see if their city has a good air quality and types of pollen count; and even know what are the aftermaths depending on the level of contamination on their city.  
We also included the posibility to search for other cities information and gave our users the chance to know what are those indexes before move or travel to other cities.

## Features
* When users open the application the page display Air quality, Pollen count types and temperaure for current location. 

![main page](./assets/images/name)

* The users can also search for a different city information on the Input field and is presented with that information and added to the search history.

![search new city](./assets/images/name)

* If the user wanted to search a city that is on the search history is presented with Air quality index and Pollen count types for that city.

![Search by history](./assets/images/name)

* On the application there is more information available about the air quality index and pollen count types, to access them go to: 
  *Air Quality Index Reference
  *Pollen Index Reference
  
![Air Quality Index Reference](./assets/images/name)

![Pollen Index Reference](./assets/images/name)

## Built With
* HTML
* CSS
* JavaScript
* JQuery

## API and Libraries
* Materialize 
* moment.js 
* jQuery
* WebStorage - LocalStorage to storage persistence data: save all searches
* Air Visual https://www.iqair.com/ - to get Air Quality information.
* Climacell https://developer.climacell.co/v3/reference - to get pollent count information.
* GeoIPLookup.io https://geoiplookup.io/api - to get local information.

## Website
To visit the page go to:
https://florhaidee.github.io/just-breathe/
https://parkerrobison.github.io/just-breathe/


## Contribution

* @parkerrobison - Display/layout, materialize, github, merging, and error handling.
* @jasonmcgill - Get visitor's long and lat function. Display current city and date. Display modals
* @siwel20- Listener and button click handler for search city data. Pollen modal and reference button formating.
* @florhaidee - Air quailty index fetch.  History data validation.
* @MatthewMcFadden - Pollen count fetch.  Display temperature function. History data 



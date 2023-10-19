# Weather App

## React + Vite + Mobx + AntD

This project is built using Vite + React with MobX as state management, AntD is used as UI Library.

### Weather Search Form

* Return weather based on city input
* Upon every search, the result will be saved at the bottom
* On reading from search result, the weather data will be loaded (API will not be called again)
* User can also delete any previously saved search result
* Stagnant error component for if search fails

### Components

#### Search Inputs 

* Free API limitation, can only draw maximum of 5 results for city / country
* More letters input from the user would update the list
* Reset option will be shown on input if there are values in it, or can be reset by the form reset button

##### Country Search

* Not optional, since the lat/lng is returned directly from city API only 
* However, this helps in filtering out the results for city
* If city field contains value, and user enter another country, the city field will be reset 

##### City Search

* As country API doesn't return lat / lng by default, search by city field is required so lat / lng can be retrieved from the city API

### Sources

#### APIs

* Country / City API
    * https://rapidapi.com/wirefreethought/api/geodb-cities
* Weather API
    * https://openweathermap.org/api

#### Random Utility

await new Promise(resolve => setTimeout(resolve, 5000));
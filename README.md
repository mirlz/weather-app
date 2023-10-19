# Weather App

## React + Vite + Mobx + AntD

This project is built using Vite + React with MobX as state management, AntD is used as UI Library.

### Components

#### Search Inputs 

* Free API limitation and can only draw maximum of 5 results
* More letters input from the user would update the list
* As country API doesn't return lat / lng by default, search by city field is required so lat / lng can be retrieved from the city API

### Sources

#### APIs

* Country / City API
    * https://rapidapi.com/wirefreethought/api/geodb-cities
* Weather API
    * https://openweathermap.org/api

#### Random Utility

await new Promise(resolve => setTimeout(resolve, 5000));
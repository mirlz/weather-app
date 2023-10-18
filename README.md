# Weather App

## React + Vite + Mobx + AntD

This project is built using Vite + React with MobX as state management, AntD is used as UI Library.

### Components

#### Search Inputs 

- Set limit to only search if user input > 3 letters, free API limitation and can only draw maximum of 5 results, no support for lazy loading on AntD select drop down
- If limit user to input more than 3 letters, the returned results should be more or less safely returned for auto suggestion
- if 3 letters were input and desired result  is in the 6th position for eg, more letters input from the user would update the list
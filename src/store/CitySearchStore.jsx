import { observable, action } from "mobx";
import CountrySearchStore from "./CountrySearchStore";
import axios from 'axios';
import apis from './api.json';

let timeout;
let currentValue;

const ob = observable({
    cities: [],
    cityField: ''
});

const getCities = action((value) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;
    const country = CountrySearchStore.ob.countryField;

    const triggerReq = () => {

        axios({
            method: "GET",
            url: `${apis.getCities}${value}${(country.length > 0) ? `&countryIds=${country}` : ``}`,
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
            }
        }).then((response) => response.data
        )
            .then((response) => {
                console.log(response)
                if (currentValue === value) {
                    const { data } = response;
                    const selectData = data.map((item) => {
                        if (item.name && item.name !== '') {
                            return (
                                {
                                    value: item.name || '',
                                    text: item.name || ''
                                }
                            )
                        }
                    });
                    setCities(selectData);
                }
            });
    };
    if (value) {
        timeout = setTimeout(triggerReq, 500);
    } else {
        setCities([]);
    }
});

const setCities = action((cities) => {
    ob.cities = cities;
});

const clearOb = action(() => {
    ob.cities = [];
    ob.cityField = '';
})

const CitySearchStore = {
    ob,
    getCities,
    setCities,
    clearOb
};

export default CitySearchStore;
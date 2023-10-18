import { observable, action } from "mobx";
import axios from 'axios';
import apis from './api.json';

let timeout;
let currentValue;

const ob = observable({
    countries: [],
    countryField: ''
});


const getCountries = action((value) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;
    const triggerReq = () => {

        axios({
            method: "GET",
            url: `${apis.getCountries}${value}`,
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
            }
        }).then((response) => response.data
        )
            .then((response) => {
                if (currentValue === value) {
                    const { data } = response;
                    const selectData = data.map((item) => {
                        if (item.name && item.name !== '' && item.code && item.code !== '') {
                            return (
                                {
                                    value: item.code || '',
                                    text: item.name || ''
                                }
                            )
                        }
                    });
                    setCountries(selectData);
                }
            });
    };
    if (value) {
        timeout = setTimeout(triggerReq, 500);
    } else {
        setCountries([]);
    }
});

const setCountries = action((countries) => {
    ob.countries = countries;
});

const clearOb = action(() => {
    ob.countries = [];
    ob.countryField = '';
})

const CountrySearchStore = {
    ob,
    getCountries,
    setCountries,
    clearOb
};

export default CountrySearchStore;
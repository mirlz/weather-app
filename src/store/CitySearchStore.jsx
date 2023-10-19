import { observable, action } from "mobx";
import CountrySearchStore from "./CountrySearchStore";
import axios from 'axios';
import apis from './api.json';

let timeout;

const ob = observable({
    cities: [],
    options: [],
    cityField: '',
    selectedCity: []
});

const getCities = action((value) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    const country = CountrySearchStore.ob.countryField;

    const triggerReq = () => {
        axios({
            method: "GET",
            url: `${apis.getCities}namePrefix=${value}${(country && country.length > 0) ? `&countryIds=${country}` : ``}`,
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
            }
        }).then((response) => response.data
        )
            .then((response) => {
                const { data } = response;
                const selectData = data.map((item) => {
                    if (item.name && item.name !== '') {
                        return (
                            {
                                id: item.id,
                                text: item.name || ''
                            }
                        )
                    }
                });
                setOptions(selectData);
                setCities(data);
            });
    };
    if (value) {
        timeout = setTimeout(triggerReq, 1000);
    } else {
        setOptions([]);
    }
});

const setCities = action((cities) => {
    ob.cities = cities;
});

const setOptions = action((options) => {
    ob.options = options
});

const setSelectedCity = action((city) => {
    ob.selectedCity = city;
});

const clearOb = action(() => {
    ob.cities = [];
    ob.options = [];
    ob.cityField = '';
})

const CitySearchStore = {
    ob,
    setOptions,
    getCities,
    setCities,
    setSelectedCity,
    clearOb
};

export default CitySearchStore;
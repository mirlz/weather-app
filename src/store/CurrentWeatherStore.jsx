import { observable, action } from "mobx";
import axios from 'axios';
import apis from './api.json';
import SearchHistoryStore from "./SearchHistoryStore";

const ob = observable({
    loading: false,
    weather: {},
    cityDetails: {},
    datetime: '',
    error: {}
});

const getCurrentTime = () => {
    ob.datetime = new Date().toLocaleString();
};

const getWeather = action(() => {
    const { latitude, longitude } = ob.cityDetails;
    axios({
        method: "GET",
        url: `${apis.getWeather}lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHERAPI_KEY}&units=metric`,
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
        }
    }).then((response) => {
        ob.weather = response.data;
        SearchHistoryStore.addSearchHistory(ob.cityDetails, ob.weather, ob.datetime);
        setLoading();
    }).catch((error) => {
        const { message, response } = error;
        setError({ message, status: response.status });
        setLoading();
    });
});

const setCityDetails = action((city) => {
    ob.cityDetails = city;
});

const setLoading = action(() => {
    ob.loading = !ob.loading;
});

const setWeather = action((weather) => {
    ob.weather = weather;
});

const setDateTime = action((datetime) => {
    ob.datetime = datetime;
});

const setError = action((err) => {
    ob.error = err;
})

const CurrentWeatherStore = {
    ob,
    getWeather,
    setCityDetails,
    getCurrentTime,
    setLoading,
    setWeather,
    setDateTime
};

export default CurrentWeatherStore;
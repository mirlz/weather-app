import { observable, action } from "mobx";
import mock from './mock.json';
import SearchHistoryStore from "./SearchHistoryStore";

const ob = observable({
    loading: false,
    weather: {},
    cityDetails: {},
    datetime: ''
});

const getCurrentTime = () => {
    ob.datetime = new Date().toLocaleString();;
}
const getWeather = action(async () => {
    const { latitude, longitude } = ob.cityDetails;
    // axios({
    //     method: "GET",
    //     url: `${apis.getWeather}lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHERAPI_KEY}&units=metric`,
    //     headers: {
    //         'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
    //         'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
    //     }
    // }).then((response) => {
    //     ob.weather = response.data;
    // });
    await new Promise(resolve => setTimeout(resolve, 5000));
    ob.weather = mock;
    SearchHistoryStore.setSearchHistory(ob.cityDetails, ob.weather, ob.datetime);
    setLoading();
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
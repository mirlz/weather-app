import { observable, action } from "mobx";
import mock from './mock.json';

const ob = observable({
    loaded: false,
    weather: {},
    selectedCity: {},
    datetime: ''
});

const getCurrentTime = () => {
    ob.datetime = new Date().toLocaleString();;
}
const getWeather = action(async () => {
    const { latitude, longitude } = ob.selectedCity;
    // axios({
    //     method: "GET",
    //     url: `${apis.getWeather}lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHERAPI_KEY}&units=metric`,
    //     headers: {
    //         'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
    //         'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
    //     }
    // }).then((response) => {
    //     console.log(response.data)
    // });
    await new Promise(resolve => setTimeout(resolve, 5000));
    ob.weather = mock;
});

const setSelectedCity = action((city) => {
    ob.selectedCity = city;
});

const HomePageStore = {
    ob,
    getWeather,
    setSelectedCity,
    getCurrentTime
};

export default HomePageStore;
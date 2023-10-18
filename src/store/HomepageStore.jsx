import { observable, action } from "mobx";
import mock from './mock.json';

const ob = observable({
    loading: false,
    weather: {},
    selectedCity: {},
    datetime: '',
    searchResults: []
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
    //     ob.weather = response.data;
    // });
    await new Promise(resolve => setTimeout(resolve, 5000));
    ob.weather = mock;
    setSearchResults(HomePageStore.ob.searchResults.length + 1);
    setLoading();
});

const setSelectedCity = action((city) => {
    ob.selectedCity = city;
});

const setSearchResults = action((key) => {
    const searchResults = [
        ...ob.searchResults
        , {
            id: key,
            selectedCity: ob.selectedCity,
            datetime: ob.datetime
        }];
    ob.searchResults = searchResults;

    console.log('ob.searchResults: ', JSON.stringify(ob.searchResults))
});

const setLoading = action(() => {
    ob.loading = !ob.loading;
});

const HomePageStore = {
    ob,
    getWeather,
    setSelectedCity,
    getCurrentTime,
    setSearchResults,
    setLoading
};

export default HomePageStore;
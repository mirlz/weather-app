import { observable, action } from "mobx";

const ob = observable({
    searchHistory: []
});

const setSearchHistory = action((city, weather, datetime) => {
    const key = ob.searchHistory.length + 1;
    const searchResults = [
        ...ob.searchHistory
        , {
            dataKey: key,
            cityDetails: city,
            weather: weather,
            datetime: datetime,
            listDisplay: `${city.city}, ${city.country}`
        }];
    ob.searchHistory = searchResults;

    console.log('ob.searchHistory: ', JSON.stringify(ob.searchHistory))
});

const SearchHistoryStore = {
    ob,
    setSearchHistory,
};

export default SearchHistoryStore;
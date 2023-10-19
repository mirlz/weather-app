import { observable, action } from "mobx";

const ob = observable({
    searchHistory: [],
    historyId: 0
});

const addSearchHistory = action((city, weather, datetime) => {
    const searchResults = [
        ...ob.searchHistory
        , {
            dataKey: ob.historyId,
            cityDetails: city,
            weather: weather,
            datetime: datetime,
            listDisplay: `${city.city}, ${city.country}`
        }];
    // for local session keep track of search id
    ob.historyId += 1;
    ob.searchHistory = searchResults;
});

const removeFromSearchHistory = action((dataKey) => {
    const data = JSON.parse(JSON.stringify(ob.searchHistory));
    ob.searchHistory = data.filter((history) => history.dataKey !== dataKey);
})

const SearchHistoryStore = {
    ob,
    addSearchHistory,
    removeFromSearchHistory
};

export default SearchHistoryStore;
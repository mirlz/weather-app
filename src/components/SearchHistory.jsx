import { observer } from 'mobx-react-lite';
import { List, Button } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import SearchHistoryStore from '../store/SearchHistoryStore';
import CurrentWeatherStore from '../store/CurrentWeatherStore';

const SearchHistory = observer(() => {
    const data = SearchHistoryStore.ob.searchHistory;

    const handleSearch = (dataKey) => {
        const selectedHistory = data.filter((history) => history.dataKey === dataKey)[0] || [];

        CurrentWeatherStore.setWeather(selectedHistory.weather);
        CurrentWeatherStore.setCityDetails(selectedHistory.cityDetails);
        CurrentWeatherStore.setDateTime(selectedHistory.datetime);
    }

    const handleDelete = (dataKey) => {
        SearchHistoryStore.removeFromSearchHistory(dataKey);
    }

    return (
        <div className="searchHistory">
            <List
                bordered
                header={<h3>Search History</h3>}
                dataSource={data}
                renderItem={(item, count) => (
                    <List.Item>
                        <div className="listItem">
                            <div className="sectionLeft">
                                {count + 1}. {item.listDisplay}
                            </div>
                            <div className="sectionRight">
                                {item.datetime}
                                <Button
                                    shape="circle"
                                    onClick={() => {
                                        handleSearch(item.dataKey)
                                    }}
                                    icon={<SearchOutlined />}
                                />
                                <Button
                                    shape="circle"
                                    onClick={() => {
                                        handleDelete(item.dataKey)
                                    }}
                                    icon={<DeleteOutlined />}
                                />
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
});

export default SearchHistory;
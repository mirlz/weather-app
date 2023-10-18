import { observer } from 'mobx-react-lite';
import { List, Button } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import SearchHistoryStore from '../store/SearchHistoryStore';
import CurrentWeatherStore from '../store/CurrentWeatherStore';

const SearchHistory = observer(() => {
    const data = SearchHistoryStore.ob.searchHistory;
    console.log('searchhistory: ', JSON.stringify(data))

    const handleClick = (dataKey) => {
        const selectedHistory = data.filter((history) => history.dataKey === dataKey)[0] || [];
        console.log('selectedHistory.weather', selectedHistory.weather)

        CurrentWeatherStore.setWeather(selectedHistory.weather);
        CurrentWeatherStore.setCityDetails(selectedHistory.cityDetails);
        CurrentWeatherStore.setDateTime(selectedHistory.datetime);
    }

    return (
        <div className="searchHistory">
            <List
                bordered
                header={<h3>Search History</h3>}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <div className="listItem">
                            <div className="sectionLeft">
                                {item.dataKey}. {item.listDisplay}
                            </div>
                            <div className="sectionRight">
                                {item.datetime}
                                <Button shape="circle" onClick={() => {
                                    handleClick(item.dataKey)
                                }} icon={<SearchOutlined />} />
                                <Button shape="circle" icon={<DeleteOutlined />} />
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
});

export default SearchHistory;
import { observer } from 'mobx-react';
import { Select, Form } from 'antd';
import CitySearchStore from '../store/CitySearchStore';
import CurrentWeatherStore from '../store/CurrentWeatherStore';

const CitySearch = observer(() => {
    const handleSearch = (searchVal) => {
        CitySearchStore.getCities(searchVal);
    };
    const handleChange = (inputVal) => {
        CurrentWeatherStore.setCityDetails(CitySearchStore.ob.cities.filter(city => city.id === inputVal)[0] || []);
        CitySearchStore.ob.cityField = inputVal;

        console.log('selected ', JSON.stringify(CurrentWeatherStore.ob.cityDetails))

    };
    const handleClear = () => {
        CitySearchStore.clearOb();
    }

    return (
        <Form.Item
            name="city"
            label="Search by City"
            field="city"
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Select
                disabled={CurrentWeatherStore.ob.loading}
                allowClear={true}
                showSearch
                defaultActiveFirstOption={false}
                suffixIcon={null}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                onClear={handleClear}
                options={(CitySearchStore.ob.options || []).map((d) => ({
                    value: d.id,
                    label: d.text
                }))}
            />
        </Form.Item>
    );
});

export default CitySearch;
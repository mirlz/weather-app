import { observer } from 'mobx-react';
import { Select, Form } from 'antd';
import CountrySearchStore from '../store/CountrySearchStore';
import CurrentWeatherStore from '../store/CurrentWeatherStore';

const CountrySearch = observer(() => {
    const handleSearch = (searchVal) => {
        if (searchVal.length >= 3) {
            CountrySearchStore.getCountries(searchVal);
        }
    };
    const handleChange = (inputVal) => {
        CountrySearchStore.ob.countryField = inputVal;
    };
    const handleClear = () => {
        CountrySearchStore.clearOb();
    }

    return (
        <Form.Item
            name="country"
            label="Search by Country"
            field="country"
        >
            <Select
                disabled={CurrentWeatherStore.ob.loading}
                allowClear={true}
                showSearch
                placeholder="Min 3 character"
                defaultActiveFirstOption={false}
                suffixIcon={null}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                onClear={handleClear}
                options={(CountrySearchStore.ob.countries || []).map((d) => ({
                    value: d.value,
                    label: d.text
                }))}
            />
        </Form.Item>
    );
});

export default CountrySearch;
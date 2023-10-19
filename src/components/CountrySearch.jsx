import { observer } from 'mobx-react';
import { Select, Form } from 'antd';
import CountrySearchStore from '../store/CountrySearchStore';
import CitySearchStore from '../store/CitySearchStore';
import CurrentWeatherStore from '../store/CurrentWeatherStore';

const CountrySearch = observer((props) => {
    const form = props.form;

    const handleSearch = (searchVal) => {
        CountrySearchStore.getCountries(searchVal);
    };
    const handleChange = (inputVal) => {
        CountrySearchStore.ob.countryField = inputVal;
        CitySearchStore.clearOb();
        form.setFieldsValue({ city: CitySearchStore.ob.cityField })
    };
    const handleClear = () => {
        CountrySearchStore.clearOb();
        CitySearchStore.clearOb();
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
import { observer } from 'mobx-react';
import { Select, Form } from 'antd';
import CitySearchStore from '../store/CitySearchStore';

const CitySearch = observer((props) => {
    const form = props.form;

    const handleSearch = (searchVal) => {
        if (searchVal.length >= 3) {
            CitySearchStore.getCities(searchVal);
        }
    };
    const handleChange = (inputVal) => {
        CitySearchStore.ob.selectedCity = CitySearchStore.ob.cities.filter(city => city.id === inputVal)
        CitySearchStore.ob.cityField = inputVal;

        console.log('selected ', JSON.stringify(CitySearchStore.ob.selectedCity))

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
                showSearch
                placeholder="Min 3 character"
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
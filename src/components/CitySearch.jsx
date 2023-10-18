import { observer } from 'mobx-react';
import { Select, Tooltip, Form } from 'antd';
import CitySearchStore from '../store/CitySearchStore';

const CitySearch = observer((props) => {
    const form = props.form;

    const handleSearch = (searchVal) => {
        if (searchVal.length >= 3) {
            CitySearchStore.getCities(searchVal);
        }
    };
    const handleChange = (inputVal) => {
        CitySearchStore.ob.cityField = inputVal;
    };
    const handleClear = () => {
        CitySearchStore.clearOb();
    }

    return (
        <Tooltip title="Min length of 3 characters">
            <Form.Item
                name="city"
                label="Search by City"
                field="city"
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
                    options={(CitySearchStore.ob.cities || []).map((d) => ({
                        value: d.value,
                        label: d.text
                    }))}
                />
            </Form.Item>
        </Tooltip>
    );
});

export default CitySearch;
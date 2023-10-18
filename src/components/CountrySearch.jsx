import { observer } from 'mobx-react';
import { Select, Tooltip, Form } from 'antd';
import CountrySearchStore from '../store/CountrySearchStore';

const CountrySearch = observer((props) => {
    const form = props.form;

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
        <Tooltip title="Min length of 3 characters">
            <Form.Item
                name="country"
                label="Country"
                field="country"
            >
                <Select
                    allowClear={true}
                    showSearch
                    placeholder="Search by country"
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
        </Tooltip>
    );
});

export default CountrySearch;
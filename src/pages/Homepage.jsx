import { useState } from 'react';
import { Layout, Select, Form, Col, Row } from 'antd';
const { Header, Content, Footer } = Layout;
import apis from '../store/api.json';
import axios from 'axios';

let timeout;
let currentValue;
const fetch = (value, callback) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;
    const triggerReq = () => {

        axios({
            method: "GET",
            url: `${apis.getCountry}${value}`,
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
            }
        }).then((response) => response.data
        )
            .then((response) => {
                if (currentValue === value) {
                    const { data } = response;
                    const selectData = data.map((item) => {
                        if (item.name && item.name !== '' && item.code && item.code !== '') {
                            return (
                                {
                                    value: item.code || '',
                                    text: item.name || ''
                                }
                            )
                        }
                    });
                    callback(selectData);
                }
            });
    };
    if (value) {
        timeout = setTimeout(triggerReq, 500);
    } else {
        callback([]);
    }
};
const SearchInput = () => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState();
    const handleSearch = (newValue) => {
        if (newValue.length >= 3) {
            fetch(newValue, setData);
        }
    };
    const handleChange = (newValue) => {
        setValue(newValue);
    };
    return (
        <Select
            showSearch
            value={value}
            placeholder="Search by country"
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            options={(data || []).map((d) => ({
                value: d.value,
                label: d.text
            }))}
        />
    );
};

const Homepage = () => {
    const [form] = Form.useForm();

    return (
        <Layout className="layout">
            <Header className="header">
                <div className="sprite sprite--thunderstorm logo"></div><h2>{`Today's Weather`}</h2>
            </Header>
            <Content className="content">
                <div className="site-layout-content">
                    <Form
                        form={form}
                        name="weather"
                    >
                        <Row gutter={16}>
                            <Col sm={12} lg={6} xxl={4}>
                                <Form.Item
                                    name="country"
                                    label="Country"
                                    field="country"
                                >
                                    <SearchInput />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    )
};

export default Homepage

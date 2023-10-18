import { observer } from 'mobx-react-lite';
import { Layout, Form, Col, Row, Button } from 'antd';
const { Header, Content, Footer } = Layout;
import CurrentWeatherStore from '../store/CurrentWeatherStore';
import CountrySearchStore from '../store/CountrySearchStore';
import CitySearchStore from '../store/CitySearchStore';

import CountrySearch from '../components/CountrySearch';
import CitySearch from '../components/CitySearch';
import CurrentWeather from '../components/CurrentWeather';
import SearchHistory from '../components/SearchHistory';
import Loading from '../components/Loading';
import SearchHistoryStore from '../store/SearchHistoryStore';

const Homepage = observer(() => {
    console.log("country:", CountrySearchStore.ob.countryField)
    console.log("country length:", CountrySearchStore.ob.countryField.length)
    console.log("city:", CitySearchStore.ob.cityField)

    const [form] = Form.useForm();
    const onFinish = () => {
        CurrentWeatherStore.getWeather();
        CurrentWeatherStore.getCurrentTime();
        CurrentWeatherStore.setLoading();

        form.resetFields();
        CountrySearchStore.clearOb();
        CitySearchStore.clearOb();
    };
    const onReset = () => {
        form.resetFields();
        CountrySearchStore.clearOb();
        CitySearchStore.clearOb();
    };

    return (
        <Layout className="layout">
            <Header className="header">
                <h2>{`Today's Weather`}</h2>
            </Header>
            <Content className="content">
                <div className="site-layout-content">
                    <Form
                        form={form}
                        name="weather"
                        onFinish={onFinish}
                    >
                        <Row gutter={16}>
                            <Col xs={12} lg={8} xxl={5}>
                                <CountrySearch form={form} />
                            </Col>
                            <Col xs={12} lg={8} xxl={5}>
                                <CitySearch form={form} />
                            </Col>
                            <Col xs={10} sm={6} md={4} xxl={2}>
                                <Form.Item>
                                    <Button
                                        disabled={CurrentWeatherStore.ob.loading}
                                        htmlType="submit"
                                        type="primary"
                                        block>
                                        Search</Button>
                                </Form.Item>
                            </Col>
                            <Col xs={10} sm={6} md={4} xxl={2}>
                                <Form.Item>
                                    <Button
                                        disabled={CurrentWeatherStore.ob.loading}
                                        htmlType="button"
                                        onClick={onReset}
                                        block>
                                        Reset</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            {
                                (Object.keys(CurrentWeatherStore.ob.weather).length > 0 && !CurrentWeatherStore.ob.loading) ? <CurrentWeather />
                                    : (CurrentWeatherStore.ob.loading) ? <Loading /> : ''
                            }
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            {
                                Object.keys(SearchHistoryStore.ob.searchHistory).length > 0 ? <SearchHistory />
                                    : ''
                            }
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>MirlZ ©2023 Created by Ant UED</Footer>
        </Layout >
    )
});

export default Homepage

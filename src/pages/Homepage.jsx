import { observer } from 'mobx-react-lite';
import { Layout, Form, Col, Row, Button } from 'antd';
const { Header, Content, Footer } = Layout;
import CountrySearch from '../components/CountrySearch';
import CitySearch from '../components/CitySearch';
import CountrySearchStore from '../store/CountrySearchStore';
import CitySearchStore from '../store/CitySearchStore';

const Homepage = observer(() => {
    console.log("country:", CountrySearchStore.ob.countryField)
    console.log("country length:", CountrySearchStore.ob.countryField.length)
    console.log("city:", CitySearchStore.ob.cityField)

    const [form] = Form.useForm();
    const onFinish = (val) => {

        console.log(val)

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
                            <Col sm={12} lg={8} xxl={5}>
                                <CountrySearch form={form} />
                            </Col>
                            <Col sm={12} lg={8} xxl={5}>
                                <CitySearch form={form} />
                            </Col>
                            <Button htmlType="submit" type="primary">Search</Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Row>
                    </Form>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout >
    )
});

export default Homepage

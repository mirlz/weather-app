import { observer } from 'mobx-react-lite';
import { Layout, Form, Col, Row } from 'antd';
const { Header, Content, Footer } = Layout;
import CountrySearch from '../components/CountrySearch';
import CitySearch from '../components/CitySearch';

const Homepage = observer(() => {
    const [form] = Form.useForm();

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
                    >
                        <Row gutter={16}>
                            <Col sm={12} lg={8} xxl={5}>
                                <CountrySearch form={form} />
                            </Col>
                            <Col sm={12} lg={8} xxl={5}>
                                <CitySearch form={form} />
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    )
});

export default Homepage

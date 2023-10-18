import React from 'react';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

const Homepage = (props) => {
    return (
        <Layout className="layout">
            <Header className="header">
                <div className="sprite sprite--thunderstorm logo"></div><h2>{`Today's Weather`}</h2>
            </Header>
            <Content className="content">
                <div className="site-layout-content">
                    Content
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    )
};

export default Homepage

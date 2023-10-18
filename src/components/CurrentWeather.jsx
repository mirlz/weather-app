import { observer } from 'mobx-react';
import { Col, Row, Card } from 'antd';
import CurrentWeatherStore from '../store/CurrentWeatherStore';

const CurrentWeather = observer(() => {
    const weather = CurrentWeatherStore.ob.weather;
    const cityDetails = CurrentWeatherStore.ob.cityDetails;
    const datetime = CurrentWeatherStore.ob.datetime;

    const {
        weather: [
            { main, description, icon }
        ],
        main: {
            temp_min, temp_max, feels_like, humidity
        },
    } = weather;
    return (
        <Card className="currentWeather">
            <Row>
                <Col xs={24}>
                    <div className="location">
                        <div className="labelTitle">{cityDetails.city}, {cityDetails.country}</div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={24}>
                    <div className="main">
                        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
                        {main}
                    </div>
                </Col>
            </Row>
            <Col xs={24}>
                <Row>
                    <Col xs={12} md={8} lg={6} xxl={4}>
                        <div className="labelTitle">Description: </div>
                    </Col>
                    <Col xs={12} md={8} lg={6} xxl={4}>
                        {description}
                    </Col>
                </Row>
            </Col>
            <Col xs={24}>
                <Row>
                    <Col xs={12} md={8} lg={6} xxl={4}>
                        <div className="labelTitle">Temperature: </div>
                    </Col>
                    <Col xs={12} md={8} lg={6} xxl={4}>
                        {temp_min}°C ~ {temp_max}°C
                    </Col>
                </Row>
            </Col>
            <Col xs={24}>
                <Row>
                    <Col xs={12} md={8} lg={6} xxl={4}>
                        <div className="labelTitle">Real Feel: </div>
                    </Col>
                    <Col xs={12} md={8} lg={6} xxl={4}>
                        {feels_like}°C
                    </Col>
                </Row>
            </Col>
            <Col xs={24}>
                <Row>
                    <Col xs={12} md={8} lg={6} xxl={4}>
                        <div className="labelTitle">Humidity: </div>
                    </Col>
                    <Col xs={12} md={8} lg={6} xxl={4}>
                        {humidity}%
                    </Col>
                </Row>
            </Col>
            <Col xs={24}>
                <Row>
                    <Col xs={12} md={8} lg={6} xxl={4}>
                        <div className="labelTitle">Time: </div>
                    </Col>
                    <Col xs={12} md={8} lg={6} xxl={4}>
                        {datetime}
                    </Col>
                </Row>
            </Col>
        </Card >
    );
});

export default CurrentWeather;
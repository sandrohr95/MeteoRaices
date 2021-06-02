import React from 'react';
import './Result.sass';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faCloud,
    faBolt,
    faCloudRain,
    faCloudShowersHeavy,
    faSnowflake,
    faSun,
    faSmog,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import device from '../responsive/Device';
import ForecastHour from './ForecastHour';
import ResultFadeIn from './ResultFadeIn';
import BigLabel from './BigLabel';
import MediumLabel from './MediumLabel';
import SmallLabel from './SmallLabel';
import Text from './Text';

const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 0;
  opacity: 0;
  visibility: hidden;
  position: relative;
  top: 20px;
  animation: ${ResultFadeIn} 0.5s 1.4s forwards;
`;

const LocationWrapper = styled.div`
  flex-basis: 100%;
`;

const CurrentWeatherWrapper = styled.div`
  flex-basis: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto 1fr;
  margin: 20px 0;
  grid-gap: 30px;
  @media ${device.mobileL} {
    flex-basis: 50%;
    padding-right: 10px;
  }
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
    padding-right: 20px;
  }
`;

const WeatherIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 100px;
    justify-content: flex-end;
  }
  @media ${device.laptop} {
    font-size: 120px;
  }
  @media ${device.laptopL} {
    font-size: 140px;
  }
`;

const TemperatureWrapper = styled.div``;

const Temperature = styled.h3`
  display: block;
  font-size: 50px;
  font-weight: 400;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 70px;
  }
  @media ${device.laptop} {
    font-size: 90px;
  }
  @media ${device.laptopL} {
    font-size: 110px;
  }
`;

const WeatherDetailsWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  align-self: flex-start;
  @media ${device.mobileL} {
    flex-basis: 50%;
  }
`;

const WeatherDetail = styled.div`
  flex-basis: calc(100% / 3);
  padding: 10px;
  @media ${device.laptop} {
    padding: 20px 10px;
  }
`;

const ForecastWrapper = styled.div`
  flex-basis: 100%;
  margin: 20px 0;
  overflow: hidden;
`;

const Forecast = styled.div`
  position: relative;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-color: lightgray #ffffff;
  scrollbar-width: thin;
  margin-top: 20px;
  padding-bottom: 20px;
  @media ${device.laptop} {
    order: 4;
  }
`;

const Result = ({weather}) => {
    const {
        city,
        date,
        main,
        temp,
        humidity_manana,
        humidity_noche,
        humidity_tarde,
        probabilidad_lluvia_manana,
        probabilidad_lluvia_tarde,
        probabilidad_lluvia_noche,
        highestTemp,
        lowestTemp,
        forecast,
    } = weather;

    const forecasts = forecast.map((item, index) => (
        <ForecastHour
            key={index} //item.dt
            temp={Math.floor(item.Temperatura * 1)} //Math.floor(item.main.temp * 1) / 1
            icon={item.Simbolo} //item.weather[0].icon
            month={item.Fecha_Prev.slice(5, 7)}  //item.dt_txt.slice(5, 7)
            day={item.Fecha_Prev.slice(8, 10)}
            hour={item.Fecha_Prev.slice(11, 13) * 1}
        />
    ));
    // sol, luna, nube_gris_sol,nube_sol, nube_luna, nube_gris, nube, lluvia, lluvia_gris, lluvia_luna, lluvia_sol, aguanieve
    function weatherIcon() {
            let icon = null;
        if (main === 'tormenta') {
            icon = <FontAwesomeIcon icon={faBolt}/>;
        } else if (main === 'llovizna_gris') {
            icon = <FontAwesomeIcon icon={faCloudRain}/>;
        } else if (main === 'lluvia' || main === 'lluvia_gris' || main === 'lluvia_luna' || main === 'lluvia_sol') {
            icon = <FontAwesomeIcon icon={faCloudShowersHeavy}/>;
        } else if (main === 'nieve' || main === 'nieve_sol' || main === 'nieve_luna') {
            icon = <FontAwesomeIcon icon={faSnowflake}/>;
        } else if (main === 'sol') {
            icon = <FontAwesomeIcon icon={faSun}/>;
        } else if (main === 'nube_gris' || main === 'nube' || main === 'nube_gris_sol' || main === 'nube_sol' || main === 'nube_alta_sol' || main === 'nube_luna' ||
            main === 'nube_alta_luna' || main === 'nube_gris_luna') {
            icon = <FontAwesomeIcon icon={faCloud}/>;
        } else {
            icon = <FontAwesomeIcon icon={faSmog}/>;
        }
        return icon
    }
    const icon = weatherIcon();

    return (
        <Results>
            <LocationWrapper>
                <BigLabel>
                    {city}
                </BigLabel>
                <SmallLabel weight="400">{date}</SmallLabel>
            </LocationWrapper>
            <CurrentWeatherWrapper>
                <WeatherIcon>{icon}</WeatherIcon>
                <TemperatureWrapper>
                    <Temperature>{Math.floor(temp)}&#176;</Temperature>
                    <SmallLabel weight="400" firstToUpperCase>
                        Temperatura
                    </SmallLabel>
                </TemperatureWrapper>
            </CurrentWeatherWrapper>
            <WeatherDetailsWrapper>
                <WeatherDetail>
                    <SmallLabel align="center" weight="400">
                        {Math.floor(highestTemp)}&#176;
                    </SmallLabel>
                    <Text align="center">Temperatura Máxima</Text>
                </WeatherDetail>
                <WeatherDetail>
                    <SmallLabel align="center" weight="400">
                        {humidity_manana}%
                    </SmallLabel>
                    <Text align="center">Humedad Mañana</Text>
                </WeatherDetail>
                <WeatherDetail>
                    <SmallLabel align="center" weight="400">
                        {probabilidad_lluvia_manana}%
                    </SmallLabel>
                    <Text align="center">Probabilidad de lluvia Mañana</Text>
                </WeatherDetail>
                <WeatherDetail>
                    <SmallLabel align="center" weight="400">
                        {Math.floor(lowestTemp)}&#176;
                    </SmallLabel>
                    <Text align="center">Temperatura Mínima</Text>
                </WeatherDetail>
                <WeatherDetail>
                    <SmallLabel align="center" weight="400">
                        {humidity_tarde}%
                    </SmallLabel>
                    <Text align="center">Humedad Tarde</Text>
                </WeatherDetail>
                <WeatherDetail>
                    <SmallLabel align="center" weight="400">
                        {probabilidad_lluvia_tarde}%
                    </SmallLabel>
                    <Text align="center">Probabilidad de lluvia Tarde</Text>
                </WeatherDetail>
                <WeatherDetail>
                    <SmallLabel align="center" weight="400">
                        {Math.floor(temp)}&#176;
                    </SmallLabel>
                    <Text align="center">Temperatura Media</Text>
                </WeatherDetail>
                <WeatherDetail>
                    <SmallLabel align="center" weight="400">
                        {humidity_noche}%
                    </SmallLabel>
                    <Text align="center">Humedad Noche</Text>
                </WeatherDetail>
                <WeatherDetail>
                    <SmallLabel align="center" weight="400">
                        {probabilidad_lluvia_noche}%
                    </SmallLabel>
                    <Text align="center">Probabilidad de lluvia Noche</Text>
                </WeatherDetail>
            </WeatherDetailsWrapper>
            <ForecastWrapper>
                <MediumLabel weight="400">Previsión del Tiempo</MediumLabel>
                <Forecast>{forecasts}</Forecast>
            </ForecastWrapper>
        </Results>
    );
};

Result.propTypes = {
    weather: PropTypes.shape({
        city: PropTypes.string,
        date: PropTypes.string,
        main: PropTypes.string,
        temp: PropTypes.number,
        humidity_manana: PropTypes.number,
        humidity_noche: PropTypes.number,
        humidity_tarde: PropTypes.number,
        probabilidad_lluvia_manana: PropTypes.number,
        probabilidad_lluvia_tarde: PropTypes.number,
        probabilidad_lluvia_noche: PropTypes.number,
        wind: PropTypes.number,
        highestTemp: PropTypes.number,
        lowestTemp: PropTypes.number,
        forecast: PropTypes.array,
    }).isRequired,
};

export default Result;

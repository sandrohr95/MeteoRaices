import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SmallLabel from './SmallLabel';
import Text from './Text';
import device from '../responsive/Device';

const ForecastWrapper = styled.div`
  flex-shrink: 0;
  flex-basis: 90px;
  padding: 5px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  @media ${device.tablet} {
    flex-basis: 110px;
  }
  @media ${device.laptop} {
    flex-basis: 125px;
  }
  @media ${device.laptopL} {
    flex-basis: 140px;
  }
`;

const WeatherIcon = styled.img`
  display: block;
  height: 50px;
  width: 50px;
  margin: 0 auto;
`;

const ForecastHour = props => {
    const {temp, month, day, hour, icon} = props;

    //Este icono lo podemos coger de openwathermap según el simbolo que nos indique en nuestra API
    // sol, luna, nube_gris_sol,nube_sol, nube_luna, nube_gris, nube, lluvia, lluvia_gris, lluvia_luna, lluvia_sol
    console.log("ICONO: " + icon)
    let weatherIcon = null;
    if (icon === "sol") {
        weatherIcon = "01d";
    } else {
        weatherIcon = "01n";
    }

    const iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`;

    return (
        <ForecastWrapper>
            <Text align="center">
                {month}.{day}
            </Text>
            <Text align="center">{hour}:00</Text>
            <WeatherIcon src={iconUrl}/>
            <SmallLabel align="center" weight="400">
                {temp}&#176;
            </SmallLabel>
        </ForecastWrapper>
    );
};

ForecastHour.propTypes = {
    temp: PropTypes.number.isRequired,
    month: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    hour: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
};

export default ForecastHour;

import React from 'react';
import {getWeatherIcon} from '@components/weather/utils/functions';


export const WeatherIcon = ({weather}) => {
  const image = getWeatherIcon(weather);

  return <img src={image} alt={weather}/>
};
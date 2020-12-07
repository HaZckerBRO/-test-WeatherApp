import React from 'react';
import {Temperature} from '@components/weather/Temperature';
import {getWeatherIcon} from '@components/weather/utils/functions';

export const OtherDaysItem = ({id, day, temperature, isActive, expectedWeather, onClick}) => {
  const classes = isActive ? 'other-days_item active' : 'other-days_item';
  const icon = getWeatherIcon(expectedWeather);
  return (
    <div className={classes} onClick={onClick} data-item={id}>
      <img src={icon} alt={expectedWeather}/>
      <p>{day}</p>
      <Temperature
        value={temperature}
        className='item_temperature'
      />
    </div>
  )
};
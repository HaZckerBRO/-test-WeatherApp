import React from 'react'
import {InfoItem} from '@components/weather/InfoItem';

export const WeatherInfo = ({weather, currentWeather, service}) => {
  const listItem = currentWeather.main && currentWeather || weather.list[0];

  const data = listItem && service.getWeatherInfoData(listItem);

  const renderItems = () => {
    return data && data.map(item => {
      return (
        <InfoItem
          key={Math.random()}
          title={item.title}
          value={item.value}
        />
      )
    })
  };


  return (
    <div className='Weather__info'>
      {renderItems()}
    </div>
  )
};
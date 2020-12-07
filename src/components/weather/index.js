import React from 'react';
import {connect} from 'react-redux';
import {WeatherService} from '@components/weather/utils/weatherService';

import Header from './Header';
import {WeatherInfo} from '@components/weather/WeatherInfo';
import OtherDays from '@components/weather/OtherDays';
import CitySearchInput from '@components/weather/CitySearchInput';


const Weather = (props) => {
  const {lang, weather, currentWeather, isSearchActive} = props;
  const service = new WeatherService(lang);

  const headerComponent = isSearchActive
    ? <CitySearchInput lang={lang}/>
    : (
        <Header
          service={service}
          currentWeather={currentWeather}
          city={weather.city}
        />
      )
  ;

  const weatherComponent = weather.city
    ? (
        <>
          <WeatherInfo
            service={service}
            currentWeather={currentWeather}
            weather={weather}
          />
          <OtherDays
            service={service}
            currentWeather={currentWeather}
            weather={weather}
          />
        </>
      )
    : null
  ;

  return (
    <div className='Weather'>
      {headerComponent}
      {weatherComponent}
    </div>
  )
};

const mapStateToProps = state => {
  return {
    isSearchActive: state.weather.isSearchActive,
    weather: state.weather.fetchedWeather,
    currentWeather: state.weather.currentWeather
  }
};

export default connect(mapStateToProps, null)(Weather);
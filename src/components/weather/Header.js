import React from 'react';
import {connect, useDispatch} from 'react-redux';
import {enableWeatherSearch} from '@/redux/actions';

import {EnvironmentTwoTone} from '@ant-design/icons';
import {Temperature} from '@components/weather/Temperature';
import {WeatherIcon} from '@components/weather/WeatherIcon';

const Header = ({city, currentWeather, service}) => {
  const dispatch = useDispatch();

  const date = currentWeather && new Date(currentWeather.dt_txt) || new Date();
  const dayOfWeek = service.getDayOfWeek(date);
  const dateString = service.getSelectedDateString(date);

  const currentCity = service.getCurrentCity(city);
  const list = currentWeather ? currentWeather : null;
  const temperature = list ? currentWeather.main.feels_like : null;
  const expected = list ? service.getExpectedWeather(currentWeather.weather[0]) : null;

  const locationClickHandler = () => {
    dispatch(enableWeatherSearch())
  };

  const secondSection = currentCity
    ? (
      <div className="second-section">
        <div className="header_weather-icon">
          <WeatherIcon weather={list && currentWeather.weather[0].main}/>
        </div>
        <Temperature
          value={temperature}
          className={"header_temperature"}
        />
      </div>
    )
    : null
  ;

  const expectedWeather = expected
    ? (
      <div className='header_expected'>
        {expected}
      </div>
    )
    : null
  ;

  return (
      <div className='Weather__header'>
        <div className="first-section">
          <div className='header_date'>
            <span className='header_day-of-week'>
              {dayOfWeek}
            </span>
              <span className='header_date-string'>
              {dateString}
            </span>
          </div>

          {expectedWeather}

          <div className='header_location' onClick={locationClickHandler}>
            <EnvironmentTwoTone style={{fontSize: 26}}/>
            <div className='header_city'>{currentCity}</div>
          </div>
        </div>

        {secondSection}
      </div>
  )
};

const mapStateToProps = (state) => {
  return {
    lang: state.app.lang
  }
};

export default connect(mapStateToProps, null)(Header)
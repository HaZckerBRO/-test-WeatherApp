import React, {useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {fetchWeather, hideAlert, showAlert} from '@/redux/actions';
import {checkCityNameStartWith, getAvailableEnglishCityName} from '@components/weather/utils/functions';
import {
  availableCitiesList,
  weatherSearchTitle,
  alertUnavailableCity,
} from '@components/weather/utils/translate';
import {Input, Alert} from 'antd';


const CitySearchInput = ({lang, alertMessage}) => {
  const dispatch = useDispatch();
  const title = weatherSearchTitle[lang];

  const [inputValue, setInputValue] = useState('');
  const [matchingCityNames, setMatchingCityNames] = useState([]);

  const onSearchHandler = (value) => {
    if (getAvailableEnglishCityName(value)) {
      return dispatch(fetchWeather(value, lang))
    }
    dispatch(
      showAlert(alertUnavailableCity[lang])
    )
  };

  const cityNameClickHandler = (e) => {
    const cityName = e.target.dataset.city;
    dispatch(fetchWeather(cityName, lang))
  };

  const inputChangeHandler = (e) => {
    const {value} = e.target;

    dispatch(hideAlert());

    setInputValue(value);

    setMatchingCityNames(() => {
      const allCities = [];
      const cityListKeys = Object.keys(availableCitiesList);

      cityListKeys.map(key => {
        availableCitiesList[key].map(city => allCities.push(city));
      });

      return allCities.filter(name => checkCityNameStartWith(name, value))
    })
  };

  const renderSearchItem = (el) => {
    return (
      <div
        key={el}
        data-city={el}
        onClick={cityNameClickHandler}
        className="search-item"
      >
        {el}
      </div>
    )
  };

  return (
    <div className='Weather__search-city'>
      <h2>{title}</h2>

      <Input.Search
        value={inputValue}
        onSearch={onSearchHandler}
        enterButton
        onChange={inputChangeHandler}
      />

      {matchingCityNames.length > 0
        ? (
            <div className='search_options-list'>
              {matchingCityNames.map(renderSearchItem)}
            </div>
          )
        : null
      }

      {alertMessage
        ? <Alert message={alertMessage} type="error" />
        : null
      }
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    alertMessage: state.app.alertMessage
  }
};

export default connect(mapStateToProps, null)(CitySearchInput);
import cloudy from '@/images/cloudy.png';
import rain from '@/images/rain.png';
import snow from '@/images/snow.png';
import sun from '@/images/sun.png';

import {availableCitiesList} from '@components/weather/utils/translate';

export const getUrlWithCity = (city) => {
  const a = 'https://api.openweathermap.org/data/2.5/forecast?appid=ce1fe59a97e1d3ca691fd2a7a7a2db8a&q=';
  const b = city;
  const c = '&units=metric&lang=ru';
  return a + b + c;
};

export const getAvailableEnglishCityName = (city, lang = false) => {
  let cityKey = null;
  for (const [key, cities] of Object.entries(availableCitiesList)) {
    cities.map(el => {
      if (el.toLowerCase() === city.toLowerCase()) {
        cityKey = key;
      }
    });
  }
  if (availableCitiesList[cityKey]) {
    return availableCitiesList[cityKey][1]
  }
  return false;
};

export const getWeatherIcon = (weather) => {
  switch (weather.toLowerCase()) {
    case 'clouds':
      return cloudy;
    case 'rain':
      return rain;
    case 'snow':
      return snow;
    case 'clear':
      return sun;
    default:
      return sun;
  }
};

export const checkCityNameStartWith = (name, val) => {
  if (val) {
    return name
      .toLowerCase()
      .startsWith(val.toLowerCase())
  }
};

export const checkDataFromApi = (response) => {
  const code = Number(response.cod);
  if (code === 404) {
    return false;
  }
  return true;
};
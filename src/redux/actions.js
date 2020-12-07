import {getUrlWithCity, checkDataFromApi} from '@components/weather/utils/functions';
import {
  DISABLE_SEARCH,
  ENABLE_SEARCH,
  FETCH_WEATHER,
  HIDE_ALERT,
  SET_LANGUAGE,
  SHOW_ALERT,
  SET_CURRENT_ITEM,
  SHOW_APP_ERROR,
} from './types';
import {requestErrorMessage} from '@components/weather/utils/translate';
import {HIDE_APP_ERROR} from '@/redux/types';


export const enableWeatherSearch = () => {
  return {
    type: ENABLE_SEARCH
  }
};

export const disableWeatherSearch = () => {
  return {
    type: DISABLE_SEARCH
  }
};

export const setPageLanguage = (lang) => {
  return {
    type: SET_LANGUAGE,
    payload: lang
  }
};

export const setCurrentDayWeather = (item) => {
  return {
    type: SET_CURRENT_ITEM,
    payload: item
  }
};

export const showAlert = (message) => {
  return {
    type: SHOW_ALERT,
    payload: message
  }
};

export const hideAlert = () => {
  return {
    type: HIDE_ALERT
  }
};

export const showAppError = (message) => {
  return {
    type: SHOW_APP_ERROR,
    payload: message
  }
};

export const hideAppError = () => {
  return {
    type: HIDE_APP_ERROR
  }
};

export const fetchWeather= (city, lang) => {
  const url = getUrlWithCity(city);
  const errorMessage = requestErrorMessage[lang];

  return async (dispath) => {
    try {
      const request = await fetch(url);
      const json = await request.json();
      const isAvailable = checkDataFromApi(json);
      if (isAvailable) {
        dispath({type: FETCH_WEATHER, payload: json});
        dispath(setCurrentDayWeather(json.list[0]));
        dispath(disableWeatherSearch())
      } else {
       throw new Error(errorMessage)
      }
    } catch (e) {
      dispath(showAppError(e.message));
      setTimeout(
        () => dispath(hideAppError()),
        3500
      )
    }
  }
};
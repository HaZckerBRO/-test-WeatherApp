import {FETCH_WEATHER, DISABLE_SEARCH, ENABLE_SEARCH, SET_CURRENT_ITEM} from './types';
import {storage} from '@/utils/storage';

const state = storage();

const getInitState = () => {
  if (state && state.weather) {
    return state.weather
  }
  return initState;
};

const initState = {
  isSearchActive: true,
  currentWeather: {},
  fetchedWeather: {}
};


export const weatherReducer = (state = getInitState(), action) => {
  switch (action.type) {
    case FETCH_WEATHER:
      return {
        ...state,
        fetchedWeather: action.payload
      };
    case ENABLE_SEARCH:
      return {
        ...state,
        isSearchActive: true
      };
    case DISABLE_SEARCH:
      return {
        ...state,
        isSearchActive: false
      };
    case SET_CURRENT_ITEM:
      return {
        ...state,
        currentWeather: action.payload
      };
    default:
      return state;
  }
};
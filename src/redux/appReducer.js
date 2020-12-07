import {storage} from '@/utils/storage';
import {
  SET_LANGUAGE,
  SHOW_ALERT,
  HIDE_ALERT,
  HIDE_APP_ERROR,
  SHOW_APP_ERROR
} from '@/redux/types';

const state = storage();

const getDefaultLang = () => {
  if (state && state.app.lang) {
    return state.app.lang
  }

  let language = window.navigator
    ? (
        window.navigator.language ||
        window.navigator.systemLanguage ||
        window.navigator.userLanguage
      )
    : "ru"
  ;

  return language.substr(0, 2).toLowerCase()
};

const initState = {
  lang: getDefaultLang(),
  alertMessage: null,
  appErrorMessage: null,
};


export const appReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        lang: action.payload
      };
    case SHOW_ALERT:
      return {
        ...state,
        alertMessage: action.payload
      };
    case HIDE_ALERT:
      return {
        ...state,
        alertMessage: ''
      };
    case SHOW_APP_ERROR:
      return {
        ...state,
        appErrorMessage: action.payload
      };
    case HIDE_APP_ERROR:
      return {
        ...state,
        appErrorMessage: null
      };
    default:
      return state;
  }
};
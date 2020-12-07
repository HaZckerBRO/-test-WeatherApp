import {combineReducers} from 'redux';
import {weatherReducer} from './weatherReducer';
import {appReducer} from '@/redux/appReducer';


export const rootReducer = combineReducers({
  app: appReducer,
  weather: weatherReducer,
});
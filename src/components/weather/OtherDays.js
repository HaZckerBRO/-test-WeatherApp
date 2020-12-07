import React from 'react'
import {OtherDaysItem} from '@components/weather/OtherDaysItem';
import {setCurrentDayWeather} from '@/redux/actions';
import {connect, useDispatch} from 'react-redux';

const OtherDays = ({service, weather, currentWeather, isSearchActive}) => {
  const dispatch = useDispatch();
  const {list} = weather;

  const allListDates = service.getAllListDates(list);
  const uniqueDatesList = Array.from(new Set(allListDates));

  const weatherItemsList = {};

  uniqueDatesList.map(date => {
    weatherItemsList[date] = null
  });

  const weatherItems = list
    .filter(listItem => {
      const dateText = new Date(listItem.dt_txt).toLocaleDateString();
      if (!weatherItemsList[dateText]) {
        return weatherItemsList[dateText] = listItem;
      }
    });

  const itemClickHandler = (e) => {
    if (!isSearchActive){
      const itemID = e.target.closest('[data-item]');
      findItemInWeatherList(itemID.dataset.item)
    }
  };

  const findItemInWeatherList = (id) => {
    const elem = weather.list.filter(item => {
      return String(item.dt) === String(id)
    });
    if (elem) {
      dispatch(setCurrentDayWeather(elem[0]))
    }
  };

  const otherDaysItems = weatherItems.map(item => {
    const id = item.dt;
    const isActive = currentWeather && (currentWeather.dt === id);
    const day = service.getDayOfWeek(item.dt_txt).slice(0,3);
    const temp = item.main.temp;
    const expectedWeather = item.weather[0].main;
    return (
      <OtherDaysItem
        id={id}
        key={id}
        day={day}
        temperature={temp}
        expectedWeather={expectedWeather}
        isActive={isActive}
        onClick={itemClickHandler}
      />
    )
  });

  return (
    <div className='Weather__other-days'>
      {otherDaysItems}
    </div>
  )
};

const mapStateToProps = state =>  {
  return {
    isSearchActive: state.weather.isSearchActive
  }
};
export default connect(mapStateToProps, null)(OtherDays)
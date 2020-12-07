import {
  dayOfWeekNames,
  monthNames,
  weatherInfoTitles,
  weatherValuePostfixes
} from '@components/weather/utils/translate';
import {getAvailableEnglishCityName} from '@components/weather/utils/functions';

export class WeatherService {
  constructor(lang) {
    this.lang = lang
  }

  getMonthName = (num) => {
    const monthName = monthNames[this.lang][num];
    return monthName.substring(0, 3);
  };

  getDayOfWeek = (date) => {
    const dayIndex =  new Date(date).getDay();
    return dayOfWeekNames[this.lang][dayIndex];
  };

  getSelectedDateString = (num) => {
    let date = new Date(num);
    const day = date.toLocaleString().slice(0,2);
    const month = this.getMonthName(date.getMonth());
    const year = date.getFullYear();

    return `${day} ${month} ${year}`
  };

  getWeatherInfoTitle = (key) => {
    return weatherInfoTitles[key][this.lang]
  };

  getWeatherInfoValuePostfix = (value, key) => {
    const postfix = weatherValuePostfixes[key][this.lang];
    return `${value} ${postfix}`
  };

  getWeatherInfoData = (item) => {
    const windSpeed = item.wind.speed;
    const {pressure, humidity} = item.main;

    return [
      {
        title: this.getWeatherInfoTitle('wind'),
        value: this.getWeatherInfoValuePostfix(windSpeed,'wind')
      },
      {
        title: this.getWeatherInfoTitle('pressure'),
        value: this.getWeatherInfoValuePostfix(pressure,'pressure')
      },
      {
        title: this.getWeatherInfoTitle('humidity'),
        value: this.getWeatherInfoValuePostfix(humidity,'humidity')
      },
    ];
  };

  getExpectedWeather = (weather) => {
    if (this.lang === 'ru') {
      return 'Ожидается ' + weather.description.toLowerCase();
    }
    return 'Expected ' + weather.main.toLowerCase();
  };

  getAllListDates = (list) => {
    return list.map(item => new Date(item.dt_txt).toLocaleDateString());
  };

  getCurrentCity = (city) => {
    if (city) {
      if (this.lang === 'ru') {
        return city.name
      } else if (this.lang === 'en') {
        return getAvailableEnglishCityName(city.name)
      }
    }
    return null
  };
}
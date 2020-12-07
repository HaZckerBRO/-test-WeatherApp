import React from 'react';
import {setPageLanguage} from '@/redux/actions';
import {useDispatch} from 'react-redux';

const LanguageSelection = ({lang}) => {
  const dispatch = useDispatch();

  const getLangItem = (lang, title) => {
    return (
      <span
        className={getLangClasses(lang)}
        onClick={() => dispatch(setPageLanguage(lang))}
      >
        {title}
      </span>
    )
  };

  const getLangClasses = (value) => {
    return lang === value
      ? 'lang lang--active'
      : 'lang'
  };

  return (
    <h3 className="lang-choiser">
      {getLangItem('ru', 'Русский')}
      <span> / </span>
      {getLangItem('en', 'English')}
    </h3>
  )
};

export default LanguageSelection
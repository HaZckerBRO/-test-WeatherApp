import React from "react";
import {connect} from 'react-redux';

import LanguageSelection from '@components/weather/LanguageSelection';
import Weather from '@components/weather';

const Container = ({lang}) => {
  return (
    <div className='Container'>
      <LanguageSelection lang={lang}/>
      <Weather lang={lang}/>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    lang: state.app.lang,
  }
};

export default connect(mapStateToProps, null)(Container)
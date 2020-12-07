import React from "react";
import {connect} from 'react-redux';
import 'antd/dist/antd.css'
import './styles/main.sass';
import Container from './components/container';
import {AppError} from '@components/appError';


const App = ({appErrorMessage}) => {
  const errorMessage = appErrorMessage
    ? <AppError message={appErrorMessage} />
    : null
  ;

  return (
    <div className='App'>
      {errorMessage}
      <Container/>
      <div className='background' />
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    appErrorMessage: state.app.appErrorMessage
  }
};

export default connect(mapStateToProps, null)(App);
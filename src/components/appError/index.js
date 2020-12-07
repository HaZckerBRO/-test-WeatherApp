import React from "react";
import {Alert} from 'antd';


export const AppError = ({message}) => {
  return (
    <div className='app-error'>
      <Alert message={message} type="error" />
    </div>
  )
};
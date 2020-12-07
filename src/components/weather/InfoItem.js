import React from 'react'

export const InfoItem = ({title, value}) => {
  return (
    <div className='info-item'>
      <div className="info_title">{title}:</div>
      <div className="info_value">{value}</div>
    </div>
  )
};
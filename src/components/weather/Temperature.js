import React from 'react'

export const Temperature = ({value, className}) => {
  const render = () => {
    if (value) {
      return (
        <div className={className}>
          {value}<sup>o</sup>C
        </div>
      )
    }
    return null
  };

  return render()
};
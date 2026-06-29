import React from 'react'

const ErrorState = ({errorStateTitle, errorStateText}) => {
  return (
    <div>
      <h3>{errorStateTitle}</h3>
      <p>{errorStateText}</p>
    </div>
  )
}

export default ErrorState
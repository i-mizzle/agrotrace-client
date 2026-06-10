import React from 'react'
import ProducerNav from '../../partials/producer/ProducerNav';
import ProducerHeader from '../../partials/producer/ProducerHeader';

const ProducerLayout = ({children}) => {
  return (
    <div>
      <ProducerHeader />
      {children}
      <ProducerNav />
    </div>
  )
}

export default ProducerLayout
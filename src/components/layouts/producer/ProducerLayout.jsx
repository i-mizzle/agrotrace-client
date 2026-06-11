import React from 'react'
import ProducerNav from '../../partials/producer/ProducerNav';
import ProducerHeader from '../../partials/producer/ProducerHeader';

const ProducerLayout = ({children}) => {
  return (
    <div className="relative">
      <ProducerHeader />
      <div className="py-5">
        {children}
      </div>
      <div className="fixed bottom-6 w-full left-0">
        <ProducerNav />
      </div>
    </div>
  )
}

export default ProducerLayout
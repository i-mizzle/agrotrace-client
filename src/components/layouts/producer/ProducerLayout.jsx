import React from 'react'
import ProducerNav from '../../partials/producer/ProducerNav';
import ProducerHeader from '../../partials/producer/ProducerHeader';

const ProducerLayout = ({children}) => {
  return (
    <div className="relative">
      <ProducerHeader />
      <div className="py-5 mb-18">
        {children}
      </div>
      <div className="fixed bottom-0 w-full left-0 backdrop-blur-3xl z-999 pb-4">
        <ProducerNav />
      </div>
    </div>
  )
}

export default ProducerLayout
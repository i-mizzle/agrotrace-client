import React from 'react'
import ProducerActivityFeed from '../../../components/elements/dashboard/ProducerActivityFeed';

const Dashboard = () => {
  return (
    <div className="w-full">
      <div className="flex items-stretch justify-between gap-x-4">
        <div className="w-8/12">
          <div className={`rounded-xl p-4 w-full`}>
            <p className="text-xs text-gray-600 dark:text-gray-400">Your Assets Breakdown</p>
            <h1 className="font-semibold text-4xl mt-1">19<span className="text-xs ml-1">Assets</span></h1>
            <p className="text-xs mt-1">11 Crops, 8 Animals across 4 locations</p>
          </div>
        </div>
        <div className="w-4/12">
          <div className={`rounded-xl p-4 w-full bg-accent-dark dark:bg-accent`}>
            <p className="text-white dark:text-at-black text-xs">Compliance Score</p>
            <h1 className="font-semibold text-4xl text-white dark:text-at-black">89<span className="text-xs">%</span></h1>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <ProducerActivityFeed />
      </div>
    </div>
  )
}

export default Dashboard
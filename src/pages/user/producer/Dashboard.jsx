import React from 'react'
import ProducerActivityFeed from '../../../components/elements/dashboard/ProducerActivityFeed';
import ExclamationTriangleIcon from '../../../components/elements/icons/ExclamationTriangleIcon';
import ArrowIcon from '../../../components/elements/icons/ArrowIcon';
import CloseIcon from '../../../components/elements/icons/CloseIcon';
import SquaresStackIcon from '../../../components/elements/icons/SquaresStackIcon';
import BoxIcon from '../../../components/elements/icons/BoxIcon';

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

      {/* Risk alerts */}
      <div className="w-full mt-4 border border-red-500/30 dark:border-red-400/30 bg-red-500/5 dark:bg-red-400/5 rounded-xl p-3 relative">
        
        <div className="flex items-center gap-x-2 mb-1">
          <ExclamationTriangleIcon strokeWidth={1.5} className="w-7 h-7 text-red-600 dark:text-red-400" />
          <div className="w-full">
            <h3 className="text-sm font-medium text-red-500 dark:text-red-400">4 new risk alerts</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Click review to ensure compliance and safety.</p>         
          </div>
        </div>
      
      </div> 

      {/* Batches & Products */}
      <div className="w-full mt-4 flex items-center gap-x-4 justify-between">
        <div className="w-full p-4 bg-white dark:bg-at-dark-gray/5 rounded-xl relative">
          <p className="dark:text-white text-at-black text-xs mb-2">Products from your Assets</p>
          <h1 className="font-semibold text-3xl dark:text-white text-at-black">12</h1>
          {/* <BoxIcon className="absolute bottom-4 right-4 w-10 h-10 text-gray-400/5 dark:text-gray-600/5" /> */}

        </div>
      
        <div className="w-full p-4 bg-white dark:bg-at-dark-gray/5 rounded-xl relative">
          <p className="dark:text-white text-at-black text-xs mb-2">Export Ready Batches</p>
          <h1 className="font-semibold text-3xl dark:text-white text-at-black">11</h1>
          {/* <SquaresStackIcon className="absolute bottom-4 right-4 w-6 h-6 text-gray-400 dark:text-gray-600" /> */}
        </div>
      
        <div className="w-full p-4 bg-white dark:bg-at-dark-gray/5 rounded-xl">
          <p className="dark:text-white text-at-black text-xs mb-2">Batches in Transit</p>
          <h1 className="font-semibold text-3xl dark:text-white text-at-black">6</h1>
        </div>
      </div>

      <div className="w-full mt-4">
        <ProducerActivityFeed />
      </div>
    </div>
  )
}

export default Dashboard
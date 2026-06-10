import React from 'react'
import BellIcon from '../../elements/icons/BellIcon';
import Avatar from '../../../assets/img/placeholder-avatar-male.jpg'

const ProducerHeader = () => {
  return (
    <header className="w-full sticky top-2 bg-at-white dark:bg-at-black">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-x-2">
          <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-at-dark-gray"
            style={{
              backgroundImage: `url(${Avatar})`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div>
            <p className="text-xs font-medium opacity-70">John Doe (Exporter)</p>
            <h3 className="text-sm font-medium opacity-90">Producer Name</h3>
          </div>
        </div>

        <button className="w-12 h-12 flex items-center justify-center rounded-xl relative bg-white dark:bg-at-dark-gray/10 shadow-lg shadow-black/5">
          <BellIcon className="w-7 h-7 opacity-80 text-at-black dark:text-at-white" /> 
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 absolute top-2 right-2" />
        </button>
      </div>
    </header>
  )
}

export default ProducerHeader
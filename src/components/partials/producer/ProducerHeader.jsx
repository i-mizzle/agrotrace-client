import React, { useState } from 'react'
import BellIcon from '../../elements/icons/BellIcon';
import AvatarMale from '../../../assets/img/placeholder-avatar-male.jpg'
import AvatarFemale from '../../../assets/img/placeholder-avatar-female.jpg'
import DotsVertical from '../../elements/icons/DotsVertical';
import { userDetails } from '../../../utils/utils';
import SlideOutModal from '../../layouts/SlideOutModal';
import SquaresStackIcon from '../../elements/icons/SquaresStackIcon';
import LogoutIcon from '../../elements/icons/LogoutIcon';
import CogIcon from '../../elements/icons/CogIcon';
import BoxIcon from '../../elements/icons/BoxIcon';
import ExclamationTriangleIcon from '../../elements/icons/ExclamationTriangleIcon';
import { Link } from 'react-router-dom';

const ProducerHeader = () => {
  const user = userDetails()
  const Avatar = user.gender === 'male' ? AvatarMale : AvatarFemale;

  const [fullNavOpen, setFullNavOpen] = useState(false)
  return (
    <>
      <header className="w-full sticky pt-2 top-0 bg-at-white dark:bg-at-black backdrop-blur-2xl z-999">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-x-2">
            
            <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-at-dark-gray border-4 border-white dark:border-at-black shadow-lg shadow-black/5"
              style={{
                backgroundImage: `url(${Avatar})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            />
            <div>
              <p className="text-xs font-medium opacity-70 capitalize">{user.name} ({user.userType})</p>
              <h3 className="text-sm font-medium opacity-90">{user.organizationRoles.organization.name}</h3>
            </div>
          </div>
          <div className="flex flex-row-reverse items-center gap-x-2">
            <button onClick={()=>{setFullNavOpen(true)}} className="w-8 h-12 flex items-center justify-center rounded-xl relative bg-white dark:bg-at-dark-gray/10 shadow-lg shadow-black/5">
              <DotsVertical className="w-5 h-5 text-at-black dark:text-at-white" />
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-xl relative bg-white dark:bg-at-dark-gray/10 shadow-lg shadow-black/5">
              <BellIcon className="w-6 h-6 opacity-80 text-at-black dark:text-at-white" /> 
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 absolute top-2 right-2" />
            </button>
          </div>
        </div>
      </header>

      <SlideOutModal 
        isOpen={fullNavOpen} 
        closeFunction={() => setFullNavOpen(false)} 
      >
        <div className="w-full py-20">
          <Link to="/producer/products" onClick={()=>{setFullNavOpen(false)}} className="text-sm font-medium w-full py-4 px-4 rounded-lg bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5 flex items-center gap-x-3 mb-4">          
            <BoxIcon className={`w-5 h-5 text-at-dark-gray dark:text-accent`} />
            Products
          </Link>

          <Link to="/producer/batches" onClick={()=>{setFullNavOpen(false)}} className="text-sm font-medium w-full py-4 px-4 rounded-lg bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5 flex items-center gap-x-3 mb-4">          
            <SquaresStackIcon className={`w-5 h-5 text-at-dark-gray dark:text-accent`} />
            Batches
          </Link>
                    
          <button className="text-sm font-medium w-full py-4 px-4 rounded-lg bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5 flex items-center gap-x-3 mb-4">          
            <ExclamationTriangleIcon className={`w-5 h-5 text-at-dark-gray dark:text-accent`} />
            Risk Alerts
          </button>

          <button className="text-sm font-medium w-full py-4 px-4 rounded-lg bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5 flex items-center gap-x-3 mb-4">          
            <CogIcon className={`w-5.5 h-5.5 text-at-dark-gray dark:text-accent`} />
            Settings
          </button>

          <button className="text-sm font-medium w-full py-4 px-4 rounded-lg bg-white dark:bg-transparent shadow-xl shadow-black/5 flex items-center gap-x-3 mb-4">          
            <LogoutIcon className={`w-5 h-5  text-red-600 dark:text-red-400`} />
            Logout
          </button>
        </div>


      </SlideOutModal>
    </>
  )
}

export default ProducerHeader
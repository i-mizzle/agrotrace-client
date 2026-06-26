import React, { useState } from 'react'
import PieChartIcon from '../../elements/icons/PieChartIcon';
import PlusIcon from '../../elements/icons/PlusIcon';
import MapPinIcon from '../../elements/icons/MapPinIcon';
import SquaresIcon from '../../elements/icons/SquaresIcon';
import CalendarIcon from '../../elements/icons/CalendarIcon';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ModalDialog from '../../layouts/ModalDialog';
import BoxIcon from '../../elements/icons/BoxIcon';
import TruckIcon from '../../elements/icons/TruckIcon';

const ProducerNav = () => {
  const location = useLocation();
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const navigate = useNavigate();

  const handleCreateNewItem = () => {
    if(location.pathname.includes('/producer/locations')) {
      navigate('/producer/locations/new-location');
    } else if(location.pathname.includes('/producer/assets')) {
      navigate('/producer/assets/new-asset');
    } else if(location.pathname.includes('/producer/products')) {
      navigate('/producer/products/new-product');
    } else if(location.pathname.includes('/producer/events')) {
      navigate('/producer/events/new-event');
    } else if(location.pathname.includes('/producer/batches')) {
      navigate('/producer/batches/new-batch');
    } else {
      setCreateModalOpen(true);
    }
  }
  return (
    <>
      <div className="px-5 w-full max-w-lg mx-auto">
        <div className="rounded-lg px-5 py-3 flex items-center justify-between gap-x-5 bg-white w-full dark:bg-at-dark-surface shadow-xl dark:shadow-2xl shadow-at-black/5 dark:shadow-at-black">
          <Link to="/producer/dashboard" className={`w-10 h-12 text-xs flex flex-col items-center justify-center rounded-lg `}>
            <PieChartIcon className={`w-6 h-6 ${location.pathname.includes('/producer/dashboard') ? 'text-at-dark-gray dark:text-accent' : 'text-at-black dark:text-at-white'}`} />
            <span className="mt-2 font-semibold font-space-grotesk opacity-80">
              Overview
            </span>
          </Link>
          
          <Link to="/producer/locations" className={`w-10 h-12 text-xs flex flex-col items-center justify-center rounded-lg `}>
            <MapPinIcon className={`w-6 h-6 ${location.pathname.includes('/producer/locations') ? 'text-at-dark-gray dark:text-accent' : 'text-at-black dark:text-at-white'}`} />
            <span className="mt-2 font-semibold font-space-grotesk opacity-80">
              Locations
            </span>
          </Link>

          <div className="flex flex-col items-center justify-center">
            <button className="w-15 h-14 bg-accent-dark -mt-8 dark:bg-accent text-xs flex flex-col items-center justify-center rounded-xl shadow-lg shadow-accent/15" onClick={() => handleCreateNewItem()}>
              <PlusIcon className="w-6 h-6 dark:text-at-black text-at-white" />
            </button>
            <p className="mt-2 text-xs font-semibold font-space-grotesk opacity-80">
              New {location.pathname.includes('/producer/locations') ? 'Location' : location.pathname.includes('/producer/assets') ? 'Asset' : location.pathname.includes('/producer/products') ? 'Product' : location.pathname.includes('/producer/events') ? 'Event' : location.pathname.includes('/producer/batches') ? 'Batch' : 'Item'}
            </p>
          </div>

          <Link to="/producer/assets" className={`w-10 h-12 text-xs flex flex-col items-center justify-center rounded-lg `}>
            <SquaresIcon className={`w-6 h-6 ${location.pathname.includes('/producer/assets') ? 'text-at-dark-gray dark:text-accent' : 'text-at-black dark:text-at-white'}`} />
            <span className="mt-2 font-semibold font-space-grotesk opacity-80">
              Assets
            </span>
          </Link>

          <Link to="/producer/events" className={`w-10 h-12 text-xs flex flex-col items-center justify-center rounded-lg `}>
            <CalendarIcon className={`w-6 h-6 ${location.pathname.includes('/producer/events') ? 'text-at-dark-gray dark:text-accent' : 'text-at-black dark:text-at-white'}`} />
            <span className="mt-2 font-semibold font-space-grotesk opacity-80">
              Events
            </span>
          </Link>
        </div>
      </div>

      <ModalDialog 
        shown={createModalOpen}
        closeFunction={() => setCreateModalOpen(false)}
        dialogTitle="Create New Item"
        maxWidthClass="max-w-lg"
      >
        <div className="w-full p-1">
          <p className="text-sm mb-4">Please select an item to create</p>

          <div className="w-full p-4 rounded-lg bg-white dark:bg-at-black shadow-xl shadow-black/5 flex items-center gap-x-2 justify-between mb-4">
            <div className="w-10 flex items-center justify-center">
              <MapPinIcon className={`w-8 h-8 text-at-dark-gray dark:text-accent`} />
            </div>
            <div className="w-full">
              <h3 className="text-sm font-medium">Locations</h3>
              <p className="text-xs opacity-80 font-medium">Click to create a new location (farm) where you raise crops/livestock</p>
            </div>
          </div>

          <div className="w-full p-4 rounded-lg bg-white dark:bg-at-black shadow-xl shadow-black/5 flex items-center gap-x-2 justify-between mb-4">
            <div className="w-10 flex items-center justify-center">
              <SquaresIcon className={`w-8 h-8 text-at-dark-gray dark:text-accent`} />
            </div>
            <div className="w-full">
              <h3 className="text-sm font-medium">Assets</h3>
              <p className="text-xs opacity-80 font-medium">Click to create a new asset (crop, animal or animal group) for your farm</p>
            </div>
          </div>

          <button
            className="w-full p-4 rounded-lg bg-white dark:bg-at-black shadow-xl shadow-black/5 flex items-center gap-x-2 justify-between mb-4 text-left"
            onClick={() => {
              setCreateModalOpen(false)
              navigate('/producer/products/new-product')
            }}
            type="button"
          >
            <div className="w-10 flex items-center justify-center">
              <BoxIcon className={`w-8 h-8 text-at-dark-gray dark:text-accent`} />
            </div>
            <div className="w-full">
              <h3 className="text-sm font-medium">Products</h3>
              <p className="text-xs opacity-80 font-medium">Click to create a new product from any of your existing assets</p>
            </div>
          </button>

          <button
            className="w-full p-4 rounded-lg bg-white dark:bg-at-black shadow-xl shadow-black/5 flex items-center gap-x-2 justify-between mb-4 text-left"
            onClick={() => {
              setCreateModalOpen(false)
              navigate('/producer/batches/new-batch')
            }}
            type="button"
          >
            <div className="w-10 flex items-center justify-center">
              <TruckIcon className={`w-8 h-8 text-at-dark-gray dark:text-accent`} />
            </div>
            <div className="w-full">
              <h3 className="text-sm font-medium">Shipment Batches</h3>
              <p className="text-xs opacity-80 font-medium">Click to create a new shipment batch from any of your assets or products</p>
            </div>
          </button>
        </div>
      </ModalDialog>
    </>
  )
}

export default ProducerNav
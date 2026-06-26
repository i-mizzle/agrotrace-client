import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import BoxIcon from '../../../../components/elements/icons/BoxIcon'
import ArrowIcon from '../../../../components/elements/icons/ArrowIcon'
import CalendarIcon from '../../../../components/elements/icons/CalendarIcon'
import { placeholderAssets, placeholderLocations, statusColorMap } from './assetMockData'

const AssetCard = ({ asset }) => {
  const location = placeholderLocations[asset.currentLocation]
  const colors = statusColorMap[asset.status] || statusColorMap.active

  return (
    <Link
      className="w-full p-4 rounded-xl border border-transparent bg-white dark:bg-at-dark-gray/5 hover:border-gray-200 dark:hover:border-gray-700/40 shadow-xl shadow-black/5 transition duration-200 block"
      to={`/producer/assets/asset/${asset.id}`}
    >
      <div className="flex items-start justify-between gap-x-3 mb-3">
        <div className="flex items-start gap-x-2">
          <div className="w-8 h-8 rounded-lg bg-at-dark-gray/10 dark:bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
            <BoxIcon className="w-4 h-4 text-at-dark-gray dark:text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold font-space-grotesk">{asset.name}</p>
            <p className="text-xs opacity-75 capitalize mt-0.5">{asset.type}</p>
            <p className="text-xs opacity-60 mt-0.5 text-at-dark-gray/70 dark:text-gray-400">{asset.assetCode}</p>
          </div>
        </div>
        <span className={`text-[10px] px-2 py-1 rounded-full ${colors.bg} ${colors.text} capitalize font-medium`}>
          {asset.status.replace('-', ' ')}
        </span>
      </div>

      <div className="text-xs opacity-80 mb-2">
        <p><span className="opacity-60">Species:</span> {asset.species}</p>
        <p className="mt-1"><span className="opacity-60">Breed:</span> {asset.breed}</p>
      </div>

      {location && (
        <div className="mt-2 p-2 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface text-xs opacity-80">
          <p className="font-semibold">{location.lga}, {location.state}</p>
          <p className="opacity-75 text-[11px] mt-0.5">{location.addressDescription}</p>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-xs opacity-70">
        <div className="flex items-center gap-x-1">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
        </div>
        <span className="inline-flex items-center gap-x-1 text-accent-dark dark:text-accent font-medium">
          View Details
          <ArrowIcon className="w-3 h-3" />
        </span>
      </div>
    </Link>
  )
}

const Assets = () => {
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredAssets = useMemo(() => {
    return placeholderAssets.filter((asset) => {
      const typeMatch = filterType === 'all' || asset.type === filterType
      const statusMatch = filterStatus === 'all' || asset.status === filterStatus
      return typeMatch && statusMatch
    })
  }, [filterType, filterStatus])

  const assetTypes = ['crop', 'animal', 'animalGroup']
  const statuses = ['active', 'growing', 'ready-for-harvest', 'harvested', 'sold']

  return (
    <div className="w-full space-y-4">
      {/* <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5"> */}
        {/* <div className="flex items-center justify-between gap-x-2 mb-4">
          <div>
            <p className="text-xs opacity-70">Your Asset Management</p>
            <h2 className="text-lg font-semibold font-space-grotesk">Your Assets</h2>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs bg-accent/15 text-at-dark-gray dark:text-accent font-medium">
            {placeholderAssets.length} Assets
          </span>
        </div> */}

        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60">Total Assets</p>
            <p className="text-lg font-semibold mt-1">{placeholderAssets.length}</p>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60">Active</p>
            <p className="text-lg font-semibold mt-1">{placeholderAssets.filter(a => a.status === 'active').length}</p>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60">Crops</p>
            <p className="text-lg font-semibold mt-1">{placeholderAssets.filter(a => a.type === 'crop').length}</p>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60">Animals</p>
            <p className="text-lg font-semibold mt-1">{placeholderAssets.filter(a => a.type !== 'crop').length}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="text-xs opacity-70 block mb-2">Filter by Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-at-black/5 dark:bg-at-dark-gray/5 border border-gray-200 dark:border-gray-700/40 text-sm outline-none"
            >
              <option value="all">All Types</option>
              {assetTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-xs opacity-70 block mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-at-black/5 dark:bg-at-dark-gray/5 border border-gray-200 dark:border-gray-700/40 text-sm outline-none"
            >
              <option value="all">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div> */}
      {/* </div> */}

      <div className="">
        <div className="mb-4">
          <p className="text-xs opacity-70">Manage Your Assets</p>
          <h3 className="text-lg font-semibold font-space-grotesk">
            Assets List {filteredAssets.length !== placeholderAssets.length && `(${filteredAssets.length})`}
          </h3>
        </div>

        {filteredAssets.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm opacity-60">No assets match the selected filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Assets

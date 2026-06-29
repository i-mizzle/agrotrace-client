import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ArrowIcon from '../../../../components/elements/icons/ArrowIcon'
import CalendarIcon from '../../../../components/elements/icons/CalendarIcon'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAssets } from '../../../../store/actions/assetsActions'
import Loader from '../../../../components/elements/Loader'
import EmptyState from '../../../../components/elements/EmptyState'
import { statusColorMap } from './assetMockData'

const AssetCard = ({ asset }) => {
  const colors = statusColorMap[asset.status] || statusColorMap.active
  const locationText = typeof asset.currentLocation === 'string'
    ? asset.currentLocation
    : asset.currentLocation?.name || asset.currentLocation?.lga || ''

  return (
    <Link
      className="w-full p-4 rounded-xl border border-transparent bg-white dark:bg-at-dark-gray/5 hover:border-gray-200 dark:hover:border-gray-700/40 shadow-xl shadow-black/5 transition duration-200 block"
      to={`/producer/assets/asset/${asset.id}`}
    >
      <div className="flex items-start justify-between gap-x-3 mb-3">
        <div className="flex items-start gap-x-2">
          <div className="flex-1">
            <p className="text-sm font-semibold font-space-grotesk">{asset.name || 'Untitled asset'}</p>
            <p className="text-xs opacity-75 capitalize mt-0.5">{asset.type || 'asset'}</p>
            {/* <p className="text-xs opacity-60 mt-0.5 text-at-dark-gray/70 dark:text-gray-400">{asset.assetCode || '—'}</p> */}
          </div>
        </div>
        <span className={`text-[10px] px-2 py-1 rounded-full ${colors.bg} ${colors.text} capitalize font-medium`}>
          {(asset.status || '').replace('-', ' ')}
        </span>
      </div>

      <div className="text-xs opacity-80 mb-2">
        <p><span className="opacity-60">Species:</span> {asset[asset.type]?.species || asset?.animalGroup?.species || '—'}</p>
        <p className="mt-1"><span className="opacity-60">Breed:</span> {asset[asset.type]?.breed || asset?.animalGroup?.breed || '—'}</p>
      </div>

      {locationText && (
        <div className="mt-2 p-2 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface text-xs opacity-80">
          <p className="font-semibold">{locationText}</p>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-xs opacity-70">
        <div className="flex items-center gap-x-1">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>{asset.createdAt ? new Date(asset.createdAt).toLocaleDateString() : '—'}</span>
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
  const dispatch = useDispatch()
  const assetsSelector = useSelector((state) => state.assets)
  const [page] = useState(1)
  const [perPage] = useState(25)
  const [filters] = useState('')

  const assets = assetsSelector?.assets?.assets || []
  const isLoading = assetsSelector?.loadingAssets
  const totalAssets = assetsSelector?.assets?.total || assets.length

  useEffect(() => {
    dispatch(fetchAssets(filters, page, perPage))
  }, [dispatch, filters, page, perPage])

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const typeMatch = filterType === 'all' || (asset.type || '').toLowerCase() === filterType
      const statusMatch = filterStatus === 'all' || (asset.status || '').toLowerCase() === filterStatus
      return typeMatch && statusMatch
    })
  }, [assets, filterType, filterStatus])

  const assetTypes = ['crop', 'animal', 'animalGroup']
  const statuses = ['active', 'growing', 'ready-for-harvest', 'harvested', 'sold']

  return (
    <div className="w-full space-y-4">
      <div className="">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-xs opacity-70">Manage Your Assets</p>
            <h3 className="text-lg font-semibold font-space-grotesk">Assets List</h3>
          </div>
          {/* <span className="px-2.5 py-1 rounded-full text-xs bg-accent/15 text-at-dark-gray dark:text-accent font-medium">
            {totalAssets} Assets
          </span> */}
        </div>

        {/* <div className="mt-4 flex flex-col md:flex-row gap-3">
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
      </div>

      {isLoading ? (
        <Loader />
      ) : filteredAssets.length === 0 ? (
        <EmptyState emptyStateTitle="No Assets" emptyStateText="You currently have no assets available." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Assets

import React from 'react'
import { Link } from 'react-router-dom'
import ArrowIcon from '../../../../components/elements/icons/ArrowIcon'
import CalendarIcon from '../../../../components/elements/icons/CalendarIcon'
import BoxIcon from '../../../../components/elements/icons/BoxIcon'
import MapPinIcon from '../../../../components/elements/icons/MapPinIcon'
import { placeholderLocations } from '../assets/assetMockData'
import { batchStatusColorMap, placeholderBatches } from './batchMockData'
import { unSlugify } from '../../../../utils/utils'

const BatchCard = ({ batch }) => {
  const statusColors = batchStatusColorMap[batch.status] || batchStatusColorMap.draft
  const location = placeholderLocations[batch.storageLocation]

  return (
    <Link
      to={`/producer/batches/batch/${batch.id}`}
      className="w-full p-4 rounded-xl border border-transparent bg-white dark:bg-at-dark-gray/5 hover:border-gray-200 dark:hover:border-gray-700/40 shadow-xl shadow-black/5 transition duration-200 block"
    >
      <div className="flex items-start justify-between gap-x-3">
        <div>
          <p className="text-sm font-semibold font-space-grotesk">{batch.batchCode}</p>
          <p className="text-xs opacity-70 mt-1 capitalize">{unSlugify(batch.type)}</p>
        </div>
        <span className={`text-[10px] px-2 py-1 rounded-full ${statusColors.bg} ${statusColors.text} capitalize`}>
          {unSlugify(batch.status)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="p-2.5 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
          <p className="text-[11px] opacity-60">Asset Contributions</p>
          <p className="text-sm font-semibold mt-0.5">{batch.assetContributions.length}</p>
        </div>
        <div className="p-2.5 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
          <p className="text-[11px] opacity-60">Product Contributions</p>
          <p className="text-sm font-semibold mt-0.5">{batch.productContributions.length}</p>
        </div>
      </div>

      <div className="mt-3 text-xs opacity-75 gap-3 grid grid-cols-2">
        <div className="inline-flex items-center gap-x-1.5">
          <BoxIcon className="w-3.5 h-3.5" />
          <span>Total Quantity: {batch.quantity.total} {batch.quantity.unit}</span>
        </div>
        <div className="inline-flex items-center gap-x-1.5">
          <MapPinIcon className="w-3.5 h-3.5" />
          <span>{location ? `${location.lga}, ${location.state}` : 'No storage location'}</span>
        </div>
        <div className="inline-flex items-center gap-x-1.5">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Updated {new Date(batch.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-gray-200/60 dark:border-gray-700/40 flex items-center justify-between text-xs">
        <span className="opacity-75">View full batch details</span>
        <span className="inline-flex items-center gap-x-1 opacity-80">
          Open
          <ArrowIcon className="w-3 h-3" />
        </span>
      </div>
    </Link>
  )
}

const Batches = () => {
  const batches = [...placeholderBatches].sort((firstBatch, secondBatch) => new Date(secondBatch.updatedAt) - new Date(firstBatch.updatedAt))
  const inTransitCount = batches.filter((batch) => batch.status === 'in-transit').length
  const exportReadyCount = batches.filter((batch) => batch.status === 'ready-for-export').length

  return (
    <div className="w-full space-y-4">
      <div className="">
        <p className="text-xs opacity-70">Producer Batch Register</p>
        <h1 className="text-lg font-semibold font-space-grotesk mt-1">Shipment Batches</h1>
        <p className="text-sm opacity-75 mt-2 max-w-2xl">
          Track grouped quantities from assets and products before processing, export, or distribution.
        </p>

      </div>

      <div className="mt-6">
        {batches.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm opacity-60">No batches have been created yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {batches.map((batch) => (
              <BatchCard batch={batch} key={batch.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Batches
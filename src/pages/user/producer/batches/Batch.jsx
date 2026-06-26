import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import ArrowIcon from '../../../../components/elements/icons/ArrowIcon'
import ArrowDownTrayIcon from '../../../../components/elements/icons/ArrowDownTrayIcon'
import BoxIcon from '../../../../components/elements/icons/BoxIcon'
import CalendarIcon from '../../../../components/elements/icons/CalendarIcon'
import MapPinIcon from '../../../../components/elements/icons/MapPinIcon'
import { placeholderAssets, placeholderLocations } from '../assets/assetMockData'
import { batchStatusColorMap, getBatchById } from './batchMockData'
import { unSlugify } from '../../../../utils/utils'

const ContributionRow = ({ label, quantity, unit, date, to }) => {
  return (
    <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface flex items-center justify-between gap-x-3">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs opacity-70 mt-1">{quantity} {unit}</p>
        <p className="text-xs opacity-60 mt-1">Added {new Date(date).toLocaleDateString()}</p>
      </div>
      {to && (
        <Link
          to={to}
          className="inline-flex items-center gap-x-1 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-at-dark-gray/40 hover:bg-white dark:hover:bg-at-dark-gray/60 transition duration-200 text-xs font-medium"
        >
          Open
          <ArrowIcon className="w-3 h-3" />
        </Link>
      )}
    </div>
  )
}

const StatusHistoryRow = ({ historyItem, isLast }) => {
  const statusColors = batchStatusColorMap[historyItem.status] || batchStatusColorMap.draft

  return (
    <div className="flex gap-x-4 pb-2">
      <div className="flex flex-col items-center mt-2">
        <div className={`w-4 h-4 rounded-full border-2 ${statusColors.bg} ${statusColors.border}`} />
        {!isLast && <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600 mt-2" />}
      </div>
      <div className="flex-1 pt-1">
        <div className="flex items-baseline gap-x-2 mb-1">
          <p className="text-sm font-semibold capitalize">{unSlugify(historyItem.status)}</p>
          <p className={`text-[11px] px-2 py-0.5 rounded-full ${statusColors.bg} ${statusColors.text}`}>
            {unSlugify(historyItem.status)}
          </p>
        </div>
        <p className="text-xs opacity-70">Changed by {historyItem.changedByName}</p>
        <div className="flex items-center gap-x-2 text-xs opacity-60 mt-2">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>{new Date(historyItem.date).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

const Batch = () => {
  const { batchId } = useParams()
  const batch = getBatchById(batchId)

  if (!batch) {
    return <Navigate replace to="/producer/batches" />
  }

  const statusColors = batchStatusColorMap[batch.status] || batchStatusColorMap.draft
  const location = placeholderLocations[batch.storageLocation]
  const qrPayload = `agrotrace://batch/${batch.id}/${batch.labelCode || batch.batchCode}`
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(qrPayload)}`

  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
        <div className="flex items-start justify-between gap-x-3 mb-4">
          <div>
            <p className="text-xs opacity-70">Batch Details</p>
            <h1 className="text-lg font-semibold font-space-grotesk mt-1">{batch.batchCode}</h1>
            <p className="text-xs opacity-70 mt-1 capitalize">{unSlugify(batch.type)}</p>
          </div>
          <span className={`text-[10px] px-2 py-1 rounded-full ${statusColors.bg} ${statusColors.text} capitalize`}>
            {unSlugify(batch.status)}
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Total Quantity</p>
            <p className="text-sm font-semibold">{batch.quantity.total} {batch.quantity.unit}</p>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Asset Contributions</p>
            <p className="text-sm font-semibold">{batch.assetContributions.length}</p>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Product Contributions</p>
            <p className="text-sm font-semibold">{batch.productContributions.length}</p>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Quality Grade</p>
            <p className="text-sm font-semibold">{batch.qualityGrade || 'N/A'}</p>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Created By</p>
            <p className="text-sm font-semibold">{batch.createdByName}</p>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Expiry Date</p>
            <p className="text-sm font-semibold">{batch.expiryDate ? new Date(batch.expiryDate).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>

        <div className="mt-3 p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface text-xs opacity-85 flex items-start gap-x-2">
          <MapPinIcon className="w-4 h-4 mt-0.5" />
          <span>{location ? `${location.lga}, ${location.state}` : 'No storage location assigned'}</span>
        </div>

        <div className="mt-3 px-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs opacity-70">
          <span className="inline-flex items-center gap-x-1">
            <CalendarIcon className="w-3.5 h-3.5" />
            Created {new Date(batch.createdAt).toLocaleDateString()}
          </span>
          <span className="inline-flex items-center gap-x-1">
            <CalendarIcon className="w-3.5 h-3.5" />
            Updated {new Date(batch.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
        <div className="mb-4">
          <p className="text-xs opacity-70">Contributions</p>
          <h2 className="text-lg font-semibold font-space-grotesk mt-1">Asset Contributions</h2>
        </div>

        {batch.assetContributions.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm opacity-60">No asset contributions in this batch.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {batch.assetContributions.map((item, index) => {
              const asset = placeholderAssets.find((assetItem) => assetItem.id === item.asset)

              return (
                <ContributionRow
                  key={`${batch.id}-asset-${index}`}
                  label={asset?.name || item.asset}
                  quantity={item.contribution.quantity}
                  unit={item.contribution.unit}
                  date={item.contribution.date}
                  to={asset ? `/producer/assets/asset/${asset.id}` : null}
                />
              )
            })}
          </div>
        )}
      </div>

      <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
        <div className="mb-4">
          <p className="text-xs opacity-70">Contributions</p>
          <h2 className="text-lg font-semibold font-space-grotesk mt-1">Product Contributions</h2>
        </div>

        {batch.productContributions.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm opacity-60">No product contributions in this batch.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {batch.productContributions.map((item, index) => (
              <ContributionRow
                key={`${batch.id}-product-${index}`}
                label={item.productName || item.asset}
                quantity={item.contribution.quantity}
                unit={item.contribution.unit}
                date={item.contribution.date}
                to={`/producer/products/product/${item.asset}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
        <div className="mb-4 flex items-center justify-between gap-x-3">
          <div>
            <p className="text-xs opacity-70">Traceability</p>
            <h3 className="text-md font-semibold font-space-grotesk mt-1">Batch QR Code</h3>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-60">Total Scans</p>
            <p className="text-lg font-semibold font-space-grotesk">{batch.qrScanCount || 0}</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface flex flex-col items-center">
          <img src={qrCodeUrl} alt={`QR code for ${batch.labelCode || batch.batchCode}`} className="w-48 h-48 rounded-lg border border-gray-200/60 dark:border-gray-700/40" />
          <p className="text-xs opacity-65 mt-3 break-all text-center">{qrPayload}</p>
          <a
            href={qrCodeUrl}
            download={`${batch.labelCode || batch.batchCode}-qr.png`}
            className="mt-3 inline-flex items-center gap-x-1 px-3 py-2 rounded-lg bg-accent/15 text-accent-dark dark:text-accent text-sm font-medium hover:bg-accent/20 transition duration-200"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download QR
          </a>
        </div>
      </div>

      <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
        <div className="mb-6">
          <p className="text-xs opacity-70">Batch Journey</p>
          <h3 className="text-md font-semibold font-space-grotesk mt-1">Status History</h3>
        </div>

        {batch.statusHistory.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm opacity-60">No status history available for this batch yet.</p>
          </div>
        ) : (
          <div className="relative pl-4">
            {batch.statusHistory.map((historyItem, index) => (
              <StatusHistoryRow
                key={`${batch.id}-history-${index}`}
                historyItem={historyItem}
                isLast={index === batch.statusHistory.length - 1}
              />
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
        <div className="mb-4">
          <p className="text-xs opacity-70">Aggregation</p>
          <h3 className="text-md font-semibold font-space-grotesk mt-1">Source Summary</h3>
        </div>

        {!batch.aggregation.aggregated || batch.aggregation.sources.length === 0 ? (
          <p className="text-sm opacity-70">This batch is not marked as aggregated.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {batch.aggregation.sources.map((source, index) => (
              <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface" key={`${batch.id}-source-${index}`}>
                <p className="text-sm font-semibold">{source.source}</p>
                <p className="text-xs opacity-70 mt-1">{source.total} {source.unit}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-x-3">
        <Link
          to="/producer/batches"
          className="flex-1 px-4 py-2 rounded-lg bg-at-dark-gray/10 dark:bg-at-dark-surface text-center text-sm font-medium hover:bg-at-dark-gray/20 dark:hover:bg-at-dark-gray/30 transition duration-200 flex items-center justify-center gap-x-1"
        >
          <ArrowIcon className="w-3 h-3 inline-block mr-1 -rotate-180" />
          Back to Batches
        </Link>
      </div>
    </div>
  )
}

export default Batch
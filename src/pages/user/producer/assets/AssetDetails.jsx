import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import CalendarIcon from '../../../../components/elements/icons/CalendarIcon'
import ArrowIcon from '../../../../components/elements/icons/ArrowIcon'
import ArrowDownTrayIcon from '../../../../components/elements/icons/ArrowDownTrayIcon'
import { statusColorMap } from './asset.const'
import { eventCategoryColorMap, eventTypeCategoryColorMap } from '../events/event.const'
import { authHeader, baseUrl, unSlugify } from '../../../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ERROR } from '../../../../store/types';
import Loader from '../../../../components/elements/Loader';
import ErrorState from '../../../../components/elements/ErrorState';
import { fetchEvents } from '../../../../store/actions/eventsActions';
import PlusIcon from '../../../../components/elements/icons/PlusIcon';

const StatusTimelineItem = ({ item, isLast }) => {
  const colors = statusColorMap[item.status] || statusColorMap.active

  return (
    <div className="flex gap-x-4 pb-2">
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center mt-2">
        <div className={`w-4 h-4 rounded-full border-2 ${colors.bg} ${colors.border}`} />
        {!isLast && <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600 mt-2" />}
      </div>

      {/* Content */}
      <div className="flex-1 pt-1">
        <div className="flex items-baseline gap-x-2 mb-1">
          <p className="text-sm font-semibold capitalize">{unSlugify(item.status)}</p>
          <p className={`text-[11px] px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
            {unSlugify(item.status)}
          </p>
        </div>
        <p className="text-xs opacity-70 mb-2">{item.note}</p>
        <div className="flex items-center gap-x-2 text-xs opacity-60">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>{new Date(item.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{item.changedBy}</span>
        </div>
      </div>
    </div>
  )
}

const AssetEventCard = ({ event }) => {
  const categoryColors = eventCategoryColorMap[event.eventCategory] || eventCategoryColorMap.production
  const typeCategoryColors = eventTypeCategoryColorMap[event.eventTypeCategory] || eventTypeCategoryColorMap.inspection

  return (
    <Link
      className="block rounded-xl border border-transparent bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5 p-4 transition duration-200 hover:border-gray-200 dark:hover:border-gray-700/40"
      to={`/producer/events/${event.id}`}
    >
      <div className="flex items-start justify-between gap-x-3">
        <div>
          <p className="text-sm font-semibold font-space-grotesk">{event.title}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`text-[10px] px-2 py-1 rounded-full ${categoryColors.bg} ${categoryColors.text} capitalize`}>
              {unSlugify(event.eventCategory)}
            </span>
            <span className={`text-[10px] px-2 py-1 rounded-full ${typeCategoryColors.bg} ${typeCategoryColors.text} capitalize`}>
              {unSlugify(event.eventTypeCategory)}
            </span>
          </div>
        </div>
        <ArrowIcon className="w-4 h-4 mt-0.5 opacity-60" />
      </div>

      <p className="text-xs opacity-75 mt-3">{unSlugify(event.eventType)}</p>
      <p className="text-xs opacity-70 mt-2">{event.notes[0]?.note}</p>

      <div className="mt-3 flex items-center justify-between gap-x-3 text-[11px] opacity-70">
        <span className="inline-flex items-center gap-x-1">
          <CalendarIcon className="w-3.5 h-3.5" />
          {new Date(event.date).toLocaleDateString()}
        </span>
        <span>{event.performedByName}</span>
      </div>
    </Link>
  )
}

const AssetDetails = () => {
  const { assetId } = useParams()

  const assetsSelector = useSelector((state) => state.assets)
  const eventsSelector = useSelector((state) => state.events)
  const productsSelector = useSelector((state) => state.products)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [asset, setAsset] = useState(null)
  const [assetQr, setAssetQr] = useState(null)

  const handleDownloadQr = async (event) => {
    event.preventDefault()

    const qrCodeUrl = asset?.assetQr?.qrCode
    if (!qrCodeUrl) {
      return
    }

    try {
      const response = await fetch(qrCodeUrl)
      if (!response.ok) {
        throw new Error('Unable to download QR code')
      }

      const qrBlob = await response.blob()
      const objectUrl = URL.createObjectURL(qrBlob)
      const link = document.createElement('a')
      const fileNameBase = asset?.labelCode || asset?.assetCode || asset?.name || 'asset-qr'

      link.href = objectUrl
      link.download = `${fileNameBase}-qr.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(objectUrl)
    } catch (error) {
      dispatch({
        type: ERROR,
        error: { response: { data: { message: 'Failed to download QR code. Please try again.' } } }
      })
    }
  }

  const assetColors = statusColorMap[asset?.status] || statusColorMap?.active

  useEffect(() => {
    const fetchAssetDetails = async () => {
      try {
        const headers = authHeader()
        setLoading(true)
        const response = await axios.get(`${baseUrl}/assets/${assetId}?expand=crop,animalGroup,animal,currentLocation`, {headers})
        dispatch(fetchEvents(`asset=${assetId}`, 1, 10))
        const assetQr = await fetchAssetQr()
        setAsset(response.data.data)
        setAssetQr(assetQr)
      } catch (error) {
        console.error('Error fetching asset details:', error)
        dispatch({
          type: ERROR,
          error
        })
      } finally {
        setLoading(false)
      }
    }

    const fetchAssetQr = async () => {
      try {
        const headers = authHeader()
        const response = await axios.get(`${baseUrl}/assets/${assetId}`, {headers})
        return response.data.data
      } catch (error) {
        console.error('Error fetching asset details:', error)
        dispatch({
          type: ERROR,
          error
        })
      } 
    }


    

    fetchAssetDetails()
  }, [assetId, dispatch])

  return (
    <>
      {loading 
        ?
        <Loader />
        :
        asset ?
        <div className="w-full space-y-4">
          {/* Asset Header */}
          <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
            <div className="flex items-start justify-between gap-x-3 mb-4">
              <div className="flex items-start gap-x-3">
                {/* <div className="w-12 h-12 rounded-lg bg-at-dark-gray/10 dark:bg-accent/15 flex items-center justify-center shrink-0">
                  <BoxIcon className="w-6 h-6 text-at-dark-gray dark:text-accent" />
                </div> */}
                <div className="flex-1">
                  <h1 className="text-lg font-semibold font-space-grotesk">{asset.name}</h1>
                  <p className="text-xs opacity-70 mt-1">{asset.assetCode}</p>
                  <p className="text-xs opacity-60 mt-1">{asset.description}</p>
                  <div className="flex items-center gap-x-1 mt-1">
                    <p className="text-xs opacity-60">Species:</p>
                    <p className="text-xs font-semibold">{asset.species}</p>
                  </div>
                </div>
              </div>
              
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
                <p className="text-xs opacity-60 mb-1">Asset Type</p>
                <p className="text-xs font-semibold capitalize">{unSlugify(asset.type)}</p>
              </div>
              <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
                <p className="text-xs opacity-60 mb-1">Ownership</p>
                <p className="text-xs font-semibold capitalize">{asset.ownershipStatus}</p>
              </div>
              <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
                <p className="text-xs opacity-60 mb-1">Breed</p>
                <p className="text-xs font-semibold">{asset?.crop?.species || asset?.animalGroup?.species || asset?.animal?.species || ''}</p>
              </div>
              <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
                <p className="text-xs opacity-60 mb-1">Breed</p>
                <p className="text-xs font-semibold">{asset?.crop?.breed || asset?.animalGroup?.breed || asset?.animal?.breed || ''}</p>
              </div>
            </div>
            

            {/* Created Info */}
            <div className="flex items-center justify-between gap-x-3">

              <div className="flex items-center gap-x-2 text-xs opacity-70">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Created on {new Date(asset.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="text-right">
                <span className={`inline-flex items-center px-2 py-1 rounded-lg ${assetColors.bg} ${assetColors.text} text-xs font-medium capitalize`}>
                  {unSlugify(asset.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Location Details */}
          {location && (
            <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
              <div className="mb-4">
                <p className="text-xs opacity-70">Current Location</p>
                <h3 className="text-md font-semibold font-space-grotesk mt-1">{asset?.currentLocation?.name}</h3>
                <p className="text-xs font-medium font-space-grotesk mt-1">{asset?.currentLocation?.lga}, {asset?.currentLocation?.state}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-x-3 p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
                  {/* <MapPinIcon className="w-5 h-5 mt-0.5 text-accent-dark dark:text-accent shrink-0" /> */}
                  <div>
                    <p className="text-xs opacity-70 mb-1">Address</p>
                    <p className="text-sm">{asset?.currentLocation?.addressDescription}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
                    <p className="text-xs opacity-60 mb-1">Land Size</p>
                    <p className="text-sm font-semibold">{asset?.currentLocation?.landSize} ha</p>
                  </div>
                  <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
                    <p className="text-xs opacity-60 mb-1">Soil Type</p>
                    <p className="text-sm font-semibold capitalize">{asset?.currentLocation?.soilType}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
                    <p className="text-xs opacity-60 mb-1">Water Source</p>
                    <p className="text-sm font-semibold capitalize">{unSlugify(asset?.currentLocation?.waterSourceType)}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <Link
                    to={`/producer/locations/location/${asset?.currentLocation?.id}`}
                    className="inline-flex items-center gap-x-1 px-3 py-2 rounded-lg bg-accent/15 text-accent-dark dark:text-accent text-sm font-medium hover:bg-accent/20 transition duration-200"
                  >
                    View Location Details
                    <ArrowIcon className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
            <div className="mb-4 flex items-end justify-between gap-x-3">
              <div>
                <p className="text-xs opacity-70">Operational Log</p>
                <h3 className="text-md font-semibold font-space-grotesk mt-1">Asset Events</h3>
              </div>
              <Link
                to="/producer/events"
                className="inline-flex items-center gap-x-1 px-2 py-1 rounded-lg bg-at-dark-gray/10 dark:bg-at-dark-surface text-xs font-medium hover:bg-at-dark-gray/20 dark:hover:bg-at-dark-gray/30 transition duration-200"
              >
                View All Events
                <ArrowIcon className="w-3 h-3" />
              </Link>
            </div>

            {eventsSelector?.events?.events?.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm opacity-60">No events have been recorded for this asset yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {eventsSelector?.events?.events?.map((event) => (
                  <AssetEventCard event={event} key={event.id} />
                ))}
              </div>
            )}

            <Link 
              to={`/producer/events/new-event?asset=${assetId}`}
              className="p-4 flex items-center justify-center border border-dashed dark:border-at-dark-gray rounded w-full mt-4 gap-1 text-sm "
            > 
              <PlusIcon className="w-4 h-4" /> 
              Record a new event for this asset
            </Link>
          </div>

          <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
            <div className="mb-4 flex items-end justify-between gap-x-3">
              <div>
                <p className="text-xs opacity-70">Products Log</p>
                <h3 className="text-md font-semibold font-space-grotesk mt-1">Products from this Asset</h3>
              </div>
              <Link
                to="/producer/products"
                className="inline-flex items-center gap-x-1 px-2 py-1 rounded-lg bg-at-dark-gray/10 dark:bg-at-dark-surface text-xs font-medium hover:bg-at-dark-gray/20 dark:hover:bg-at-dark-gray/30 transition duration-200"
              >
                View All Products
                <ArrowIcon className="w-3 h-3" />
              </Link>
            </div>

            {productsSelector?.products?.products?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {productsSelector?.products?.products?.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm opacity-60">No products have been created from this asset yet.</p>
              </div>
            )}

            <Link 
              to={`/producer/products/new-product?asset=${assetId}`}
              className="p-4 flex items-center justify-center border border-dashed dark:border-at-dark-gray rounded w-full mt-4 gap-1 text-sm "
            > 
              <PlusIcon className="w-4 h-4" /> 
              Create a new product from this asset
            </Link>
          </div>

          {/* Status History Timeline */}
          <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
            <div className="mb-6">
              <p className="text-xs opacity-70">Asset Journey</p>
              <h3 className="text-md font-semibold font-space-grotesk mt-1">Status History</h3>
            </div>

            {asset.statusHistory.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm opacity-60">No status history available yet.</p>
              </div>
            ) : (
              <div className="relative pl-4">
                {asset.statusHistory.map((item, index) => (
                  <StatusTimelineItem
                    key={index}
                    item={item}
                    isLast={index === asset.statusHistory.length - 1}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
            <div className="mb-4 flex items-center justify-between gap-x-3">
              <div>
                <p className="text-xs opacity-70">Traceability</p>
                <h3 className="text-md font-semibold font-space-grotesk mt-1">Asset QR Code</h3>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-60">Total Scans</p>
                <p className="text-lg font-semibold font-space-grotesk">{asset.qrScanCount || 0}</p>
              </div>
            </div>

            <div className="p-4 bg-at-dark-gray/5 dark:bg-at-dark-surface flex flex-col items-center">
              <img 
                src={asset?.assetQr?.qrCode} alt={`QR code for ${asset.name}`} 
                className="w-48 h-48 p-3 border border-gray-200/60 dark:border-gray-700/40 dark:invert" />
              <p className="text-xs opacity-65 mt-3 break-all text-center">{asset?.assetQr?.traceUrl}</p>
              <a
                href={asset?.assetQr?.qrCode}
                onClick={handleDownloadQr}
                className="mt-3 inline-flex items-center gap-x-1 px-3 py-2 rounded-lg bg-accent/15 text-accent-dark dark:text-accent text-sm font-medium hover:bg-accent/20 transition duration-200"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Download QR
              </a>
            </div>
          </div>

      

          {/* Additional Information */}
          <div>

            <div className="mt-4 p-3 rounded-lg bg-accent/5 dark:bg-accent/10 border border-accent/20">
              <p className="text-xs opacity-70">
                <span className="font-semibold">Note:</span> Asset information is automatically tracked and verified through the AgroTrace supply chain system.
              </p>
            </div>
          </div>

          {/* Back Navigation */}
          <div className="flex gap-x-3">
            <Link
              to="/producer/assets"
              className="flex-1 px-4 py-2 rounded-lg bg-at-dark-gray/10 dark:bg-at-dark-surface text-center text-sm font-medium hover:bg-at-dark-gray/20 dark:hover:bg-at-dark-gray/30 transition duration-200 flex items-center justify-center gap-x-1"
            >
                <ArrowIcon className="w-3 h-3 inline-block mr-1 -rotate-180" />
                Back to Assets
            </Link>
          </div>
        </div>
        :
        <ErrorState />
      }
    </>
  )
}

export default AssetDetails

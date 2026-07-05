import React, { useEffect, useState } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Link, Navigate, useParams } from 'react-router-dom'
import MapPinIcon from '../../../../components/elements/icons/MapPinIcon'
import CalendarIcon from '../../../../components/elements/icons/CalendarIcon'
import BoxIcon from '../../../../components/elements/icons/BoxIcon'
import ArrowIcon from '../../../../components/elements/icons/ArrowIcon'
import { locationAssets, locationEvents } from './locationMockData'
import { authHeader, baseUrl, unSlugify } from '../../../../utils/utils'
import { useDispatch, useSelector } from 'react-redux';
import { ERROR, GET_ASSETS } from '../../../../store/types';
import axios from 'axios';
import Loader from '../../../../components/elements/Loader';
import ErrorState from '../../../../components/elements/ErrorState';
import { fetchAssets } from '../../../../store/actions/assetsActions';
import EmptyState from '../../../../components/elements/EmptyState';

const fallbackAssets = [
  { id: 'asset-001', name: 'Demonstration Crop Plot', type: 'crop', quantity: '2.0 ha', status: 'active' },
  { id: 'asset-002', name: 'Water Tank Unit', type: 'equipment', quantity: '1 unit', status: 'growing' },
]

const fallbackEvents = [
  {
    id: 'evt-901',
    title: 'Seasonal Field Assessment',
    date: '2026-06-30',
    type: 'inspection',
    status: 'upcoming',
    note: 'Run baseline checks for weeds, moisture, and disease pressure.',
  },
]

const AssetCard = ({ asset }) => {
  const assetColors = statusColorMap[asset.status] || statusColorMap.active

  return (
    <Link
      className="w-full p-4 rounded-xl border border-transparent bg-white dark:bg-at-dark-gray/5 hover:border-gray-200 dark:hover:border-gray-700/40 shadow-xl shadow-black/5 transition duration-200 block"
      to={`/producer/assets/asset/${asset.id}`}
    >
      <div className="flex items-start justify-between gap-x-3">
        <div className="flex items-center gap-x-2">
          <div className="w-8 h-8 rounded-lg bg-at-dark-gray/10 dark:bg-accent/15 flex items-center justify-center shrink-0">
            <BoxIcon className="w-4 h-4 text-at-dark-gray dark:text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold font-space-grotesk">{asset.name}</p>
            <p className="text-xs opacity-75 capitalize">{asset.type}</p>
          </div>
        </div>
        <span className={`text-[10px] px-2 py-1 rounded-full ${assetColors.bg} ${assetColors.text} capitalize`}>
          {unSlugify(asset.status)}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs opacity-80">
        <span>{asset.quantity}</span>
        <span className="inline-flex items-center gap-x-1">
          Open Asset
          <ArrowIcon className="w-3 h-3" />
        </span>
      </div>
    </Link>
  )
}

const EventCard = ({ event }) => {
  return (
    <div className="w-full p-4 rounded-xl bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5 border border-transparent">
      <div className="flex items-start justify-between gap-x-3">
        <div>
          <p className="text-sm font-semibold font-space-grotesk">{event.title}</p>
          <p className="text-xs opacity-75 mt-0.5 capitalize">{event.type}</p>
        </div>
        <span className="text-[10px] px-2 py-1 rounded-full bg-at-dark-gray/10 dark:bg-at-dark-surface capitalize">
          {event.status}
        </span>
      </div>
      <p className="text-xs opacity-80 mt-2">{event.note}</p>
      <div className="mt-2 text-[11px] opacity-70 flex items-center gap-x-1">
        <CalendarIcon className="w-3.5 h-3.5" />
        <span>{new Date(event.date).toLocaleDateString()}</span>
      </div>
    </div>
  )
}

const LocationDetails = () => {
  const { locationId } = useParams()
  const dispatch = useDispatch()
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(true)

  const assetsSelector = useSelector((state) => state.assets)
  
  useEffect(() => {
    window.scrollTo(0, 0)

    const fetchLocation = async () => {
      try {
        dispatch({
          type: GET_ASSETS,
          payload: []
        })
        const headers = authHeader()

        const response = await axios.get(`${baseUrl}/locations/${locationId}`, { headers })
        setLocation(response.data.data)
        dispatch(fetchAssets(`location=${response.data.data._id}`, 1, 25))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching location details:', error)
        dispatch({
          type: ERROR,
          error
        })
      }
    }

    fetchLocation()

    return () => {
     
    }

  }, [locationId])


  // if (!location) {
  //   return <Navigate to="/producer/locations" replace />
  // }

  const assets = locationAssets[location?.id] || fallbackAssets
  const events = locationEvents[location?.id] || fallbackEvents

  return (
    <>
    {loading ? (
      <Loader />
    ) : (

      !location ? (
        <ErrorState errorStateTitle="Error fetching location" errorStateText="Sorry, we couldn't fetch the location details. Please try again later." />
      ) : (
      <div className="w-full space-y-4">
        <div className="">
          <div className="flex items-start justify-between gap-x-2 mb-3">
            <div>
              <p className="text-xs opacity-70">Location Details</p>
              <h2 className="text-lg font-semibold font-space-grotesk">{location.name}</h2>
              <p className="text-sm font-medium">{location.lga}, {location.state}</p>
            </div>
            <span className="px-2.5 py-1 mt-3 rounded-full text-xs bg-accent/15 text-at-dark-gray dark:text-accent font-medium">
              {location.landSize} ha
            </span>
          </div>

          <div className="mb-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface text-xs opacity-85 flex items-start gap-x-2">
            <MapPinIcon className="w-4 h-4 mt-0.5" />
            <span>{location.addressDescription}</span>
          </div>

          <div className="w-full h-[48vh] min-h-80 rounded-xl overflow-hidden border border-gray-200/60 dark:border-gray-700/40">
            <MapContainer center={[location.latitude, location.longitude]} zoom={12} scrollWheelZoom={false} className="w-full h-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <CircleMarker
                center={[location.latitude, location.longitude]}
                fillColor="#02bc75"
                fillOpacity={0.95}
                radius={10}
                stroke={false}
              >
                <Popup>
                  <div className="min-w-52">
                    <p className="font-semibold">{location.lga}, {location.state}</p>
                    <p className="text-xs mt-1">{location.addressDescription}</p>
                    <p className="text-xs mt-1">
                      {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            </MapContainer>
          </div>
        </div>

        <div className="">
          <div className="mb-3">
            <p className="text-xs opacity-70">Assets In This Location</p>
            <h3 className="text-lg font-semibold font-space-grotesk">Location Assets</h3>
          </div>

          {assetsSelector.loading ? (
            <Loader />
          ) : assetsSelector.assetsError ? (
            <ErrorState errorStateTitle="Error fetching assets" errorStateText="Sorry, we couldn't fetch the assets for this location. Please try again later." />
          ) : assetsSelector.assets?.assets?.length === 0 ? (
            <EmptyState emptyStateTitle="No assets found" emptyStateText="There are no assets associated with this location." />
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {assetsSelector.assets?.assets?.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>)}
        </div>

        <div className="">
          <div className="mb-3">
            <p className="text-xs opacity-70">Activity In This Location</p>
            <h3 className="text-lg font-semibold font-space-grotesk">Location Events</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {events.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
        </div>
      </div>)
    )}
    </>
  )
}

export default LocationDetails
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CalendarIcon from '../../../../components/elements/icons/CalendarIcon'
import MapPinIcon from '../../../../components/elements/icons/MapPinIcon'
import BoxIcon from '../../../../components/elements/icons/BoxIcon'
import ArrowIcon from '../../../../components/elements/icons/ArrowIcon'
import { placeholderAssets, placeholderLocations } from '../assets/assetMockData'
import { eventCategoryColorMap, eventTypeCategoryColorMap } from './event.const'
import { unSlugify } from '../../../../utils/utils'
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../../../store/actions/eventsActions';
import Loader from '../../../../components/elements/Loader';

const EventCard = ({ event }) => {
  const categoryColors = eventCategoryColorMap[event.eventCategory] || eventCategoryColorMap.production
  const typeCategoryColors = eventTypeCategoryColorMap[event.eventTypeCategory] || eventTypeCategoryColorMap.inspection

  return (
    <Link
      className="block rounded-xl border border-transparent bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5 p-4 transition duration-200 hover:border-gray-200 dark:hover:border-gray-700/40"
      to={`/producer/events/event/${event.id}`}
    >
      <div className="flex items-start justify-between gap-x-3">
        <div>
          <p className="text-sm font-semibold font-space-grotesk">{event?.description || ''}</p>
          <p className="text-xs opacity-70 mt-1 capitalize">{unSlugify(event.eventType)}</p>
        </div>
        <ArrowIcon className="w-4 h-4 mt-0.5 opacity-60 shrink-0" />
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className={`text-[10px] px-2 py-1 rounded-full ${categoryColors.bg} ${categoryColors.text} capitalize`}>
          {unSlugify(event.eventCategory)}
        </span>
        <span className={`text-[10px] px-2 py-1 rounded-full ${typeCategoryColors.bg} ${typeCategoryColors.text} capitalize`}>
          {unSlugify(event.eventTypeCategory)}
        </span>
        {event.recordedOffline && (
          <span className="text-[10px] px-2 py-1 rounded-full bg-at-dark-gray/10 dark:bg-at-dark-surface">
            Offline Record
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-4 text-xs opacity-75">
        <div className="flex items-center gap-x-2">
          <BoxIcon className="w-3.5 h-3.5 shrink-0" />
          <span>{event?.asset?.name || 'Unknown Asset'}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <MapPinIcon className="w-3.5 h-3.5 shrink-0" />
          <span>{event.location ? `${event?.location?.name}` : 'Unknown Location'}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <CalendarIcon className="w-3.5 h-3.5 shrink-0" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  )
}

const Events = () => {
  const eventsSelector = useSelector((state) => state.events)
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [filters, setFilters] = useState('')

  useEffect(() => {
      dispatch(fetchEvents(filters, page, perPage))
  
    return () => {
      
    }
  }, [page, perPage, filters])
  

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between gap-x-2 mb-3">
        <div>
          <p className="text-xs opacity-70">Producer Event Register</p>
          <h1 className="font-semibold font-space-grotesk mt-1">Events</h1>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs bg-accent/15 text-at-dark-gray dark:text-accent font-medium">
          {eventsSelector?.events?.total} Events
        </span>
      </div> 
      {/* <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
        <p className="text-sm opacity-75 mt-2 max-w-2xl">
          Review production, health, movement, processing, quality, and export actions recorded against your assets.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Total Events</p>
            <p className="text-lg font-semibold font-space-grotesk">{events.length}</p>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Offline Records</p>
            <p className="text-lg font-semibold font-space-grotesk">{offlineEvents}</p>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">With Next Due Date</p>
            <p className="text-lg font-semibold font-space-grotesk">{dueSoonEvents}</p>
          </div>
        </div>
      </div> */}

      {eventsSelector?.loadingEvents ? (
        <div className="py-10">
          <Loader />
        </div>
      ) 
      
      : 

        <div className="">
          {/* <div className="mb-4">
            <p className="text-xs opacity-70">Chronological Feed</p>
            <h2 className="text-lg font-semibold font-space-grotesk mt-1">Recorded Events</h2>
          </div> */}

          {eventsSelector?.events?.events?.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm opacity-60">No events have been recorded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {eventsSelector?.events?.events?.map((event) => (
                <EventCard event={event} key={event.id} />
              ))}
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default Events
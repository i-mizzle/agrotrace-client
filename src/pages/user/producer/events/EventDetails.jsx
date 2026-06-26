import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import CalendarIcon from '../../../../components/elements/icons/CalendarIcon'
import MapPinIcon from '../../../../components/elements/icons/MapPinIcon'
import BoxIcon from '../../../../components/elements/icons/BoxIcon'
import ArrowIcon from '../../../../components/elements/icons/ArrowIcon'
import ArrowDownTrayIcon from '../../../../components/elements/icons/ArrowDownTrayIcon'
import UserIcon from '../../../../components/elements/icons/UserIcon'
import ClipboardIcon from '../../../../components/elements/icons/ClipboardIcon'
import { placeholderAssets, placeholderLocations } from '../assets/assetMockData'
import { eventCategoryColorMap, eventTypeCategoryColorMap, getEventById } from './eventMockData'
import { unSlugify } from '../../../../utils/utils'

const EventDetails = () => {
  const { eventId } = useParams()
  const event = getEventById(eventId)

  if (!event) {
    return <Navigate replace to="/producer/events" />
  }

  const asset = placeholderAssets.find((item) => item.id === event.asset)
  const location = placeholderLocations[event.location]
  const categoryColors = eventCategoryColorMap[event.eventCategory] || eventCategoryColorMap.production
  const typeCategoryColors = eventTypeCategoryColorMap[event.eventTypeCategory] || eventTypeCategoryColorMap.inspection

  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
        <div className="mb-4">
          <div>
            <p className="text-xs opacity-70">Event Details</p>
            <h1 className="text-lg font-semibold font-space-grotesk mt-1">{event.title}</h1>
            <p className="text-xs opacity-70 mt-1">{unSlugify(event.eventType)}</p>
          </div>
          <div className="flex flex-wrap items-center mt-4 gap-2">
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
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Date</p>
            <div className="flex items-center gap-x-2 text-sm font-semibold">
              <CalendarIcon className="w-4 h-4" />
              <span>{new Date(event.date).toLocaleString()}</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Performed By</p>
            <div className="flex items-center gap-x-2 text-sm font-semibold">
              <UserIcon className="w-4 h-4" />
              <span>{event.performedByName}</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Asset</p>
            <div className="flex items-center gap-x-2 text-sm font-semibold">
              <BoxIcon className="w-4 h-4" />
              <span>{asset?.name || 'Unknown Asset'}</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Location</p>
            <div className="flex items-center gap-x-2 text-sm font-semibold">
              <MapPinIcon className="w-4 h-4" />
              <span>{location ? `${location.lga}, ${location.state}` : 'Unknown Location'}</span>
            </div>
          </div>
        </div> */}
      </div>

      <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Performed By</p>
            <p className="text-sm font-semibold">{event.createdByName}</p>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Quantity Affected</p>
            <p className="text-sm font-semibold">{event.quantityAffected ?? 'N/A'}</p>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Weight Affected</p>
            <p className="text-sm font-semibold">{event.weightAffected ? `${event.weightAffected} kg` : 'N/A'}</p>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Cost Estimate</p>
            <p className="text-sm font-semibold">{event.costEstimate ? `NGN ${event.costEstimate.toLocaleString()}` : 'N/A'}</p>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Mortality Count</p>
            <p className="text-sm font-semibold">{event.mortalityCount ?? 'N/A'}</p>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Event Date</p>
            <p className="text-sm font-semibold">{new Date(event.date).toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface">
            <p className="text-xs opacity-60 mb-1">Next Due Date</p>
            <p className="text-sm font-semibold">{event.nextDueDate ? new Date(event.nextDueDate).toLocaleDateString() : 'N/A'}</p>
          </div>
          
          
        </div>
      </div>

      <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
        <div className="mb-2">
          <p className="text-xs opacity-70">Notes</p>
          <h2 className="font-semibold font-space-grotesk mt-1">Event Notes</h2>
        </div>

        {event.notes.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm opacity-60">No notes were recorded for this event.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {event.notes.map((noteItem, index) => (
              <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface" key={`${event.id}-note-${index}`}>
                <div className="flex items-start gap-x-2">
                  <ClipboardIcon className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm">{noteItem.note}</p>
                    <p className="text-xs opacity-60 mt-2">Added by {noteItem.createdByName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl p-4 bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
        <div className="mb-4">
          <p className="text-xs opacity-70">Attachments</p>
          <h2 className="font-semibold font-space-grotesk mt-1">Supporting Files</h2>
        </div>

        {event.attachments.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm opacity-60">No attachments were added to this event.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {event.attachments.map((attachment) => (
              <div className="p-3 rounded-lg bg-at-dark-gray/5 dark:bg-at-dark-surface flex items-center justify-between gap-x-3" key={attachment}>
                <p className="text-sm font-medium break-all">{attachment}</p>
                <a
                  className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/80 dark:bg-at-dark-gray/10 hover:bg-white dark:hover:bg-at-dark-gray/60 transition duration-200"
                  download
                  href={attachment}
                  aria-label={`Download ${attachment}`}
                  title={`Download ${attachment}`}
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-x-3">
        <Link
          to="/producer/events"
          className="flex-1 px-4 py-2 rounded-lg bg-at-dark-gray/10 dark:bg-at-dark-surface text-center text-sm font-medium hover:bg-at-dark-gray/20 dark:hover:bg-at-dark-gray/30 transition duration-200 flex items-center justify-center gap-x-1"
        >
          <ArrowIcon className="w-3 h-3 inline-block mr-1 -rotate-180" />
          Back to Events
        </Link>
        {asset && (
          <Link
            to={`/producer/assets/asset/${asset.id}`}
            className="flex-1 px-4 py-2 rounded-lg bg-accent/15 text-center text-sm font-medium text-accent-dark dark:text-accent hover:bg-accent/20 transition duration-200 flex items-center justify-center gap-x-1"
          >
            View Asset
            <ArrowIcon className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  )
}

export default EventDetails
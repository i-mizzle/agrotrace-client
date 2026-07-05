import React, { useMemo, useState, useEffect } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Link } from 'react-router-dom'
import MapPinIcon from '../../../../components/elements/icons/MapPinIcon'
import CalendarIcon from '../../../../components/elements/icons/CalendarIcon'
import ArrowIcon from '../../../../components/elements/icons/ArrowIcon'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../../../store/actions/locationsActions';
import Loader from '../../../../components/elements/Loader';
import EmptyState from '../../../../components/elements/EmptyState';

const LocationCard = ({ location, isHighlighted = false, onSelect }) => {
  return (
    <div
      className={`w-full text-left p-4 rounded-xl border transition duration-200 shadow-xl shadow-black/5 ${
        isHighlighted
          ? 'border-accent-dark dark:border-accent bg-accent/5 dark:bg-accent/10'
          : 'border-transparent bg-white dark:bg-at-dark-gray/5 hover:border-gray-200 dark:hover:border-gray-700/40'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between gap-x-3 relative">
        <div className="flex items-start gap-x-2">
          <div className="w-8 h-8 rounded-lg bg-at-dark-gray/10 dark:bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
            <MapPinIcon className="w-5 h-5 text-at-dark-gray dark:text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold font-space-grotesk">{location.name}</p>
            <p className="text-xs font-medium">{location.lga}, {location.state}</p>
            <p className="text-xs opacity-75 mt-0.5">{location.addressDescription}</p>
          </div>
        </div>
        <span className="text-[10px] absolute top-0 right-0 px-2 py-1 rounded-full bg-at-dark-gray/10 dark:bg-at-dark-surface">
          {location.landSize} ha
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-x-2 text-xs opacity-80">
        <span className="capitalize">Soil: {location.soilType}</span>
        <span className="capitalize">Water: {location.waterSourceType.replace('-', ' ')}</span>
      </div>

      <div className="mt-2 text-[11px] opacity-70 flex items-center gap-x-1">
        <CalendarIcon className="w-3.5 h-3.5" />
        <span>Added {new Date(location.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="mt-3 flex justify-end">
        <Link
          className="text-xs px-3 py-2 rounded-lg bg-at-dark-gray/10 dark:bg-at-dark-surface inline-flex items-center gap-x-1 hover:bg-at-dark-gray/20 dark:hover:bg-at-dark-gray/20 transition duration-200"
          onClick={(event) => event.stopPropagation()}
          to={`/producer/locations/location/${location.id}`}
        >
          View Details
          <ArrowIcon className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}

const Locations = () => {
  const [activeLocationId, setActiveLocationId] = useState(null)

  const locationsSelector = useSelector((state) => state.locations);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState('');
  const locations = locationsSelector?.locations?.locations || []

  const locationsWithCoordinates = useMemo(
    () => locations.filter((location) => Number.isFinite(Number(location.latitude)) && Number.isFinite(Number(location.longitude))),
    [locations],
  )

  useEffect(() => {
    dispatch(fetchLocations(filters, page, perPage));
  }, [dispatch, filters, page, perPage]);

  useEffect(() => {
    if (!locations.length) {
      setActiveLocationId(null)
      return
    }

    const activeExists = locations.some((location) => location.id === activeLocationId)
    if (!activeExists) {
      setActiveLocationId(locations[0].id)
    }
  }, [activeLocationId, locations]);

  const activeLocation = useMemo(
    () => locations.find((location) => location.id === activeLocationId) || locations[0],
    [activeLocationId, locations],
  )

  const mapCenter = useMemo(() => {
    if (!locationsWithCoordinates.length) {
      return [9.082, 8.6753]
    }

    const sum = locationsWithCoordinates.reduce(
      (acc, location) => {
        return {
          lat: acc.lat + Number(location.latitude),
          lng: acc.lng + Number(location.longitude),
        }
      },
      { lat: 0, lng: 0 },
    )

    return [sum.lat / locationsWithCoordinates.length, sum.lng / locationsWithCoordinates.length]
  }, [locationsWithCoordinates])

  const FitBounds = ({ points }) => {
    const map = useMap();

    useEffect(() => {
      if (!map || !points || !points.length) return;

      const latlngs = points.map(p => [Number(p.latitude), Number(p.longitude)]);

      if (latlngs.length === 1) {
        map.setView(latlngs[0], 12);
        return;
      }

      try {
        map.fitBounds(latlngs, { padding: [50, 50] });
      } catch (e) {
        // ignore
      }
    }, [map, points]);

    return null;
  }

  return (
    <div className="w-full space-y-4">
      <div className="">
        <div className="flex items-center justify-between gap-x-2 mb-3">
          <div>
            <p className="text-xs opacity-70">Your Location Coverage</p>
            <h2 className="text-lg font-semibold font-space-grotesk">Locations Overview</h2>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs bg-accent/15 text-at-dark-gray dark:text-accent font-medium">
            {locationsSelector.locations.total} Locations
          </span>
        </div>

        {!locationsSelector.loadingLocations && locations.length > 0 && locationsWithCoordinates.length > 0 && <div className="w-full h-[48vh] min-h-80 rounded-xl overflow-hidden border border-gray-200/60 dark:border-gray-700/40">
          <MapContainer center={mapCenter} zoom={9} scrollWheelZoom={false} className="w-full h-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitBounds points={locationsWithCoordinates} />

            {locationsWithCoordinates.map((location) => {
              const isActive = location?.id === activeLocation?.id
              return (
                <CircleMarker
                  center={[Number(location.latitude), Number(location.longitude)]}
                  eventHandlers={{
                    click: () => setActiveLocationId(location.id),
                  }}
                  fillColor={isActive ? '#02bc75' : '#476a6f'}
                  fillOpacity={0.9}
                  key={location.id}
                  radius={isActive ? 10 : 7}
                  stroke={false}
                >
                  <Popup>
                    <div className="min-w-52">
                      <p className="font-semibold">{location.lga}, {location.state}</p>
                      <p className="text-xs mt-1">{location.addressDescription}</p>
                      <p className="text-xs mt-1">
                        {Number(location.latitude).toFixed(4)}, {Number(location.longitude).toFixed(4)}
                      </p>
                    </div>
                  </Popup>
                </CircleMarker>
              )
            })}
          </MapContainer>
        </div>}
      </div>

      {locationsSelector.loadingLocations 
      ? 
        <Loader />
      :
      locations.length < 1 
        ?
        <EmptyState emptyStateTitle="No Locations" emptyStateText="You currently have no locations available." /> 
        :
        <div className="">
          {/* <div className="mb-3">
            <p className="text-xs opacity-70">Placeholder Dataset</p>
            <h3 className="text-lg font-semibold font-space-grotesk">Locations</h3>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {locations.map((location) => (
              <LocationCard
                isHighlighted={location.id === activeLocation?.id}
                key={location.id}
                location={location}
                onSelect={() => setActiveLocationId(location.id)}
              />
            ))}
          </div>
        </div>}
    </div>
  )
}

export default Locations
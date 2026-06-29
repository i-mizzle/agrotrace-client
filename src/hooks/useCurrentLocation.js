import { useCallback, useMemo, useState } from 'react'

const GEOLOCATION_ERRORS = {
  1: 'Location permission denied. Please allow location access and try again.',
  2: 'Unable to determine your location right now. Please try again.',
  3: 'Location request timed out. Please try again.',
}

const DEFAULT_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
}

const useCurrentLocation = (customOptions) => {
  const [coordinates, setCoordinates] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const options = useMemo(() => ({ ...DEFAULT_OPTIONS, ...(customOptions || {}) }), [customOptions])

  const isSupported = typeof window !== 'undefined' && 'geolocation' in navigator

  const getCurrentLocation = useCallback(() => {
    if (!isSupported) {
      setError('Geolocation is not supported on this device or browser.')
      return Promise.resolve(null)
    }

    setIsLoading(true)
    setError('')

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const nextCoordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          }

          setCoordinates(nextCoordinates)
          setIsLoading(false)
          resolve(nextCoordinates)
        },
        (positionError) => {
          const fallbackMessage = 'Unable to fetch your current location. Please try again.'
          setError(GEOLOCATION_ERRORS[positionError.code] || fallbackMessage)
          setIsLoading(false)
          resolve(null)
        },
        options,
      )
    })
  }, [isSupported, options])

  const clearLocation = useCallback(() => {
    setCoordinates(null)
    setError('')
  }, [])

  return {
    coordinates,
    error,
    isLoading,
    isSupported,
    getCurrentLocation,
    clearLocation,
  }
}

export default useCurrentLocation

import React, { useEffect, useMemo, useState } from 'react'
import RadioGroup from '../../../../components/elements/form/RadioGroup'
import AutocompleteSelect from '../../../../components/elements/form/AutocompleteSelect'
import TextareaField from '../../../../components/elements/form/TextareaField'
import NumberField from '../../../../components/elements/form/NumberField'
import TextField from '../../../../components/elements/form/TextField'
import FormButton from '../../../../components/elements/form/FormButton'
import { StatesLgas } from '../../../../assets/static/stateslgas'
import useCurrentLocation from '../../../../hooks/useCurrentLocation'
import { locationTypeOptions, soilTypeOptions, waterSourceOptions } from './location.const'
import { useDispatch, useSelector } from 'react-redux';
import { ERROR } from '../../../../store/types';
import { clearCreatedLocation, createLocation } from '../../../../store/actions/locationsActions';
import { useNavigate } from 'react-router-dom';


const NewLocation = () => {
  const {
    coordinates,
    error: locationError,
    isLoading,
    isSupported,
    getCurrentLocation,
    clearLocation,
  } = useCurrentLocation()

  const [isAtLocation, setIsAtLocation] = useState('yes')
  const [validationErrors, setValidationErrors] = useState({})

  const dispatch = useDispatch()
  const locationsSelector = useSelector((state) => state.locations)
  const navigate = useNavigate()
  useEffect(() => {
    
    if(locationsSelector.createdLocation) {
      dispatch(clearCreatedLocation())
      navigate('/producer/locations')
    }
    return () => {
      
    }
  }, [locationsSelector.createdLocation])
  

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    latitude: null,
    longitude: null,
    state: '',
    lga: '',
    addressDescription: '',
    landSize: null,
    waterSourceType: '',
    soilType: '',
  })

  const locationOptions = [
    {
      label: 'Yes, I am at this location now',
      value: 'yes',
      description: 'We will request your device location and auto-fill latitude and longitude.',
    },
    {
      label: 'No, I am not currently there',
      value: 'no',
      description: 'Provide a clear address. Latitude and longitude can be geocoded for you.',
    },
  ]

  const stateOptions = useMemo(
    () => StatesLgas.map((stateItem) => ({ label: stateItem.state, value: stateItem.state })),
    [],
  )

  const lgaOptions = useMemo(() => {
    const selectedState = StatesLgas.find((stateItem) => stateItem.state === formData.state)
    console.log('in the lga options useMemo, selectedState:', selectedState)
    if (!selectedState) {
      return []
    }

    return selectedState.lgas.map((lga) => ({ label: lga, value: lga }))
  }, [formData.state])

  useEffect(() => {
    if (!coordinates) {
      return
    }

    setFormData((prev) => ({
      ...prev,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    }))
  }, [coordinates])

  useEffect(() => {
    getCurrentLocation()
  }, [getCurrentLocation])

  const setField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setValidationErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleLocationChoice = async (selectedOption) => {
    const nextChoice = selectedOption.value
    setIsAtLocation(nextChoice)
    setValidationErrors((prev) => ({ ...prev, latitude: '', longitude: '' }))

    if (nextChoice === 'yes') {
      const position = await getCurrentLocation()
      if (!position) {
        setFormData((prev) => ({ ...prev, latitude: null, longitude: null }))
      }
      return
    }

    clearLocation()
    setFormData((prev) => ({
      ...prev,
      latitude: null,
      longitude: null,
    }))
  }

  const validate = () => {
    const errors = {}

    if (!formData.name || formData.name.trim() === '') {
      errors.name = 'Name is required'
    }

    if (!formData.type) {
      errors.type = 'Type is required'
    }

    if (!formData.state) {
      errors.state = 'State is required'
    }

    if (!formData.lga) {
      errors.lga = 'LGA is required'
    }

    if (!formData.addressDescription || formData.addressDescription.trim() === '') {
      errors.addressDescription = 'Address description is required'
    }

    if (isAtLocation === 'yes') {
      if (formData.latitude === null || Number.isNaN(formData.latitude)) {
        errors.latitude = 'Latitude required when you are at this location'
      }

      if (formData.longitude === null || Number.isNaN(formData.longitude)) {
        errors.longitude = 'Longitude required when you are at this location'
      }
    }

    if (formData.landSize === null || Number.isNaN(formData.landSize)) {
      errors.landSize = 'Land size is required'
    } else if (formData.landSize <= 0) {
      errors.landSize = 'Land size must be greater than zero'
    }   

    if (!formData.waterSourceType) {
      errors.waterSourceType = 'Water source type is required'
    }

    if (!formData.soilType) {
      errors.soilType = 'Soil type is required'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const submitLocation = async () => {
    if (!validate()) {
      dispatch({ 
        type: ERROR,
        error: {response: {data: {message: 'Please fix the errors in the form before submitting.'}}}
      })
      return
    }


    const payload = {
      name: formData.name.trim(),
      type: formData.type,
      latitude: isAtLocation === 'yes' ? formData.latitude : undefined,
      longitude: isAtLocation === 'yes' ? formData.longitude : undefined,
      state: formData.state,
      lga: formData.lga,
      addressDescription: formData.addressDescription.trim(),
      landSize: formData.landSize,
      waterSourceType: formData.waterSourceType || undefined,
      soilType: formData.soilType || undefined,
    }

    dispatch(createLocation(payload))
  }

  const hasCoordinates = formData.latitude !== null && formData.longitude !== null

  return (
    <div className="w-full max-w-3xl">
      <div className="">
        <p className="text-xs opacity-70">Location Registration</p>
        <h2 className="text-lg font-semibold font-space-grotesk mt-1">Add New Location</h2>

        <div className="mt-5">
          <RadioGroup
            hasError={validationErrors.locationMode}
            inline={false}
            inputLabel="Are you currently at this location?"
            items={locationOptions}
            preSelectedIndex={0}
            requiredField={true}
            returnSelected={handleLocationChoice}
          />

          {locationError && (
            <div className="mt-2 rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2 border border-red-200">
              {locationError}
            </div>
          )}

          {!isSupported && isAtLocation === 'yes' && (
            <div className="mt-2 rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2 border border-red-200">
              Geolocation is not supported on this device or browser.
            </div>
          )}

          {isAtLocation === 'yes' && (
            <div className="mt-2 text-xs opacity-80">
              {isLoading ? 'Fetching your current coordinates...' : hasCoordinates ? 'Coordinates captured from your device.' : 'Waiting for device coordinates.'}
            </div>
          )}

          {isAtLocation === 'yes' && !hasCoordinates && (
            <div className="mt-3 max-w-56">
              <FormButton
                buttonAction={getCurrentLocation}
                buttonLabel="Fetch Location Again"
                disabled={!isSupported}
                processing={isLoading}
              />
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            fieldId="name"
            hasError={validationErrors.name}
            inputLabel="Name"
            inputPlaceholder="Enter location name"
            preloadValue={formData.name}
            requiredField={true}
            returnFieldValue={(value) => setField('name', value)}
          />

          <AutocompleteSelect
            hasError={validationErrors.type}
            inputLabel="Type"
            preSelected={formData.type}
            preSelectedLabel="value"
            requiredField={true}
            returnFieldValue={(value) => setField('type', value.value)}
            selectOptions={locationTypeOptions}
            titleField="label"
            placeholderText="Select location type"
          />

          {isAtLocation === 'yes' && <>
            <TextField
              disabled={true}
              fieldId="latitude"
              hasError={validationErrors.latitude}
              inputLabel="Latitude"
              inputPlaceholder="Auto-filled when location is fetched"
              key={`lat-${formData.latitude ?? 'empty'}`}
              preloadValue={formData.latitude !== null ? String(formData.latitude) : ''}
              requiredField={isAtLocation === 'yes'}
              returnFieldValue={() => {}}
            />

            <TextField
              disabled={true}
              fieldId="longitude"
              hasError={validationErrors.longitude}
              inputLabel="Longitude"
              inputPlaceholder="Auto-filled when location is fetched"
              key={`lng-${formData.longitude ?? 'empty'}`}
              preloadValue={formData.longitude !== null ? String(formData.longitude) : ''}
              requiredField={isAtLocation === 'yes'}
              returnFieldValue={() => {}}
            />
          </>}

          <AutocompleteSelect
            hasError={validationErrors.state}
            inputLabel="State"
            preSelected={formData.state}
            preSelectedLabel="value"
            requiredField={true}
            returnFieldValue={(value) => {
              console.log('Selected state:', value)
              setField('state', value.value)
              setField('lga', '')
            }}
            selectOptions={stateOptions}
            titleField="label"
            placeholderText="Select state"
          />

          <AutocompleteSelect
            disabled={!formData.state}
            hasError={validationErrors.lga}
            inputLabel="LGA"
            preSelected={formData.lga}
            preSelectedLabel="value"
            requiredField={true}
            returnFieldValue={(value) => setField('lga', value.value)}
            selectOptions={lgaOptions}
            titleField="label"
            placeholderText={formData.state ? 'Select LGA' : 'Select state first'}
          />

          <NumberField
            fieldId="landSize"
            hasError={validationErrors.landSize}
            inputLabel="Land Size (hectares)"
            preloadValue={formData.landSize || ''}
            returnFieldValue={(value) => setField('landSize', value)}
            inputPlaceholder="Enter land size in hectares"
            requiredField={true}
          />

          <AutocompleteSelect
            hasError={validationErrors.waterSourceType}
            inputLabel="Water Source Type"
            preSelected={formData.waterSourceType}
            preSelectedLabel="value"
            returnFieldValue={(value) => setField('waterSourceType', value.value)}
            selectOptions={waterSourceOptions}
            titleField="label"
            placeholderText="Select water source type"
            requiredField
          />

          <AutocompleteSelect
            hasError={validationErrors.soilType}
            inputLabel="Soil Type"
            preSelected={formData.soilType}
            preSelectedLabel="value"
            returnFieldValue={(value) => setField('soilType', value.value)}
            selectOptions={soilTypeOptions}
            titleField="label"
            placeholderText="Select soil type"
            requiredField
          />
        </div>

        <div className="mt-4">
          <TextareaField
            fieldId="addressDescription"
            hasError={validationErrors.addressDescription}
            inputLabel={isAtLocation === 'yes' ? 'Address Description' : 'Address Description'}
            inputPlaceholder="Describe the location clearly (landmarks, community, route notes)."
            preloadValue={formData.addressDescription}
            requiredField={true}
            returnFieldValue={(value) => setField('addressDescription', value)}
          />
        </div>

        <div className="mt-5 w-full">
          <FormButton
            buttonAction={submitLocation}
            buttonLabel="Save Location"
            processing={locationsSelector.creatingLocation}
          />
        </div>

      </div>
    </div>
  )
}

export default NewLocation
import React, { useEffect, useState } from 'react'
import RadioGroup from '../../../../components/elements/form/RadioGroup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../../../store/actions/locationsActions';
import { clearCreatedAsset, createAsset } from '../../../../store/actions/assetsActions';
import AutocompleteSelect from '../../../../components/elements/form/AutocompleteSelect';
import InlinePreloader from '../../../../components/elements/InlinePreloader';
import TextField from '../../../../components/elements/form/TextField';
import DateField from '../../../../components/elements/form/DateField';
import NumberField from '../../../../components/elements/form/NumberField';
import FormButton from '../../../../components/elements/form/FormButton';
import TextFieldTagCloud from '../../../../components/elements/form/TextFieldTagCloud';
import { Link, useNavigate } from 'react-router-dom';

const NewAsset = () => {
  const [assetPayload, setAssetPayload] = useState({ })
  const [animal, setAnimal] = useState(undefined)
  const [crop, setCrop] = useState(undefined)
  const [animalGroup, setAnimalGroup] = useState(undefined)
  const [validationErrors, setValidationErrors] = useState({})

  const assetTypeOptions = [
    { label: 'Crop', value: 'crop' },
    { label: 'Animal', value: 'animal' },
    { label: 'Animal Group', value: 'animal-group' },
  ]

  const animalGroupTypeOptions = [
    { label: 'Poultry', value: 'poultry' }, 
    { label: 'Fish', value: 'fish' }, 
    { label: 'Goats', value: 'goats' }, 
    { label: 'Cattle', value: 'cattle' }, 
    { label: 'Others', value: 'others' }
  ]

  const dispatch = useDispatch();
  const locationsSelector = useSelector((state) => state.locations);
  const assetsSelector = useSelector((state) => state.assets);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLocations('', 0, 0));
    if(assetsSelector.createdAsset && assetsSelector.createdAsset !== null) {
      dispatch(clearCreatedAsset());
      navigate('/producer/assets');
    }
  }, [assetsSelector.createdAsset, dispatch]);

  const validateForm = () => {
    const errors = {};
    if (!assetPayload.name || assetPayload.name.trim() === '') {
      errors.name = 'Asset name is required';
    }
    if (!assetPayload.type || assetPayload.type.trim() === '') {
      errors.type = 'Asset type is required';
    }
    if (!assetPayload.species || assetPayload.species.trim() === '') {
      errors.species = 'Species is required';
    }
    if (!assetPayload.breed || assetPayload.breed.trim() === '') {
      errors.breed = 'Breed is required';
    }
    if (!assetPayload.location || assetPayload.location.trim() === '') {
      errors.location = 'Asset location is required';
    }
    if (!assetPayload.ownershipStatus || assetPayload.ownershipStatus.trim() === '') {
      errors.ownershipStatus = 'Ownership status is required';
    }

    // Type-specific validations
    if (assetPayload.type === 'animal') {
      if (!animal.sex || animal.sex === '') errors.sex = 'Sex is required';
      if (!animal.dateOfBirth || animal.dateOfBirth === '') errors.dateOfBirth = 'Date of birth is required';
      if (!animal.idMethod || animal.idMethod === '') errors.idMethod = 'ID method is required';
      if (!animal.origin || animal.origin === '') errors.origin = 'Origin is required';
      if (animal?.origin === 'purchased' && (!animal.acquisitionDate || animal.acquisitionDate === '')) errors.acquisitionDate = 'Acquisition date is required';
      if ((animal?.idMethod === 'ear-tag' || animal?.idMethod === 'rfid') && (!animal.idNumber || animal.idNumber.trim() === '')) {
        errors.idNumber = 'ID number is required for the selected ID method';
      }
      if (!animal.weightAtRegistration && animal.weightAtRegistration !== 0) errors.weightAtRegistration = 'Weight at registration is required';

    }

    if (assetPayload.type === 'crop') {
      if (!crop.plantingDate || crop.plantingDate === '') errors.plantingDate = 'Planting date is required';
      if (!crop.expectedHarvestDate || crop.expectedHarvestDate === '') errors.expectedHarvestDate = 'Expected harvest date is required';
      if (!crop.seedSource || crop.seedSource === '') errors.seedSource = 'Seed source is required';
      if (!crop.season || crop.season === '') errors.season = 'Crop season is required';
    }

    if (assetPayload.type === 'animal-group') {
      if (!animalGroup.size && animalGroup.size !== 0) errors.size = 'Size is required';
      if (!animalGroup.groupType || animalGroup.groupType === '') animalGroup.groupType = 'Group type is required';
      if (!animalGroup.startDate || animalGroup.startDate === '') animalGroup.startDate = 'Start date is required';
      if (!animalGroup.expectedHarvestDate || animalGroup.expectedHarvestDate === '') animalGroup.expectedHarvestDate = 'Expected harvest date is required';
    }
    console.log(errors)
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const pushAsset = () => {
    if (!validateForm()) {
      return;
    }

    // Normalize some fields before sending
    const payload = { 
      ...assetPayload,
      animal: {...animal, breed: assetPayload.breed, species: assetPayload.species},
      crop: {...crop, breed: assetPayload.breed, species: assetPayload.species},
      animalGroup: {...animalGroup, breed: assetPayload.breed, species: assetPayload.species}
    };
    // fertilizers/pesticides/feed lists: convert comma-separated strings to arrays if needed
    ['fertilizersUsed', 'pesticidesUsed', 'feedTypes'].forEach((k) => {
      if (payload[k] && typeof payload[k] === 'string') {
        payload[k] = payload[k].split(',').map(s => s.trim()).filter(Boolean);
      }
    });

    // Ensure backend gets currentLocation field if expected
    // if (payload.location && !payload.currentLocation) payload.currentLocation = payload.location;

    dispatch(createAsset(payload));
  }

  return (
    <div className="w-full max-w-3xl">
      <div className="">
        <p className="text-xs opacity-70">Asset Registration</p>
        <h2 className="font-semibold font-space-grotesk mt-1">Add New Asset</h2>
        
        <div className="mt-5">
          <TextField
            inputLabel="Asset Name"
            hasError={validationErrors.name}
            returnFieldValue={(value) => setAssetPayload({ ...assetPayload, name: value })}
            inputPlaceholder={`Enter the name of the asset`}
            requiredField={true}
          />
        </div>

        {locationsSelector?.loadingLocations ?
          <InlinePreloader />
        :

        locationsSelector?.locations?.locations?.length > 0 ? 
        <div className="mt-5">
          <AutocompleteSelect
            hasError={validationErrors.location}
            inputLabel="Asset Location (where is it located?)"
            preSelected={''}
            preSelectedLabel="name"
            requiredField={true}
            returnFieldValue={(value) => setAssetPayload({ ...assetPayload, location: value._id })}
            selectOptions={locationsSelector?.locations?.locations || []}
            titleField="name"
            placeholderText="Select asset location"
          />
        </div>
        :
        <p className="text-xs p-3 dark:bg-slate-100/5 mt-5 rounded bg-slate-200 text-slate-600 dark:text-slate-300">You need at least one location on your account to keep this asset. You have no locations yet. Navigate to the Locations section (<Link to="/producer/locations/new-location" className="text-blue-500 hover:underline">or click here</Link>) to add one.</p>
        }

        <div className="mt-5">
          <RadioGroup
            hasError={validationErrors.type}
            inline={false}
            inputLabel="Asset Type"
            items={assetTypeOptions}
            requiredField={true}
            returnSelected={(selectedItem) => setAssetPayload({ ...assetPayload, type: selectedItem.value })}
          />
        </div>

        {/* Common fields */}
        <div className="mt-5 grid grid-cols-1 gap-y-4">
          {assetPayload.type && (
            <TextField
              inputLabel="Species"
              hasError={validationErrors.species}
              returnFieldValue={(value) => setAssetPayload({ ...assetPayload, species: value })}
              inputPlaceholder={`Enter the specie of the ${assetPayload.type}`}
              requiredField={true}
            />
          )}

          {assetPayload.type &&(
            <TextField
              inputLabel="Breed"
              hasError={validationErrors.breed}
              returnFieldValue={(value) => setAssetPayload({ ...assetPayload, breed: value })}
              inputPlaceholder={`Enter the breed of the ${assetPayload.type}`}
              requiredField={true}
            />
          )}

          <div>
            <AutocompleteSelect
              hasError={validationErrors.ownershipStatus}
              inputLabel="Ownership Status"
              preSelected={''}
              preSelectedLabel="label"
              requiredField={true}
              disableAutocomplete={true}
              returnFieldValue={(value) => setAssetPayload({ ...assetPayload, ownershipStatus: value.value })}
              selectOptions={[{ label: 'Owned', value: 'owned' }, { label: 'Contracted', value: 'contracted' }, { label: 'Aggregated', value: 'aggregated' }]}
              titleField="label"
              placeholderText="Select ownership status"
            />
          </div>
        </div>

        {/* Conditional: Animal */}
        {assetPayload.type === 'animal' && (
          <div className="mt-5 grid grid-cols-1 gap-y-4">
            <AutocompleteSelect
              hasError={validationErrors.sex}
              inputLabel="Sex"
              preSelected={''}
              disableAutocomplete={true}
              returnFieldValue={(value) => setAnimal({ ...animal, sex: value.value })}
              selectOptions={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
              titleField="label"
              requiredField={true}
              placeholderText="Select sex"
            />

            <DateField
              inputLabel="Date of Birth"
              inputPlaceholder="YYYY-MM-DD"
              hasError={validationErrors.dateOfBirth}
              requiredField={true}
              returnFieldValue={(value) => setAnimal({ ...animal, dateOfBirth: new Date(value) })}
            />

            <AutocompleteSelect
              hasError={validationErrors.idMethod}
              inputLabel="ID Method"
              preSelected={''}
              disableAutocomplete={true}
              returnFieldValue={(value) => setAnimal({ ...animal, idMethod: value.value })}
              selectOptions={[{ label: 'Ear-tag', value: 'ear-tag' }, { label: 'RFID', value: 'rfid' }, { label: 'Visual', value: 'visual' }]}
              titleField="label"
              placeholderText="Select ID method"
            />

            <TextField
              inputLabel="ID Number"
              returnFieldValue={(value) => setAnimal({ ...animal, idNumber: value })}
              inputPlaceholder="Enter ID number (if applicable)"
              hasError={validationErrors.idNumber}
              requiredField={animal?.idMethod === 'ear-tag' || animal?.idMethod === 'rfid'}
            />
            

            <RadioGroup
              inline={true}
              hasError={validationErrors.origin}
              inputLabel="Origin"
              preSelected={''}
              disableAutocomplete={true}
              returnSelected={(value) => setAnimal({ ...animal, origin: value.value })}
              items={[{ label: 'Born on farm', value: 'born-on-farm' }, { label: 'Purchased', value: 'purchased' }]}
              titleField="label"
              placeholderText="Select animal origin"
              requiredField={true}
            />

            {animal?.origin === 'purchased' && (
              <DateField
                inputLabel="Acquisition Date"
                inputPlaceholder="YYYY-MM-DD"
                hasError={validationErrors.acquisitionDate}
                returnFieldValue={(value) => setAnimal({ ...animal, acquisitionDate: new Date(value) })}
                requiredField={true}
              />
            )}

            <NumberField
              inputLabel="Weight at Registration (kg)"
              requiredField={true}
              hasError={validationErrors.weightAtRegistration}
              returnFieldValue={(value) => setAnimal({ ...animal, weightAtRegistration: value })}
              inputPlaceholder={`What did the animal weigh?`}
            />
          </div>
        )}

        {/* Conditional: Crop */}
        {assetPayload.type === 'crop' && (
          <div className="mt-5 grid grid-cols-1 gap-y-4">
            <DateField
              inputLabel="Planting Date"
              hasError={validationErrors.plantingDate}
              returnFieldValue={(value) => setCrop({ ...crop, plantingDate: new Date(value) })}
              inputPlaceholder="When was the crop planted?"
              requiredField={true}
            />

            <AutocompleteSelect
              inputLabel="Crop Season"
              preSelected={''}
              disableAutocomplete={true}
              returnFieldValue={(value) => setCrop({ ...crop, season: value.value })}
              selectOptions={[{ label: 'Wet', value: 'wet' }, { label: 'Dry', value: 'dry' }, { label: 'Perennial', value: 'perennial' }]}
              titleField="label"
              placeholderText="Select season"
              requiredField={true}
            />

            <DateField
              inputLabel="Expected Harvest Date"
              hasError={validationErrors.expectedHarvestDate}
              returnFieldValue={(value) => setCrop({ ...crop, expectedHarvestDate: new Date(value) })}
              inputPlaceholder={`When do you expect to harvest this crop?`}
              requiredField={true}
            />

            <TextField
              inputLabel="Seed Source"
              hasError={validationErrors.seedSource}
              returnFieldValue={(value) => setCrop({ ...crop, seedSource: value })}
              inputPlaceholder="Where did the seeds come from?"
              requiredField={true}
            />

            <TextField
              inputLabel="Irrigation Source"
              returnFieldValue={(value) => setCrop({ ...crop, irrigationSource: value })}
              inputPlaceholder="What is the source of irrigation?"
              requiredField={false}
            />

            <TextFieldTagCloud
              inputLabel="Fertilizers Used" 
              fieldId="fertilizers-used" 
              inputType="text" 
              inputPlaceholder={'List the fertilizers used (separate with commas, enter or tab)'}
              hasError={false} 
              returnFieldValue={(value) => setCrop({ ...crop, fertilizersUsed: value })}
              // disabled
              preloadValue={[]}
              
            />

            <TextFieldTagCloud
              inputLabel="Pesticides Used" 
              fieldId="pesticides-used" 
              inputType="text" 
              inputPlaceholder={'List the pesticides used (separate with commas, enter or tab)'}
              hasError={false} 
              returnFieldValue={(value) => setCrop({ ...crop, pesticidesUsed: value })}
              preloadValue={[]}
              
            />
          </div>
        )}

        {/* Conditional: Animal Group */}
        {assetPayload.type === 'animal-group' && (
          <div className="mt-5 grid grid-cols-1 gap-y-4">
            <NumberField
              inputLabel="Size"
              hasError={validationErrors.size}
              returnFieldValue={(value) => setAnimalGroup({ ...animalGroup, size: value })}
              inputPlaceholder={`How many animals in the group?`}
              requiredField={true}
            />

            <AutocompleteSelect
              hasError={validationErrors.groupType}
              inputLabel="Group Type"
              preSelected={''}
              disableAutocomplete={true}
              returnFieldValue={(value) => setAnimalGroup({ ...animalGroup, type: value.value })}
              selectOptions={animalGroupTypeOptions}
              titleField="label"
              placeholderText="Select group type"
              requiredField={true}
            />

            <DateField
              inputPlaceholder="YYYY-MM-DD"
              inputLabel="Start Date"
              hasError={validationErrors.startDate}
              returnFieldValue={(value) => setAnimalGroup({ ...animalGroup, startDate: new Date(value) })}
              requiredField={true}
            />

            <DateField
              inputLabel="Expected Harvest Date"
              inputPlaceholder="YYYY-MM-DD"
              hasError={validationErrors.expectedHarvestDate}
              returnFieldValue={(value) => setAnimalGroup({ ...animalGroup, expectedHarvestDate: new Date(value) })}
              requiredField={true}
            />

            {/* <TextField
              inputLabel="Feed Types (comma separated)"
              returnFieldValue={(value) => setAssetPayload({ ...assetPayload, feedTypes: value })}
              requiredField={true}
              inputPlaceholder="List the feed types (comma separated)"
            /> */}

            <TextFieldTagCloud
              inputLabel="Feed Types" 
              fieldId="feeds-used" 
              inputType="text" 
              inputPlaceholder={'List the feed types (separate with commas, enter or tab)'}
              hasError={false} 
              returnFieldValue={(value) => setAnimalGroup({ ...animalGroup, feedTypes: value })}
              // disabled
              preloadValue={[]}
              
            />
          </div>
        )}

        {assetPayload.type && (
          <div className='mt-6'>
            <FormButton buttonAction={pushAsset} buttonLabel="Create Asset" processing={assetsSelector.creatingAsset} />
          </div>
        )}
      </div>
    </div>
  )
}

export default NewAsset
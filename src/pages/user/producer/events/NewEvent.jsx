import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearCreatedEvent } from '../../../../store/actions/eventsActions';
import { fetchAssets } from '../../../../store/actions/assetsActions';
import { fetchUsers } from '../../../../store/actions/usersActions';
import { fetchLocations } from '../../../../store/actions/locationsActions';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ERROR } from '../../../../store/types';
import { createEvent } from '../../../../store/actions/eventsActions';
import AutocompleteSelect from '../../../../components/elements/form/AutocompleteSelect';
import { AssetEvents } from '../assets/asset.const';
import { unSlugify } from '../../../../utils/utils';
import DateField from '../../../../components/elements/form/DateField';
import FormButton from '../../../../components/elements/form/FormButton';
import NumberField from '../../../../components/elements/form/NumberField';
import TextareaField from '../../../../components/elements/form/TextareaField';
import ChevronIcon from '../../../../components/elements/icons/ChevronIcon';
import FileUpload from '../../../../components/elements/form/FileUpload';
import PlusIcon from '../../../../components/elements/icons/PlusIcon';

const NewEvent = () => {
  const [eventPayload, setEventPayload] = useState({})
  const assetsSelector = useSelector((state) => state.assets)
  const usersSelector = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const eventsSelector = useSelector((state) => state.events)
  const locationsSelector = useSelector((state) => state.locations)
  const navigate = useNavigate()
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const activeAsset = searchParams.get('asset')

  useEffect(() => {
    dispatch(fetchAssets(``, 1, 25))
    dispatch(fetchUsers(``, 1, 25))
    dispatch(fetchLocations(``, 1, 25))

    if(eventsSelector?.createdEvent) {
      dispatch(clearCreatedEvent())
      navigate(`/producer/events`)
    }

    if(activeAsset) {
      setEventPayload({ ...eventPayload, asset: activeAsset })
    }
    return () => {
      
    }
  }, [eventsSelector?.createdEvent, dispatch])

  const [validationErrors, setValidationErrors] = useState({})
  
  const validateForm = () => {
    let errors = {}

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  const pushEvent = () => {
    if(!validateForm()) {
      dispatch({
        type: ERROR,
        error: {response: {data: {message: 'Please fix the validation errors before submitting the form'}}}
      })
      return
    }

    const payload = {...eventPayload}
    if(attachments?.length > 0 && attachments[0] !== '') {
      payload.attachments = attachments.map(attachment => ({ 
        type: ['jpg', 'jpeg', 'png'].includes(attachment.split('.').pop()) ? 'image' : ['mp4', 'mov'].includes(attachment.split('.').pop()) ? 'video' : ['pdf'].includes(attachment.split('.').pop()) ? 'document' : 'document',
        url: attachment 
      }))
    }

    dispatch(createEvent(payload))
  }

  const eventCategories = ['production', 'health', 'movement', 'processing', 'quality', 'export']

  const [attachments, setAttachments] = useState([''])
  const [addAttachments, setAddAttachments] = useState(false)
  const [addProducts, setAddProducts] = useState(false)

  return (
    <div className="w-full max-w-3xl">
      <div className="">
        <p className="text-xs opacity-70">Event Registration</p>
        <h2 className="text-lg font-semibold font-space-grotesk mt-1">Record a New Event</h2>
        
        {assetsSelector?.assets?.assets?.length > 0 ? 
            <div className="mt-5">
              <p className="text-xs mb-2">Each event must be recorded against an asset. Please select an asset below for this event.</p>
              <AutocompleteSelect
                hasError={validationErrors.asset}
                inputLabel="Asset"
                preSelected={eventPayload?.asset ? assetsSelector?.assets?.assets?.find(asset => asset.id === eventPayload.asset) : ''}
                preSelectedLabel="name"
                requiredField={true}
                returnFieldValue={(value) => {
                  setEventPayload({ ...eventPayload, asset: value.id })
                  setSelectedAsset(value)
                }}
                selectOptions={assetsSelector?.assets?.assets || []}
                titleField="name"
                placeholderText="Select an asset for this event"
                enableSearch={true}
                searchFunction={(term) => {
                  dispatch(fetchAssets(`searchTerm=${term}`))
                }}
                disabled={activeAsset ? true : false}
                searchInProgress={assetsSelector?.loadingAssets}
              />
              <p className="text-xs opacity-60">{activeAsset ? 'This asset has been pre-selected based on your previous choice. Please click on the + button at the bottom navigation to change it.' : ''}</p>
            </div>
          :
            <p className="text-xs p-3 dark:bg-slate-100/5 mt-5 rounded bg-slate-200 text-slate-600 dark:text-slate-300">You need at least one asset on your account to create an event. You have no assets yet. Navigate to the Assets section (<Link to="/producer/assets/new-asset" className="text-blue-500 hover:underline">or click here</Link>) to add one.</p>
          }

          {usersSelector?.users?.users?.length > 0 ? 
            <div className="mt-5">
              <p className="text-xs mb-2">Each event must be performed by a user. Please select a user below for this event. If you are performing this event by yourself, leave this field blank</p>
              <AutocompleteSelect
                hasError={validationErrors.user}
                inputLabel="User"
                preSelected={''}
                preSelectedLabel="name"
                requiredField={false}
                returnFieldValue={(value) => setEventPayload({ ...eventPayload, user: value._id })}
                selectOptions={usersSelector?.users?.users || []}
                titleField="name"
                placeholderText="Select a user for this event"
                enableSearch={true}
                searchFunction={(term) => {
                  dispatch(fetchUsers(`searchTerm=${term}&userType=inspector,regulator,exporter`))
                }}
                searchInProgress={usersSelector?.loadingUsers}
              />
            </div>
          :
            <p className="text-xs p-3 dark:bg-slate-100/5 mt-5 rounded bg-slate-200 text-slate-600 dark:text-slate-300">No regulators, inspectors or exporters found on the system. This event will be recorded as created by you.</p>
          }

          <div className="mt-5">
            <AutocompleteSelect
              hasError={validationErrors.eventCategory}
              inputLabel="Event Category"
              preSelected={''}
              preSelectedLabel="name"
              requiredField={true}
              returnFieldValue={(value) => setEventPayload({ ...eventPayload, eventCategory: value.slug })}
              selectOptions={eventCategories.map(category => ({ slug: category, category: unSlugify(category) }))  || []}
              titleField="category"
              disableAutocomplete
              placeholderText="Select an event type category"
            />
          </div>

          <div className="mt-5">
            <AutocompleteSelect
              hasError={validationErrors.eventTypeCategory}
              inputLabel="Event Type Category"
              preSelected={''}
              preSelectedLabel="name"
              requiredField={true}
              returnFieldValue={(value) => setEventPayload({ ...eventPayload, eventTypeCategory: value.slug })}
              selectOptions={AssetEvents.map(event => ({ slug: event.category, category: unSlugify(event.category) }))  || []}
              titleField="category"
              placeholderText="Select an event type category"
            />
          </div>

          {eventPayload?.eventTypeCategory &&
            <div className="mt-5">
              <AutocompleteSelect
                hasError={validationErrors.type}
                inputLabel="Event Type"
                preSelected={''}
                preSelectedLabel="name"
                requiredField={true}
                returnFieldValue={(value) => setEventPayload({ ...eventPayload, eventType: value.slug })}
                selectOptions={AssetEvents.find(event => event.category === eventPayload.eventTypeCategory)?.types.map(type => ({ slug: type, type: unSlugify(type) })) || []}
                titleField="type"
                placeholderText="Select an event type"
              />
            </div>
          }

          {['transfer', 'relocation'].includes(eventPayload?.eventType) &&
            <div className="mt-5">
              <AutocompleteSelect
                hasError={validationErrors.newLocation}
                inputLabel="New Location"
                preSelected={''}
                preSelectedLabel="name"
                requiredField={true}
                returnFieldValue={(value) => setEventPayload({ ...eventPayload, newLocation: value.slug })}
                selectOptions={locationsSelector?.locations?.locations?.map(location => ({ slug: location.id, location: location.name })) || []}
                titleField="location"
                placeholderText="Select a new location for the selected asset"
                enableSearch={true}
                searchFunction={(term) => {dispatch(fetchLocations(`searchTerm=${term}`))}}
                searchInProgress={locationsSelector?.loadingLocations}
              />
            </div>
          }

          {selectedAsset?.type !== 'animal' && <div className="mt-5">
            <NumberField
              inputLabel="Quantity Affected"
              requiredField={true}
              hasError={validationErrors.quantityAffected}
              returnFieldValue={(value) => setEventPayload({ ...eventPayload, quantityAffected: value })}
              inputPlaceholder={`How many assets were affected?`}
            />
          </div>}

          {selectedAsset?.type !== 'animal' && <div className="mt-5">
            <NumberField
              inputLabel="Weight Affected"
              requiredField={true}
              hasError={validationErrors.weightAffected}
              returnFieldValue={(value) => setEventPayload({ ...eventPayload, weightAffected: value })}
              inputPlaceholder={`What was the total weight affected?`}
            />
          </div>}

          <div className="mt-5">
            <NumberField
              inputLabel="Cost Estimate (₦)"
              requiredField={true}
              hasError={validationErrors.costEstimate}
              returnFieldValue={(value) => setEventPayload({ ...eventPayload, costEstimate: value })}
              inputPlaceholder={`What was the total cost of this event?`}
            />
          </div>

          <div className="mt-5">
            <DateField
              inputLabel="Event Date"
              hasError={validationErrors.date}
              returnFieldValue={(value) => setEventPayload({ ...eventPayload, date: new Date(value) })}
              inputPlaceholder="When did the event occur?"
              requiredField={true}
            />
          </div>

          <div className="mt-5">
            <TextareaField
              inputLabel="Notes"
              hasError={validationErrors.notes}
              returnFieldValue={(value) => setEventPayload({ ...eventPayload, notes: [{ note: value }] })}
              inputPlaceholder="Add any notes about this event"
              requiredField={(eventPayload?.eventTypeCategory === 'health' || eventPayload.eventType === 'death') ? true : false}
            />

          </div>

          <div className="mt-5">
            <DateField
              inputLabel="Next Due Date"
              hasError={validationErrors.date}
              returnFieldValue={(value) => setEventPayload({ ...eventPayload, nextDueDate: new Date(value) })}
              inputPlaceholder="When is the next due date?"
              requiredField={false}
            />
          </div>

          <div className="px-4 py-2 mt-5 rounded dark:bg-slate-100/2 bg-slate-50">
            <div onClick={()=>{setAddAttachments(!addAttachments)}} className=" flex items-start justify-between gap-x-3 cursor-pointer">
              <div className="w-full">
                <h2 className="text-[15px] font-semibold font-space-grotesk mt-1">Attachments</h2>
                <p className="text-xs opacity-70">Click here to add attachments (documents, videos, images) for this event</p>
              </div>
              <div className="w-10 mt-4 flex justify-end items-end">
                <ChevronIcon className={`w-4 h-4 transition duration-200 ${addAttachments ? 'rotate-270' : 'rotate-180'}`} />
              </div>
            </div>

            {addAttachments && (
              <>
                {attachments.map((attachment, attachmentIndex)=>(<div className="mt-4" onClick={(e) => e.stopPropagation()}>
                  <FileUpload 
                    hasError={validationErrors.attachments}
                    returnFileDetails={(fileDetails) => {
                      console.log(fileDetails, 'fileDetails')
                      const uploadedUrl = fileDetails?.cloudinaryPublicUrl || fileDetails?.publicUrl || fileDetails?.uploadedFile?.url || ''
                      let temp = [...attachments]
                      if (fileDetails) {
                        temp[attachmentIndex] = uploadedUrl
                        setAttachments(temp)
                      }
                    }}
                    fieldLabel="Attachment"
                    requiredField={false}
                    preAddedFile={attachment || ''}
                    preAddedFileName={attachment.split('/').pop() || ''}
                    acceptedFormats={['jpg', 'mp4', 'png', 'pdf']}
                    maxFileSize={10485760}
                  />
                </div>))}

                {attachments[0] !== '' && 
                <button 
                  onClick={() => setAttachments([...attachments, ''])} 
                  className="p-4 flex items-center justify-center border border-dashed dark:border-at-dark-gray rounded w-full mt-4 gap-2 text-sm "
                > 
                  <PlusIcon className="w-4 h-4" /> Add another attachment
                </button>}
              </>
            )}
          </div>

          {eventPayload?.eventCategory === 'processing' && (
          <div className="px-4 py-2 mt-5 rounded dark:bg-slate-100/2 bg-slate-50">
            <div onClick={()=>{setAddProducts(!addProducts)}} className=" flex items-start justify-between gap-x-3 cursor-pointer">
              <div className="w-full">
                <h2 className="text-[15px] font-semibold font-space-grotesk mt-1">Products</h2>
                <p className="text-xs opacity-70">This is an event with a category of "Processing". Were any products created from this processing event (Eg: eggs from a picking, Beef cuts from a slaughter)? Click here to add any products created.</p>
              </div>
              <div className="w-10 mt-4 flex justify-end items-end">
                <ChevronIcon className={`w-4 h-4 transition duration-200 ${addProducts ? 'rotate-270' : 'rotate-180'}`} />
              </div>
            </div>

            {addProducts && (
              <div className="mt-4">
                {/* Add your product form or components here */}
              </div>
            )}
          </div>
          )}

          <div className='mt-6'>
            <FormButton buttonAction={pushEvent} buttonLabel="Create Event" processing={eventsSelector.creatingEvent} />
          </div>
        </div>
    </div>
  )
}

export default NewEvent
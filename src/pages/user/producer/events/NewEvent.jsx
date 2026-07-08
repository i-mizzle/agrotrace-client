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
import TextField from '../../../../components/elements/form/TextField';
import ToggleSwitch from '../../../../components/elements/form/ToggleSwitch';
import TrashIcon from '../../../../components/elements/icons/TrashIcon';
import { productTypes, productUnits } from '../products/products.const';

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

    return () => {
      
    }
  }, [eventsSelector?.createdEvent, dispatch])

  useEffect(() => {
    if (!activeAsset) {
      return
    }

    setEventPayload((previousPayload) => ({ ...previousPayload, asset: activeAsset }))
  }, [activeAsset])

  useEffect(() => {
    if (!activeAsset || !assetsSelector?.assets?.assets?.length) {
      return
    }

    const matchedAsset = assetsSelector.assets.assets.find((asset) => asset.id === activeAsset)

    if (matchedAsset) {
      setSelectedAsset(matchedAsset)
    }
  }, [activeAsset, assetsSelector?.assets?.assets])

  const [validationErrors, setValidationErrors] = useState({})
  
  const validateForm = () => {
    const errors = {}

    const isEmpty = (value) => {
      if (value === null || value === undefined) return true
      if (typeof value === 'string') return value.trim() === ''
      return false
    }

    if (isEmpty(eventPayload?.asset)) {
      errors.asset = 'Please select an asset'
    }

    if (isEmpty(eventPayload?.description)) {
      errors.description = 'Event description is required'
    }

    if (!isEmpty(eventPayload?.description) && eventPayload?.description.length < 5) {
      errors.description = '5 chars minimum'
    }

    if (!isEmpty(eventPayload?.description) && eventPayload?.description.length > 65) {
      errors.description = '65 chars maximum'
    }

    if (isEmpty(eventPayload?.eventCategory)) {
      errors.eventCategory = 'Please select an event category'
    }

    if (isEmpty(eventPayload?.eventTypeCategory)) {
      errors.eventTypeCategory = 'Please select an event type category'
    }

    if (isEmpty(eventPayload?.eventType)) {
      errors.type = 'Please select an event type'
    }

    if (['transfer', 'relocation'].includes(eventPayload?.eventType) && isEmpty(eventPayload?.newLocation)) {
      errors.newLocation = 'Please select the new location'
    }

    if (selectedAsset?.type !== 'animal') {
      if (isEmpty(eventPayload?.quantityAffected) || Number(eventPayload?.quantityAffected) <= 0) {
        errors.quantityAffected = 'Quantity affected must be greater than 0'
      }

      if (isEmpty(eventPayload?.weightAffected) || Number(eventPayload?.weightAffected) <= 0) {
        errors.weightAffected = 'Weight affected must be greater than 0'
      }
    }

    if (isEmpty(eventPayload?.costEstimate) || Number(eventPayload?.costEstimate) < 0) {
      errors.costEstimate = 'Cost estimate must be 0 or greater'
    }

    if (!eventPayload?.date || Number.isNaN(new Date(eventPayload?.date).getTime())) {
      errors.date = 'Please provide a valid event date'
    }

    const notesRequired = eventPayload?.eventTypeCategory === 'health' || eventPayload?.eventType === 'death'
    const noteValue = eventPayload?.notes?.[0]?.note
    if (notesRequired && isEmpty(noteValue)) {
      errors.notes = 'Notes are required for this event'
    }

    if(addProducts) {
      if (products.length === 0) {
        errors.products = 'Please add at least one product'
      } else {
        products.forEach((product, index) => {
          if (!product.name) {
            errors[`products[${index}].name`] = 'Product name is required'
          }
          if (!product.type) {
            errors[`products[${index}].type`] = 'Product type is required'
          }
          if (!product.category) {
            errors[`products[${index}].category`] = 'Product category is required'
          }
          if (!product.quantity || Number(product.quantity) <= 0) {
            errors[`products[${index}].quantity`] = 'Product quantity must be greater than 0'
          }
          if (!product.unit) {
            errors[`products[${index}].unit`] = 'Product unit is required'
          }
        })
      }
    }

    console.log(errors, 'validation errors')

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
    if(addProducts && products.length > 0) {
      payload.products = products.map(product => ({
        ...product,
        quantity: {
          amount: Number(product.quantity), 
          unit: product.unit
        }
      }))
    }
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
  const [products, setProducts] = useState([])
  const emptyProduct = { name: '', type: '', category: '', quantity: '', unit: '' }

  const toggleAddProducts = () => {
    setAddProducts(!addProducts)
    if (addProducts) {
      setProducts([]) // Clear products when toggling off
    } else {
      setProducts([emptyProduct]) // Initialize with one empty product when toggling on
    }
  }

  const [collapsedProductIndices, setCollapsedProductIndices] = useState([])

  const toggleProductCollapse = (index) => {
    if (collapsedProductIndices.includes(index)) {
      setCollapsedProductIndices(collapsedProductIndices.filter(i => i !== index))
    } else {
      setCollapsedProductIndices([...collapsedProductIndices, index])
    }
  }

  const addProduct = () => {
    // collapse all products before this new one
    setCollapsedProductIndices([...collapsedProductIndices, products.length - 1])
    setProducts([...products, emptyProduct])
  }

  const removeProduct = (index) => {
    if (products.length > 0) {
      const updatedProducts = products.filter((_, i) => i !== index)
      setProducts(updatedProducts)
    }
  }

  const productTypeCategories = productTypes.flatMap(productType =>
    productType.types.map(type => ({
      name: unSlugify(type),
      slug: type,
      category: productType.category
    }))
  )
  
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
            <p className="text-xs p-3 dark:bg-slate-900/20 bg-slate-50 mt-5 rounded text-slate-600 dark:text-slate-300">You need at least one asset on your account to create an event. You have no assets yet. Navigate to the Assets section (<Link to="/producer/assets/new-asset" className="text-blue-500 hover:underline">or click here</Link>) to add one.</p>
          
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
            <p className="text-xs p-3 dark:bg-slate-900/20 bg-slate-50 mt-5 rounded text-slate-600 dark:text-slate-300">No regulators, inspectors or exporters found on the system. This event will be recorded as created by you.</p>
          }

          <div className="mt-5">
            <TextField
              inputLabel="Event Description"
              requiredField={true}
              hasError={validationErrors.description}
              returnFieldValue={(value) => setEventPayload({ ...eventPayload, description: value })}
              inputPlaceholder={`Short description (eg: "Egg Picking", "Animal Vaccination")`}
              maxLength={65}
            />
          </div>

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

          <div className="px-4 py-2 mt-5 rounded dark:bg-slate-900/20 bg-slate-50">
            <div onClick={()=>{setAddAttachments(!addAttachments)}} className=" flex items-start justify-between gap-x-3 cursor-pointer">
              <div className="w-full">
                <h2 className="text-[15px] font-semibold font-space-grotesk mt-1">Attachments</h2>
                <p className="text-xs text-gray-500 dark:text-slate-300">Click here to add attachments (documents, videos, images) for this event</p>
              </div>
              <div className="w-10 mt-4 flex justify-end items-end">
                <ChevronIcon className={`w-4 h-4 transition duration-200 ${addAttachments ? 'rotate-270' : 'rotate-180'}`} />
              </div>
            </div>

            {addAttachments && (
              <>
                {attachments.map((attachment, attachmentIndex)=>(<div key={attachmentIndex} className="mt-4" onClick={(e) => e.stopPropagation()}>
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
          <div className="mt-5">
            <ToggleSwitch
              label="Add Products"
              description="This is an event with a category of 'Processing'. Were any products created from this processing event (Eg: eggs from a picking, Beef cuts from a slaughter)?"
              toggle={() => toggleAddProducts()}
              checked={addProducts}
            />

            {addProducts && (
              <div className="mt-4">
                {products.map((product, index) => (
                  <div key={index} className="mb-4 p-4 border rounded-lg dark:border-at-dark-gray/40">
                    {collapsedProductIndices.includes(index) ? (
                      <div className="w-full flex items-start gap-x-3 justify-between cursor-pointer" onClick={() => toggleProductCollapse(index)}>
                        <div className="w-full">
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs">{product.quantity} {product.unit}</p>
                        </div>
                        <div className="flex flex-row-reverse gap-x-2 w-12">
                          <button className="p-2 rounded bg-slate-100 dark:bg-slate-900" onClick={() => toggleProductCollapse(index)}  >
                            <ChevronIcon className={`w-4 h-4 ${collapsedProductIndices.includes(index) ? 'rotate-90' : '-rotate-90'}`} />
                          </button>
                          {index > 0 && <button className="p-2 rounded bg-slate-100 dark:bg-slate-900" onClick={() => removeProduct(index)}  >
                            <TrashIcon className="w-4 h-4" />
                          </button>}
                        </div>
                      </div>)
                      :
                      <div className="relative">
                        <div className="flex flex-row-reverse gap-x-2 w-12 absolute -top-3 right-0">
                          <button className="p-2 rounded bg-slate-100 dark:bg-slate-900" onClick={() => toggleProductCollapse(index)}>
                            <ChevronIcon className={`w-4 h-4 ${collapsedProductIndices.includes(index) ? 'rotate-90' : '-rotate-90'}`} />
                          </button>
                          {index > 0 && <button className="p-2 rounded bg-slate-100 dark:bg-slate-900" onClick={() => removeProduct(index)}>
                            <TrashIcon className="w-4 h-4" />
                          </button>}
                        </div>

                        
                        <div className="mt-5">
                          <TextField
                            inputLabel={`Product Name`}
                            requiredField={true}
                            hasError={validationErrors[`productName${index}`]}
                            returnFieldValue={(value) => {
                              const updatedProducts = [...products]
                              updatedProducts[index].name = value
                              setProducts(updatedProducts)
                            }}
                            inputPlaceholder={`Enter product name`}
                            preloadValue={product.name}
                          />
                        </div>
                        <div className="mt-1">
                          <AutocompleteSelect
                            hasError={validationErrors[`productCategory${index}`]}
                            inputLabel="Product Category"
                            preSelected={product.type || ''}
                            preSelectedLabel="slug"
                            requiredField={true}
                            returnFieldValue={(value) => {
                              const updatedProducts = [...products]
                              updatedProducts[index].category = value.category
                              updatedProducts[index].type = value.slug
                              setProducts(updatedProducts)
                            }}
                            selectOptions={productTypeCategories || []}
                            titleField="name"
                            placeholderText="Select a product category"
                          />
                        </div>
                        <div className="mt-1">
                          <NumberField
                            inputLabel={`Product Quantity`}
                            requiredField={true}
                            hasError={validationErrors[`productQuantity${index}`]}
                            returnFieldValue={(value) => {
                              const updatedProducts = [...products]
                              updatedProducts[index].quantity = value
                              setProducts(updatedProducts)
                            }}
                            inputPlaceholder={`Quantity Produced`}
                            preloadValue={product.quantity}
                          />
                        </div>
                        
                        <div className="mt-1">
                          {/* <TextField
                            inputLabel={`Product Unit`}
                            requiredField={true}
                            hasError={validationErrors[`productUnit${index}`]}
                            returnFieldValue={(value) => {
                              const updatedProducts = [...products]
                              updatedProducts[index].unit = value
                              setProducts(updatedProducts)
                            }}
                            inputPlaceholder={`Enter product unit (e.g., kg, liters)`}
                            preloadValue={product.unit}
                          /> */}
                          <AutocompleteSelect
                            hasError={validationErrors[`unit${index}`]}
                            inputLabel="Product Unit"
                            preSelected={product.unit || ''}
                            preSelectedLabel=""
                            requiredField={true}
                            returnFieldValue={(value) => {
                              const updatedProducts = [...products]
                              updatedProducts[index].unit = value
                              setProducts(updatedProducts)
                            }}
                            selectOptions={productUnits || []}
                            titleField=""
                            placeholderText="Select a product unit"
                          />
                        </div>
                      </div>
                    }

                  </div>
                ))}
                <button 
                  onClick={() => {addProduct()}}
                  className="p-4 flex items-center justify-center border border-dashed dark:border-at-dark-gray rounded w-full mt-4 gap-1 text-sm "
                > 
                  <PlusIcon className="w-4 h-4" /> 
                  Add another product
                </button>
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
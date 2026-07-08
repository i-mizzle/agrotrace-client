import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AutocompleteSelect from '../../../../components/elements/form/AutocompleteSelect'
import FormButton from '../../../../components/elements/form/FormButton'
import NumberField from '../../../../components/elements/form/NumberField'
import TextField from '../../../../components/elements/form/TextField'
import ToggleSwitch from '../../../../components/elements/form/ToggleSwitch'
import { fetchAssets } from '../../../../store/actions/assetsActions'
import { fetchLocations } from '../../../../store/actions/locationsActions'
import { clearCreatedProduct, createProduct } from '../../../../store/actions/productsActions'
import { ERROR } from '../../../../store/types'
import { unSlugify } from '../../../../utils/utils'
import { productTypes, productUnits } from './products.const'

const NewProduct = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const assetsSelector = useSelector((state) => state.assets)
	const locationsSelector = useSelector((state) => state.locations)
	const productsSelector = useSelector((state) => state.products)

	const [productPayload, setProductPayload] = useState({
		batch: '',
		category: '',
		type: '',
		sourceAsset: '',
		location: '',
		name: '',
		wholeBatch: false,
		quantity: {
			amount: undefined,
			unit: '',
		},
		processingMethod: '',
		yieldPercentage: undefined,
		storageCondition: '',
		packingType: '',
		labelCode: '',
	})
	const [validationErrors, setValidationErrors] = useState({})

	useEffect(() => {
		dispatch(fetchAssets('', 1, 50))
		dispatch(fetchLocations('', 1, 50))
	}, [dispatch])

	useEffect(() => {
		if (productsSelector?.createdProduct) {
			dispatch(clearCreatedProduct())
			navigate('/producer/products')
		}
	}, [productsSelector?.createdProduct, dispatch, navigate])

	const categoryOptions = useMemo(
		() =>
			productTypes.map((item) => ({
				label: unSlugify(item.category),
				value: item.category,
			})),
		[],
	)

	const typeOptions = useMemo(() => {
		const selectedCategory = productTypes.find((item) => item.category === productPayload.category)
		if (!selectedCategory) {
			return []
		}

		return selectedCategory.types.map((item) => ({
			label: unSlugify(item),
			value: item,
		}))
	}, [productPayload.category])

	const unitOptions = useMemo(
		() => productUnits.map((unit) => ({ label: unit, value: unit })),
		[],
	)

	const batchOptions = useMemo(() => [], [])

	const generateLabelCode = () => {
		const categoryToken = (productPayload.category || 'product').replace(/[^a-zA-Z0-9]/g, '').slice(0, 3).toUpperCase()
		const typeToken = (productPayload.type || 'item').replace(/[^a-zA-Z0-9]/g, '').slice(0, 3).toUpperCase()
		const timeToken = Date.now().toString().slice(-6)
		const randomToken = Math.random().toString(36).slice(2, 6).toUpperCase()

		return `${categoryToken}${typeToken}-${timeToken}-${randomToken}`
	}

	const setField = (field, value) => {
		setProductPayload((previous) => ({
			...previous,
			[field]: value,
		}))
		setValidationErrors((previous) => ({ ...previous, [field]: '' }))
	}

	const setQuantityField = (field, value) => {
		setProductPayload((previous) => ({
			...previous,
			quantity: {
				...previous.quantity,
				[field]: value,
			},
		}))
		setValidationErrors((previous) => ({ ...previous, [`quantity.${field}`]: '' }))
	}

	const validateForm = () => {
		const errors = {}

		if (!productPayload.category) {
			errors.category = 'Product category is required'
		}

		if (!productPayload.type) {
			errors.type = 'Product type is required'
		}

		if (!productPayload.sourceAsset) {
			errors.sourceAsset = 'Source asset is required'
		}

		if (!productPayload.name || productPayload.name.trim() === '') {
			errors.name = 'Product name is required'
		}

		if (!productPayload.quantity?.amount || Number(productPayload.quantity.amount) <= 0) {
			errors['quantity.amount'] = 'Quantity amount must be greater than 0'
		}

		if (!productPayload.quantity?.unit) {
			errors['quantity.unit'] = 'Quantity unit is required'
		}

		if (
			productPayload.yieldPercentage !== undefined &&
			productPayload.yieldPercentage !== null &&
			(Number(productPayload.yieldPercentage) < 0 || Number(productPayload.yieldPercentage) > 100)
		) {
			errors.yieldPercentage = 'Yield percentage must be between 0 and 100'
		}

		setValidationErrors(errors)
		return Object.keys(errors).length === 0
	}

	const submitProduct = () => {
		if (!validateForm()) {
			dispatch({
				type: ERROR,
				error: { response: { data: { message: 'Please fix the validation errors before submitting the form' } } },
			})
			return
		}

		const payload = {
			category: productPayload.category,
			type: productPayload.type,
			sourceAsset: productPayload.sourceAsset,
			name: productPayload.name.trim(),
			wholeBatch: productPayload.wholeBatch,
			quantity: {
				amount: Number(productPayload.quantity.amount),
				unit: productPayload.quantity.unit,
			},
		}

		if (productPayload.batch) payload.batch = productPayload.batch
		if (productPayload.location) payload.location = productPayload.location
		if (productPayload.processingMethod?.trim()) payload.processingMethod = productPayload.processingMethod.trim()
		if (productPayload.yieldPercentage !== undefined && productPayload.yieldPercentage !== null) {
			payload.yieldPercentage = Number(productPayload.yieldPercentage)
		}
		if (productPayload.storageCondition?.trim()) payload.storageCondition = productPayload.storageCondition.trim()
		if (productPayload.packingType?.trim()) payload.packingType = productPayload.packingType.trim()
		payload.labelCode = productPayload.labelCode?.trim() || generateLabelCode()

		dispatch(createProduct(payload))
	}

	return (
		<div className="w-full max-w-3xl">
			<div>
				<p className="text-xs opacity-70">Product Registration</p>
				<h2 className="text-lg font-semibold font-space-grotesk mt-1">Create New Product</h2>
				<p className="text-sm opacity-75 mt-2">Capture production output details, source asset, quantity and packaging.</p>

				{assetsSelector?.assets?.assets?.length > 0 ? (
					<div className="mt-5">
						<AutocompleteSelect
							hasError={validationErrors.sourceAsset}
							inputLabel="Source Asset"
							preSelected={productPayload?.sourceAsset ? assetsSelector?.assets?.assets?.find((asset) => (asset._id || asset.id) === productPayload.sourceAsset) : ''}
							preSelectedLabel="name"
							requiredField={true}
							returnFieldValue={(value) => setField('sourceAsset', value._id || value.id)}
							selectOptions={assetsSelector?.assets?.assets || []}
							titleField="name"
							placeholderText="Select source asset"
							enableSearch={true}
							searchFunction={(term) => {
								dispatch(fetchAssets(`searchTerm=${term}`, 1, 50))
							}}
							searchInProgress={assetsSelector?.loadingAssets}
						/>
					</div>
				) : (
					<p className="text-xs p-3 dark:bg-slate-900/20 bg-slate-50 mt-5 rounded text-slate-600 dark:text-slate-300">
						You need at least one asset on your account to create a product. Navigate to the Assets section (
						<Link to="/producer/assets/new-asset" className="text-blue-500 hover:underline">
							or click here
						</Link>
						) to add one.
					</p>
				)}

				{locationsSelector?.locations?.locations?.length > 0 ? (
					<div className="mt-5">
						<AutocompleteSelect
							hasError={validationErrors.location}
							inputLabel="Location (Optional)"
							preSelected={productPayload?.location ? locationsSelector?.locations?.locations?.find((location) => (location._id || location.id) === productPayload.location) : ''}
							preSelectedLabel="name"
							requiredField={false}
							returnFieldValue={(value) => setField('location', value._id || value.id)}
							selectOptions={locationsSelector?.locations?.locations || []}
							titleField="name"
							placeholderText="Select location"
							enableSearch={true}
							searchFunction={(term) => {
								dispatch(fetchLocations(`searchTerm=${term}`, 1, 50))
							}}
							searchInProgress={locationsSelector?.loadingLocations}
						/>
					</div>
				) : (
					<p className="text-xs p-3 dark:bg-slate-900/20 bg-slate-50 mt-5 rounded text-slate-600 dark:text-slate-300">
						No locations found yet. You can still create this product and set location later.
					</p>
				)}

				<div className="mt-5">
					<AutocompleteSelect
						hasError={validationErrors.batch}
						inputLabel="Batch (Optional)"
						preSelected={''}
						preSelectedLabel="label"
						requiredField={false}
						returnFieldValue={(value) => setField('batch', value.value)}
						selectOptions={batchOptions}
						titleField="label"
						placeholderText="Batch selector will be available when batch actions are added"
						disabled={true}
					/>
					<p className="text-xs opacity-60 mt-2">Batch selection is disabled for now and ready for your upcoming batches store integration.</p>
				</div>

				<div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
					<AutocompleteSelect
						hasError={validationErrors.category}
						inputLabel="Category"
						preSelected={productPayload.category}
						preSelectedLabel="value"
						requiredField={true}
						disableAutocomplete={true}
						returnFieldValue={(value) => {
							setField('category', value.value)
							setField('type', '')
						}}
						selectOptions={categoryOptions}
						titleField="label"
						placeholderText="Select product category"
					/>

					<AutocompleteSelect
						hasError={validationErrors.type}
						inputLabel="Type"
						preSelected={productPayload.type}
						preSelectedLabel="value"
						requiredField={true}
						disableAutocomplete={true}
						disabled={!productPayload.category}
						returnFieldValue={(value) => setField('type', value.value)}
						selectOptions={typeOptions}
						titleField="label"
						placeholderText={productPayload.category ? 'Select product type' : 'Select category first'}
					/>
				</div>

				<div className="mt-5">
					<TextField
						inputLabel="Product Name"
						hasError={validationErrors.name}
						requiredField={true}
						returnFieldValue={(value) => setField('name', value)}
						inputPlaceholder="Enter product name"
					/>
				</div>

				<div className="mt-5">
					<ToggleSwitch
						label="Whole Batch"
						description="Turn on if this product represents the full output from the selected batch/asset processing cycle."
						checked={productPayload.wholeBatch}
						toggle={() => setField('wholeBatch', !productPayload.wholeBatch)}
					/>
				</div>

				<div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
					<NumberField
						inputLabel="Quantity Amount"
						requiredField={true}
						hasError={validationErrors['quantity.amount']}
						returnFieldValue={(value) => setQuantityField('amount', value)}
						inputPlaceholder="Enter amount"
					/>

					<AutocompleteSelect
						hasError={validationErrors['quantity.unit']}
						inputLabel="Quantity Unit"
						preSelected={productPayload.quantity.unit}
						preSelectedLabel="value"
						requiredField={true}
						disableAutocomplete={true}
						returnFieldValue={(value) => setQuantityField('unit', value.value)}
						selectOptions={unitOptions}
						titleField="label"
						placeholderText="Select unit"
					/>
				</div>

				<div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
					<TextField
						inputLabel="Processing Method (Optional)"
						hasError={validationErrors.processingMethod}
						requiredField={false}
						returnFieldValue={(value) => setField('processingMethod', value)}
						inputPlaceholder="E.g. milling, smoking, drying"
					/>

					<NumberField
						inputLabel="Yield Percentage (Optional)"
						requiredField={false}
						hasError={validationErrors.yieldPercentage}
						returnFieldValue={(value) => setField('yieldPercentage', value)}
						inputPlaceholder="0 - 100"
					/>

					<TextField
						inputLabel="Storage Condition (Optional)"
						hasError={validationErrors.storageCondition}
						requiredField={false}
						returnFieldValue={(value) => setField('storageCondition', value)}
						inputPlaceholder="E.g. dry, chilled, frozen"
					/>

					<TextField
						inputLabel="Packing Type (Optional)"
						hasError={validationErrors.packingType}
						requiredField={false}
						returnFieldValue={(value) => setField('packingType', value)}
						inputPlaceholder="E.g. bagged, boxed, vacuum packed"
					/>

					<TextField
						inputLabel="Label Code (Optional)"
						hasError={validationErrors.labelCode}
						requiredField={false}
						returnFieldValue={(value) => setField('labelCode', value)}
						inputPlaceholder="Leave empty to auto-generate"
					/>
				</div>

				<div className="mt-5 w-full">
					<FormButton
						buttonAction={submitProduct}
						buttonLabel="Create Product"
						processing={productsSelector?.creatingProduct}
						disabled={!assetsSelector?.assets?.assets?.length}
					/>
				</div>
			</div>
		</div>
	)
}

export default NewProduct

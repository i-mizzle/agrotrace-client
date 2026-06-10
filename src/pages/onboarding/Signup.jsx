import React, { act, useState } from 'react'
import TextField from '../../components/elements/form/TextField'
import PasswordField from '../../components/elements/form/PasswordField'
import { Link, useNavigate } from 'react-router-dom'
import FormButton from '../../components/elements/form/FormButton'
import AutocompleteSelect from '../../components/elements/form/AutocompleteSelect'
import { accountTypes, authHeader, baseUrl, exportCommodities, inspectorOrganizationTypes, inspectorTypes, parseNigerianCities, parseNigerianStates, producerTypes, validateEmail, validatePhoneNumber } from '../../utils/utils'
import OTPInput from '../../components/elements/form/OtpInput'
import Countdown from '../../components/elements/Countdown'
import Mailbox from '../../assets/img/mailbox.svg'
import RadioGroup from '../../components/elements/form/RadioGroup'
import { Nationalities } from '../../assets/static/nationalities'
import { useDispatch } from 'react-redux'
import { ERROR, SET_SUCCESS } from '../../store/types'
import axios from 'axios'
import PhoneNumberField from '../../components/elements/form/PhoneNumberField';
import InlinePreloader from '../../components/elements/InlinePreloader';
import Logo from '../../components/elements/Logo';

const Signup = () => {
  const [validationErrors, setValidationErrors] = useState({})
  const dispatch = useDispatch()
  const [otp, setOtp] = useState('')

  const [counted, setCounted] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [userDetails, setUserDetails] = useState({
    userType: ''
  })

  const [organizationDetails, setOrganizationDetails] = useState()
  const [activeCities, setActiveCities] = useState([])

  const steps = [
    {
      title: "User Information",
      description: "",
    },
    {
      title: "Email Verification",
      description: "",
    },
    {
      title: "Company Information",
      description: "",
    },
  ]

  const selectCommodity = (commodity) => {
    let temp = organizationDetails?.commodities ?? []

    if(temp.includes(commodity)){
      temp.splice(temp.indexOf(commodity), 1)
    } else {
      temp.push(commodity)
    }

    setOrganizationDetails({...organizationDetails, commodities: temp})
  }

  const [activeStep, setActiveStep] = useState(0)

  const [processing, setProcessing] = useState(false)

  const validateSignupForm = () => {
    let errors = {}
    if(!userDetails.name || userDetails.name === '') {
      errors.name = "Name required"
    }

    if(!userDetails.phone || userDetails.phone === '') {
      errors.phone = "Phone number required"
    } 

    if(userDetails.phone && !validatePhoneNumber(userDetails.phone)) {
      errors.phone = "Invalid phone number"
    }

    if(!userDetails.email || userDetails.email === '') {
      errors.email = "Email required"
    }

    if(userDetails.email && !validateEmail(userDetails.email)) {
      errors.email = "Invalid email"
    }

    if(!userDetails.userType || userDetails.userType === '') {
      errors.userType = "Please select an option"
    }

    if(!userDetails.gender || userDetails.gender === '') {
      errors.gender = "Please select your gender"
    }

    if(!userDetails.password || userDetails.password === '') {
      errors.password = "Password required"
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const signupUser = async () => {
    try {
      if(!validateSignupForm()) {
        dispatch({
          type: ERROR,
          error: {
            response: {
              data: {
                message: "Please fill all required fields highlighted"
              }
            }
          }
        })

        return
      }

      await axios.post(`${baseUrl}/onboarding/signup`, userDetails)
      setOtpSent(true)
      setActiveStep(1)

      setProcessing(false)
    } catch (error) {
      console.log('error signing up: ', error)
      dispatch({
        type: ERROR,
        error
      })
      setProcessing(false)
    }
  }

  const [resending, setResending] = useState(false)

  const resendOtp = async () => {
    try {
      setResending(true)
      await axios.post(`${baseUrl}/onboarding/email-confirmation/resend`, {email: userDetails.email})
      setResending(false)
      setOtpSent(true)
    } catch (error) {
      dispatch({
        type: ERROR,
        error
      })
      setResending(false)
    }
  }

  const validateEmailConfirmation = () => {
    let errors = {}
    if(!otp || otp === '') {
      errors.otp = true
    }
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const [stateToken, setStateToken] = useState('')

  const confirmEmail = async () => {
    try {
      if(!validateEmailConfirmation()) {
        dispatch({
          type: ERROR,
          error: {
            response: {
              data: {
                message: "Please fill all required fields highlighted"
              }
            }
          }
        })

        return
      }

      const payload = {
        confirmationCode: otp
      }

      setProcessing(true)

      const response = await axios.post(`${baseUrl}/onboarding/signup/confirm`, payload)
      setStateToken(response.data.data.stateToken)
      setActiveStep(2)
      setProcessing(false)
    } catch (error) {
      console.log('error confirming email: ', error)
      dispatch({
        type: ERROR,
        error
      })
      setProcessing(false)
    }
  }

  const validateOrganizationForm = () => {
    let errors = {}
    
    if(!organizationDetails?.name || organizationDetails?.name === '') {
      errors.companyName = "Company name required"
    }
    
    if(userDetails.userType === 'producer') {
  
      if(!organizationDetails.type || organizationDetails.type === '') {
        errors.producerType = "Producer type required"
      }
  
      if(!organizationDetails.state || organizationDetails.state === '') {
        errors.state = "State required"
      }
  
      if(!organizationDetails.lga || organizationDetails.lga === '') {
        errors.lga = "LGA required"
      }
  
      if(!organizationDetails.registered || organizationDetails.registered === '') {
        errors.registrationStatus = "Please select an option" 
      }
  
      if(organizationDetails.registered === 'cac' && (!organizationDetails.idNumber || organizationDetails.idNumber === '')) {
        errors.idNumber = "CAC number required"
      }
    }

    if(userDetails.userType === 'exporter') {
      if(!organizationDetails.address || organizationDetails.address === '') {
        errors.address = "Address required"
      }

      if(!organizationDetails.country || organizationDetails.country === ''){
        errors.country = "Country is required"
      }

      if(!organizationDetails.state || organizationDetails.state === '') {
        errors.state = "State is required"
      }

      if(!organizationDetails.registrationNumber || organizationDetails.registrationNumber === '') {
        errors.registrationNumber = "Registration number is required"
      }

      if(!organizationDetails.exportLicenseNumber || organizationDetails.exportLicenseNumber === '') {
        errors.exportLicenseNumber = "Export license number is required"
      }

      if(!organizationDetails.commodities || organizationDetails.commodities.length === 0) {  
        errors.commodities = "Please select at least one commodity"
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const navigate = useNavigate()
  const createOrganization = async () => {
    try {
      if(!validateOrganizationForm()) {
        dispatch({
          type: ERROR,
          error: {
            response: {
              data: {
                message: "Please fill all required fields highlighted"
              }
            }
          }
        })

        return
      }

      const headers = authHeader()

      const payload = {
        type: userDetails.userType,
        organization: organizationDetails,
        stateToken
      }

      await axios.post(`${baseUrl}/onboarding/signup/complete`, payload, {headers})
      setProcessing(false)
      dispatch({
        type: SET_SUCCESS,
        payload: `Your account has been created successfully 🎉 You can now log in`
      })

      navigate('/')
    } catch (error) {
      dispatch({
        type: ERROR,
        error
      })
      setProcessing(false)
    }
  }

  const stepSignup = async () => {
    switch (activeStep) {
      case 0:
        signupUser()
        break;
      
      case 1:
        confirmEmail()
        break;
    
      case 2:
        createOrganization()
        break;
    
      default:
        break;
    }
  }

  return (
    <div className='w-full'>
      <Logo />

      <div className='mt-10'>
        <h3 className="text-[24px] text-at-black font-medium dark:text-at-white tracking-tighter leading-tight font-space-grotesk text-left mx-auto">Welcome aboard</h3>
        <p className="text-left mt-2 text-at-black text-sm dark:text-at-white">Join AgroTrace NG to trace, verify, and manage agricultural supply chains with confidence.</p>

        <div className='w-full mt-10'>
          <span className='py-2 px-5 rounded-full text-xs font-medium bg-at-black/5 text-at-black dark:bg-at-white/10 dark:text-at-white/70 inline-block'>
            Step {activeStep+1} of {steps.length}
          </span>
          {/* <h3 className='text-md mt-3 font-medium'>{steps[activeStep].title}</h3> */}
        </div>

        {activeStep === 0 && <>
          <div className='mt-4'>
            <TextField 
              inputLabel="Name" 
              fieldId="name" 
              inputType="text" 
              preloadValue={''}
              inputPlaceholder={'Your full name'}
              hasError={validationErrors && validationErrors.name} 
              returnFieldValue={(value)=>{setUserDetails({...userDetails, name: value})}}
              requiredField={true}
            />
          </div>

          <div className='mt-4'>
            <PhoneNumberField 
              inputLabel="Phone number" 
              fieldId="phone" 
              inputType="text" 
              preloadValue={''}
              inputPlaceholder={'Your active phone number'}
              hasError={validationErrors && validationErrors.phone} 
              returnFieldValue={(value)=>{setUserDetails({...userDetails, phone: value})}}
              requiredField={true}
            />
          </div>

          <div className='mt-4'>
            <RadioGroup 
              items={[
                {label: 'Female', value: 'female'},
                {label: 'Male', value: 'male'},
              ]} 
              inputLabel={`Gender`} 
              placeholderText={`Select your gender`}
              displayImage={false} 
              titleField={`label`} 
              inline
              hasError={validationErrors?.userType} 
              returnSelected={(value)=>{setUserDetails({...userDetails, gender: value.value})}}
              disabled={false}
              requiredField={true}
              disableAutocomplete={true}
            />
          </div>

          <div className='mt-4'>
            <RadioGroup 
              items={accountTypes} 
              inputLabel={`Account type`} 
              placeholderText={`Select your account type`}
              displayImage={false} 
              titleField={`label`} 
              // preSelected={null} 
              // preSelectedLabel={``}
              hasError={validationErrors?.userType} 
              returnSelected={(value)=>{setUserDetails({...userDetails, userType: value.value})}}
              disabled={false}
              requiredField={true}
              disableAutocomplete={true}
            />
          </div>
          
          <div className='mt-4'>
            <TextField 
              inputLabel="Email address" 
              fieldId="email;" 
              inputType="text" 
              preloadValue={''}
              inputPlaceholder={'Your active email address'}
              hasError={validationErrors && validationErrors.email} 
              returnFieldValue={(value)=>{setUserDetails({...userDetails, email: value})}}
              requiredField={true}
            />
          </div>
          
          <div className='mt-4'>
            <PasswordField
              inputLabel="Password" 
              fieldId="password" 
              inputType="password" 
              inputPlaceholder={'Your password'}
              preloadValue={''}
              hasError={validationErrors && validationErrors.password} 
              returnFieldValue={(value)=>{setUserDetails({...userDetails, password: value})}}
              showPasswordMeter={true}
              requiredField={true}
            />
          </div>
        </>}

        {activeStep === 1 && <>
          <div className='w-full pt-2.5 pb-4 mb-5'>
            <img src={Mailbox} className='w-14 mt-4 mb-1' />
            <h3 className='mt-2.5 text-[18px] font-space-grotesk font-[550]'>Check your email</h3>
            <p className='text-sm text-gray-500'>We have sent an otp to your email address ({userDetails.email}). Please provide it below to confirm your email address</p>
          </div>

          <div className='w-max mx-auto mt-5'>
            <OTPInput length={6} onChange={(value)=>{setOtp(value)}} hasError={validationErrors && validationErrors.otp} />
          </div>
          {counted && !otpSent 
            ? 
            <button 
                className='mt-3 font-medium w-full block bg-opacity-10 text-sm py-4 dark:text-at-white transition duration-200 hover:text-at-dark-gray' 
                onClick={()=>{resendOtp()}}
                disabled={resending}
            >
                {resending ? <InlinePreloader /> : "Resend confirmation email"}
            </button>
            :
            <>
                <p className='py-5 text-sm mt-2 text-gray-400 text-center'>Didn&apos;t get the otp? please wait <Countdown seconds={60} className='inline text-green-400 font-bold font-space-grotesk' countdownComplete={()=>{
                  setCounted(true)
                  setOtpSent(false)
                }} /> seconds
                </p>
            </>
          }
        </>}

        {activeStep === 2 && <>
          <h3 className='mt-2.5 text-[18px] font-space-grotesk font-[550]'>Organization Details</h3>
          <p className='text-sm text-gray-600 dark:text-gray-300'>Please provide company details of { userDetails.userType === 'producer' ? `your farm` : `the organization you represent`}</p>
          
          {userDetails.userType === 'producer' && <>
            <div className='mt-4'>
              <TextField 
                inputLabel="Company Name" 
                fieldId="companyName" 
                inputType="text" 
                preloadValue={''}
                inputPlaceholder={'Operating name'}
                hasError={validationErrors && validationErrors.companyName} 
                returnFieldValue={(value)=>{setOrganizationDetails({...organizationDetails, name: value})}}
                requiredField={true}
              />
            </div>

            <div className='mt-4'>
              <AutocompleteSelect 
                selectOptions={producerTypes} 
                inputLabel={`Type`} 
                placeholderText={`Select your producer type`}
                displayImage={false} 
                titleField={`label`} 
                // preSelected={null} 
                // preSelectedLabel={``}
                hasError={validationErrors?.producerType} 
                returnFieldValue={(value)=>{setOrganizationDetails({...organizationDetails, type: value.value})}}
                disabled={false}
                requiredField={true}
                disableAutocomplete={true}
              />
            </div>

            <h3 className='mt-6 font-space-grotesk font-[550]'>Primary Location</h3>
            <p className='text-sm text-gray-600 dark:text-gray-300'>Please provide the primary location of your operation</p>

            <div className='mt-4'>
              <AutocompleteSelect 
                selectOptions={parseNigerianStates()} 
                inputLabel={`State`} 
                placeholderText={`Select state`}
                displayImage={false} 
                titleField={`label`} 
                // preSelected={null} 
                // preSelectedLabel={``}
                hasError={validationErrors?.state} 
                returnFieldValue={(value)=>{
                  setOrganizationDetails({
                    ...organizationDetails,
                    state: value.label,
                    stateCode: value.value
                  })
                  console.log(value.label)
                  setActiveCities(parseNigerianCities(value.label))
                }}
                disabled={false}
                requiredField={true}
                // disableAutocomplete={true}
                // position='bottom-[50px]'
              />
            </div>

            {organizationDetails?.state && organizationDetails?.state !== '' && <div className='mt-4'>
              <AutocompleteSelect 
                selectOptions={activeCities} 
                inputLabel={`State`} 
                placeholderText={`Select LGA`}
                displayImage={false}
                hasError={validationErrors?.lga} 
                returnFieldValue={(value)=>{
                  setOrganizationDetails({
                    ...organizationDetails,
                    lga: value
                  })
                }}
                disabled={false}
                requiredField={true}
                // disableAutocomplete={true}
                // position='bottom-[50px]'
              />
            </div>}
 
            <h3 className='mt-6 font-space-grotesk font-[550]'>Business Registration & Identity</h3>
            <p className='text-sm text-gray-600 dark:text-gray-300'>Please provide corporate registration details</p>
              
            <div className='mt-4'>
              <RadioGroup 
                items={[
                  {
                    label: "Yes it is",
                    value: true
                  },
                  {
                    label: "No, not yet",
                    value: false
                  }
                ]} 
                returnSelected={(value)=>{
                  setOrganizationDetails({
                    ...organizationDetails, 
                    registered: value.value,
                    idType: value.value === true ? 'cac' : 'none'
                  })
                  
                }} 
                hasError={validationErrors?.registrationStatus} 
                inputLabel="Is your farm registered with the CAC?" 
                requiredField 
                inline 
                preSelectedIndex={''} />
            </div>

            {organizationDetails?.idType === 'cac' && <div className='mt-4'>
              <TextField 
                inputLabel="CAC Registration Number" 
                fieldId="cacRegNumber" 
                inputType="text" 
                preloadValue={''}
                inputPlaceholder={'Registration number on your CAC Certificate'}
                hasError={validationErrors && validationErrors.regNumber} 
                returnFieldValue={(value)=>{setOrganizationDetails({...organizationDetails, idNumber: value})}}
                requiredField={true}
              />
            </div>}
          </>}

          {userDetails.userType === 'inspector' && <>
            <div className='mt-4'>
              <TextField 
                inputLabel="Organization Name" 
                fieldId="companyName" 
                inputType="text" 
                preloadValue={''}
                inputPlaceholder={'Inspector organization name'}
                hasError={validationErrors && validationErrors.companyName} 
                returnFieldValue={(value)=>{}}
                requiredField={true}
              />
            </div>

            <div className='mt-4'>
              <AutocompleteSelect 
                selectOptions={inspectorTypes} 
                inputLabel={`Type`} 
                placeholderText={`Select your inspection type`}
                displayImage={false} 
                titleField={`label`} 
                // preSelected={null} 
                // preSelectedLabel={``}
                hasError={validationErrors?.type} 
                returnFieldValue={(value)=>{}}
                disabled={false}
                requiredField={true}
                disableAutocomplete={true}
              />
            </div>

            <div className='mt-4'>
              <AutocompleteSelect 
                selectOptions={inspectorOrganizationTypes} 
                inputLabel={`Organization Type`} 
                placeholderText={`Select organization type`}
                displayImage={false} 
                titleField={`label`} 
                // preSelected={null} 
                // preSelectedLabel={``}
                hasError={validationErrors?.organizationType} 
                returnFieldValue={(value)=>{}}
                disabled={false}
                requiredField={true}
                disableAutocomplete={true}
              />
            </div>

            <div className='mt-4'>
              <TextField 
                inputLabel="License Number" 
                fieldId="licenseName" 
                inputType="text" 
                preloadValue={''}
                inputPlaceholder={'Your license number'}
                hasError={validationErrors && validationErrors.licenseNumber} 
                returnFieldValue={(value)=>{}}
                requiredField={true}
              />
            </div>

            <div className='mt-4'>
              <TextField 
                inputLabel="Certification body" 
                fieldId="certificationBody" 
                inputType="text" 
                preloadValue={''}
                inputPlaceholder={'Which body certified your organization?'}
                hasError={validationErrors && validationErrors.certificationBody} 
                returnFieldValue={(value)=>{}}
                requiredField={true}
              />
            </div>

          </>}

          {userDetails.userType === 'exporter' && <>
            <div className='mt-4'>
              <TextField 
                inputLabel="Organization Name" 
                fieldId="companyName" 
                inputType="text" 
                preloadValue={''}
                inputPlaceholder={'Inspector organization name'}
                hasError={validationErrors && validationErrors.companyName} 
                returnFieldValue={(value)=>{setOrganizationDetails({...organizationDetails, companyName: value})}}
                requiredField={true}
              />
            </div>

            <div className='mt-4'>
              <TextField 
                inputLabel="Registration Number" 
                fieldId="cacRegNumber" 
                inputType="text" 
                preloadValue={''}
                inputPlaceholder={'Your CAC Registration Number'}
                hasError={validationErrors && validationErrors.registrationNumber} 
                returnFieldValue={(value)=>{setOrganizationDetails({...organizationDetails, registrationNumber: value})}}
                requiredField={true}
              />
            </div>

            <div className='mt-4'>
              <TextField 
                inputLabel="Export License Number" 
                fieldId="licenseName" 
                inputType="text" 
                preloadValue={''}
                inputPlaceholder={'Your license number'}
                hasError={validationErrors && validationErrors.exportLicenseNumber} 
                returnFieldValue={(value)=>{setOrganizationDetails({...organizationDetails, exportLicenseNumber: value})}}
                requiredField={false}
              />
            </div>

            <h3 className='mt-6 font-space-grotesk font-[550]'>Export Commodities</h3>
            <p className='text-sm text-gray-600 dark:text-gray-300'>Select all commodities from the list below that your organization trades in.</p>
            {validationErrors && validationErrors.commodities && <p className='text-xs text-red-400'>{validationErrors.commodities}</p>}
            <div className='mt-4 flex flex-wrap gap-x-2 gap-y-2'>
              {exportCommodities.map((commodity, commodityIndex) => (
                <button onClick={()=>{selectCommodity(commodity)}} key={commodityIndex} className={`border-2 rounded-lg text-sm bg-at-dark-gray/5 p-3 capitalize ${organizationDetails?.commodities?.includes(commodity) ? 'border-accent text-at-black dark:text-accent' : 'border-transparent dark:text-at-white text-at-black'}`}>{commodity}</button>
              ))}
            </div>

            <h3 className='mt-6 font-space-grotesk font-[550]'>Primary office address</h3>
            <p className='text-sm text-gray-600 dark:text-gray-300'>Please provide the address of your primary location</p>

            <div className='mt-4'>
              <TextField 
                inputLabel="Address" 
                fieldId="address" 
                inputType="text" 
                preloadValue={''}
                inputPlaceholder={'Your operating address'}
                hasError={validationErrors && validationErrors.address} 
                returnFieldValue={(value)=>{setOrganizationDetails({...organizationDetails, address: value})}}
                requiredField
              />
            </div>

            <div className='w-full mt-4'>
              <AutocompleteSelect
                selectOptions = {Nationalities}
                requiredField={true}
                inputLabel = "Country"
                titleField = "name"
                placeholderText={`Select address country`}
                displayImage = {true}
                imageField = "image"
                fieldId = "addressCountry"
                preSelected={''}
                preSelectedLabel=''
                hasError = {validationErrors && validationErrors.country}
                returnFieldValue={(value)=>{setOrganizationDetails({...organizationDetails, ...{
                    countryCode: value.code,
                    country: value.name
                }})}}
                position='bottom-[50px]'
              />
            </div>

            <div className='w-full mt-4'>
              {organizationDetails?.countryCode === 'NG' ? <AutocompleteSelect 
                selectOptions={parseNigerianStates()} 
                inputLabel={`State`} 
                placeholderText={`Select state`}
                displayImage={false} 
                titleField={`label`} 
                // preSelected={null} 
                // preSelectedLabel={``}
                hasError={validationErrors?.state} 
                returnFieldValue={(value)=>{
                  setOrganizationDetails({
                    ...organizationDetails,
                    state: value.label,
                    stateCode: value.value
                  })
                  console.log(value.label)
                  setActiveCities(parseNigerianCities(value.label))
                }}
                disabled={false}
                requiredField={true}
                // disableAutocomplete={true}
                // position='bottom-[50px]'
              />
            :
              <TextField 
                inputLabel="State" 
                fieldId="state" 
                inputType="text" 
                preloadValue={''}
                inputPlaceholder={'Address state'}
                hasError={validationErrors && validationErrors.state} 
                returnFieldValue={(value)=>{setOrganizationDetails({...organizationDetails, state: value})}}
                requiredField
              />
            }
            </div>
          </>}
          
        </>}
      </div>

      <p className="mb-3 mt-5 text-sm text-opacity-70 block">Already have an account? <Link to="/" className="text-accent">Click here to log in</Link></p>

      <div className='mt-5'>
        <FormButton buttonAction={()=>{stepSignup()}} disabled={false} buttonLabel={`Continue`} processing={processing} />
      </div>

    </div>
  )
}

export default Signup
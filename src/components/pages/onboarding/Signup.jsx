import React, { useState } from 'react'
import Logo from '../../elements/Logo'
import TextField from '../../elements/form/TextField'
import PasswordField from '../../elements/form/PasswordField'
import { Link } from 'react-router-dom'
import FormButton from '../../elements/form/FormButton'
import AutocompleteSelect from '../../elements/form/AutocompleteSelect'
import { accountTypes } from '../../../utils/utils'
import OTPInput from '../../elements/form/OtpInput'
import Countdown from '../../elements/Countdown'
import Mailbox from '../../../assets/img/mailbox.svg'

const Signup = () => {
  const [validationErrors, setValidationErrors] = useState({})
  const [email, setEmail] = useState('')
  const [counted, setCounted] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

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

  const [activeStep, setActiveStep] = useState(1)

  const resendOtp = () => {

  }
  
  return (
    <div className='w-full'>
      <Logo />

      <div className='mt-10'>
        <h3 className="text-[24px] text-at-black font-medium dark:text-at-white tracking-tighter leading-tight font-space-grotesk text-left mx-auto">Join the Future of Agricultural Traceability</h3>
        <p className="text-left mt-3 text-at-black text-sm dark:text-at-white">Create your AgroTrace NG account to track agricultural produce, verify supply chains, improve compliance, and unlock AI-powered insights for safer, smarter exports.</p>

        <span className='py-2 px-5 rounded-full text-xs font-medium bg-at-black/5 text-at-black dark:bg-at-white/10 dark:text-at-white/70 inline-block mt-10'>
          Step {activeStep+1} of {steps.length}
        </span>

        {activeStep === 0 && <>
          <div className='mt-4'>
            <TextField 
              inputLabel="Name" 
              fieldId="name" 
              inputType="text" 
              preloadValue={''}
              inputPlaceholder={'Your full name'}
              hasError={validationErrors && validationErrors.email} 
              returnFieldValue={(value)=>{}}
              requiredField={true}
            />
          </div>

          <div className='mt-4'>
            <TextField 
              inputLabel="Phone number" 
              fieldId="username" 
              inputType="text" 
              preloadValue={''}
              inputPlaceholder={'Your active phone number'}
              hasError={validationErrors && validationErrors.email} 
              returnFieldValue={(value)=>{}}
              requiredField={true}
            />
          </div>

          <div className='mt-4'>
            <AutocompleteSelect 
              selectOptions={accountTypes} 
              inputLabel={`Account type`} 
              placeholderText={`Select your account type`}
              displayImage={false} 
              titleField={`label`} 
              // preSelected={null} 
              // preSelectedLabel={``}
              hasError={validationErrors?.accountType} 
              returnFieldValue={(value)=>{}}
              disabled={false}
              requiredField={true}
              disableAutocomplete={true}
            />
          </div>
          
          <div className='mt-4'>
            <TextField 
              inputLabel="Email address" 
              fieldId="username" 
              inputType="text" 
              preloadValue={''}
              inputPlaceholder={'Your registered email address'}
              hasError={validationErrors && validationErrors.email} 
              returnFieldValue={(value)=>{}}
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
              returnFieldValue={(value)=>{}}
              showPasswordMeter={true}
              requiredField={true}
            />
          </div>
        </>}

        {activeStep === 1 && <>
          <div className='w-full pt-2.5 pb-4 mb-5'>
            <img src={Mailbox} className='w-14 mt-4 mb-1' />
            <h3 className='mt-2.5 text-[18px] font-space-grotesk font-[550]'>Check your email</h3>
            <p className='text-sm text-gray-500'>We have sent an otp to your email address ({email}). Please provide it below to confirm your email address</p>
          </div>

          <div className='w-max mx-auto mt-5'>
            <OTPInput length={6} onChange={(value)=>{}} hasError={validationErrors && validationErrors.otp} />
          </div>
          {counted && !otpSent 
            ? 
            <button 
                className='mt-3 font-medium w-full block bg-opacity-10 text-sm py-4 dark:text-at-white transition duration-200 hover:text-at-dark-gray' 
                onClick={()=>{resendOtp()}}
            >
                Resend confirmation email
            </button>
            :
            <>
                <p className='py-5 text-sm mt-2 text-gray-400 text-center'>Didn&apos;t get the otp? please wait <Countdown seconds={60} className='inline text-green-400 font-bold' countdownComplete={()=>{setCounted(true)}} /> seconds
                </p>
            </>
          }
        </>}
      </div>

      <p className="mb-3 mt-5 text-sm text-opacity-70 block">Already have an account? <Link to="/" className="text-accent">Click here to log in</Link></p>

      <div className='mt-5'>
        <FormButton buttonAction={()=>{}} buttonLabel={`Continue`} processing={false} />
      </div>

    </div>
  )
}

export default Signup
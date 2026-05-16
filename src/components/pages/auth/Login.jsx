import React, { useState } from 'react'
import Logo from '../../elements/Logo'
import FormButton from '../../elements/form/FormButton'
import TextField from '../../elements/form/TextField'
import PasswordField from '../../elements/form/PasswordField'
import { Link } from 'react-router-dom'
import UnderlineVector from '../../../assets/img/underline.svg'

const Login = () => {
  const [validationErrors, setValidationErrors] = useState({})
  const [email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  return (
    <div className='w-full'>
      <Logo />

      <div className='mt-20'>
        <h3 className="text-[24px] text-at-black font-medium dark:text-at-white tracking-tighter font-space-grotesk text-left mx-auto">Welcome</h3>
        <p className="text-left mt-3 text-at-black text-sm dark:text-at-white">Please provide your email address and password to proceed to your dashboard</p>
        
        <div className='mt-4'>
          <TextField 
            inputLabel="Email address" 
            fieldId="username" 
            inputType="text" 
            preloadValue={''}
            inputPlaceholder={'Your registered email address'}
            hasError={validationErrors && validationErrors.email} 
            returnFieldValue={(value)=>{setEmail(value)}}
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
            returnFieldValue={(value)=>{setPassword(value)}}
          />
        </div>
      </div>

      <p className="my-3 text-sm text-opacity-70 block text-right">Forgot your password? <Link to="/password-reset" className="text-accent">Click here to reset it</Link></p>

      <div className='mt-5'>
        <FormButton buttonAction={()=>{}} buttonLabel={`Login to your account`} processing={false} />
      </div>

      <div className='w-full text-center mt-8'>
        <p className="my-3 text-sm text-opacity-70 block text-center text-gray-400">Don't have an account? <Link to="/signup" className="text-accent relative">Sign up here <img src={UnderlineVector} alt='' className='absolute -bottom-5 right-0' /></Link></p>
      </div>

    </div>
  )
}

export default Login
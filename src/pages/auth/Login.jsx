import React, { useState } from 'react'
import Logo from '../../components/elements/Logo'
import FormButton from '../../components/elements/form/FormButton'
import TextField from '../../components/elements/form/TextField'
import PasswordField from '../../components/elements/form/PasswordField'
import { Link, useNavigate } from 'react-router-dom'
import UnderlineVector from '../../assets/img/underline.svg'
import axios from 'axios';
import { ERROR } from '../../store/types';
import { baseUrl, validateEmail } from '../../utils/utils';

const Login = () => {
  const [validationErrors, setValidationErrors] = useState({})
  const [processing, setProcessing] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const validateForm = () => {
    let errors = {}

    if(!email || email === '') {
      errors.email = "Email required"
    }

    if(email && !validateEmail(email)) {
      errors.email = "Invalid email"
    }

    if(!password || password === '') {
      errors.password = "Password required"
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const logIn = async () => {
    if(!validateForm()) {
      return
    }
    try {
      const payload = {
        email,
        password
      }
      setProcessing(true)
      const response = await axios.post(`${baseUrl}/auth/sessions`, payload)
      // navigate('/user')
      fetchUserDetails(response.data.data.accessToken).then((userDetails) => {
        localStorage.setItem('user', JSON.stringify(userDetails))
        localStorage.setItem('token', response.data.data.accessToken)
        if(userDetails.userType === 'producer') {
          navigate('/producer')
        }
        if(userDetails.userType === 'exporter') {
          navigate('/exporter')
        }
      })
    } catch (error) {
      console.log('log in error: ', error)
      dispatch({
        type: ERROR,
        error 
      })
      setProcessing(false)
    }
  }

  const fetchUserDetails = async (token) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`
      }
      const response = await axios.get(`${baseUrl}/user/profile`, {headers})
      return response.data.data
    } catch (error) {
      console.log('fetch user details error: ', error)
      dispatch({
        type: ERROR,
        error 
      })
      setProcessing(false)
    }
  }
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
        <FormButton buttonAction={logIn} buttonLabel={`Login to your account`} processing={processing} />
      </div>

      <div className='w-full text-center mt-8'>
        <p className="my-3 text-sm text-opacity-70 block text-center text-gray-400">Don't have an account? <Link to="/signup" className="text-accent relative">Sign up here <img src={UnderlineVector} alt='' className='absolute -bottom-5 right-0' /></Link></p>
      </div>

    </div>
  )
}

export default Login
import React from 'react'
// import InlinePreloader from '../InlinePreloader'

const FormButton = ({buttonLabel, buttonAction, processing}) => {
  return (
    <button type='submit' disabled={processing} onClick={()=>{buttonAction()}} className='w-full p-4 rounded bg-accent shadow-xl shadow-accent/10 text-white dark:text-at-black border-2 border-at-white dark:border-at-black text-md font-semibold transition duration-200 hover:bg-at-black dark:hover:bg-at-dark-gray dark:hover:text-black flex items-center justify-center cursor-pointer active:shadow-non'>{processing ? <div className='btn-loader' /> : buttonLabel }</button>
  )
}

export default FormButton
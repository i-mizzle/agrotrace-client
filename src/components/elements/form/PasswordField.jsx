import React, { useState } from 'react'
import EyeIcon from '../icons/EyeIcon'
import EyeOffIcon from '../icons/EyeOffIcon'

const PasswordField = ({
    requiredField,
    inputLabel, 
    fieldId, 
    hasError, 
    returnFieldValue, 
    preloadValue, 
    disabled, 
    inputPlaceholder,
    maxLength,
    showPasswordMeter
}) => {
    const [ fieldValue, setFieldValue ] = useState(preloadValue)
    const [ hiddenInput, setHiddenInput ] = useState(true)
    // const id = generateCode(12)

    // const [fieldId, setFieldId] = useState(id)

    const toggleHiddenInput = (e) => {
        e.preventDefault()
        setHiddenInput(!hiddenInput)
    }

    const setValue = (value) => {
        setFieldValue(value)
        returnFieldValue(value)
    }

    return (
        <div className='relative'
        >
            <label 
                className={`text-sm lg:text-md cursor-text z-10 relative py-1 transition mb-2 block duration-200  
                ${hasError ? 'text-red-600' : 'text-gray-500 dark:text-gray-300'}`}
            >
             {requiredField && requiredField === true && <span className='text-red-600'>*</span>}   {inputLabel}
            </label>

            <span className={`absolute z-40 cursor-pointer pt-2 top-11 right-4`} onClick={(e)=>{toggleHiddenInput(e)}}>
                {hiddenInput ?
                <EyeIcon className={`w-5 h-5 text-gray-600 dark:text-gray-300`} />
                :
                <EyeOffIcon className={`w-5 h-5 text-gray-600 dark:text-gray-300`} />}
            </span>

            <input 
                id={fieldId} 
                type={hiddenInput ? 'password' : "text"} 
                maxLength={maxLength}
                className={`rounded py-4 px-4 text-sm block w-full focus:border-gray-800 focus:outline-none hover:border-gray-200 dark:hover:border-at-dark-gray  border bg-at-black/5 dark:bg-at-dark-gray/5 transition duration-200 focus:bg-white dark:focus:bg-at-black/60 font-outfit placeholder:font-outfit  ${hasError ? 'border-red-600' : 'border-transparent'}`} 
                placeholder={inputPlaceholder}
                onChange={(e)=>{setValue(e.target.value)}}
                value={fieldValue}
                disabled={disabled}
            />

            {showPasswordMeter === true && <PasswordMeter password={fieldValue} />}


            

        </div>
    )
}
export default PasswordField
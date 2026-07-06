import React, { useState } from 'react'

const TextField = ({
    requiredField,
    inputLabel, 
    inputPlaceholder,
    fieldId, 
    hasError, 
    returnFieldValue, 
    preloadValue, 
    disabled, 
    maxLength,
}) => {
    const [ fieldValue, setFieldValue ] = useState(preloadValue || '')

    const setValue = (value) => {
        setFieldValue(value)
        returnFieldValue(value)
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <label 
                    className={`text-sm lg:text-md cursor-text z-10 relative py-1 transition mb-1 block duration-200  
                    ${hasError ? 'text-red-400' : 'text-gray-500 dark:text-gray-300'}`}
                >
                    {inputLabel} {requiredField && requiredField === true && <span className='text-red-400'>*</span>}
                </label>
                <label 
                    className={`text-xs text-red-400`}
                >
                    {hasError}
                </label>
            </div>

            <input 
                id={fieldId} 
                type="text"
                maxLength={maxLength}
                className={`rounded py-4 px-4 text-sm block w-full focus:border-gray-800 focus:outline-none hover:border-gray-200 dark:hover:border-at-dark-gray border bg-at-black/5 dark:bg-at-dark-gray/5 transition duration-200 focus:bg-white dark:focus:bg-at-black/60 font-outfit placeholder:text-slate-400 placeholder:font-outfit  ${hasError ? 'border-red-400' : 'border-transparent'}`}
                onChange={(e)=>{setValue(e.target.value)}}
                value={fieldValue}
                disabled={disabled}
                placeholder={inputPlaceholder}
            />

            {maxLength && maxLength > 0 && <p className={`mt-1 text-[11px] ${fieldValue.length > maxLength ? 'text-red-600 dark:text-red-400' : 'text-gray-400 dark:text-slate-300'}`}>Max {maxLength} Characters</p>}

        </div>
    )
}

export default TextField
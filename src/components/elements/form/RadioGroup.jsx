import React, { useState } from 'react'

const RadioGroup = ({items, returnSelected, hasError, inputLabel, requiredField, inline, preSelectedIndex}) => {

    const [selectedOption, setSelectedOption] = useState(preSelectedIndex)

    const selectOption = (index, item) => {
        setSelectedOption(index)
        returnSelected(item)
    }

    return (
        <div className='max-w-full'>
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
            <div className={`w-full ${inline && 'flex gap-x-5 gap-y-1 items-center'}`}>
                {items.map((item, itemIndex)=>(
                <div onClick={()=>{selectOption(itemIndex, item)}} key={itemIndex} className={`w-full flex items-start border gap-x-2 rounded-lg my-2 p-4 bg-at-black/5 dark:bg-at-dark-gray/5 cursor-pointer ${selectedOption === itemIndex ? 'bg-opacity-20 border-at-dark-gray/30 dark:border-accent/20' : 'border-transparent'}`}>
                    <div className='w-6.25'>
                        <button 
                                className={`flex items-center mt-1 justify-center rounded-full w-5 h-5 border-2 transition duration-200 text-white bg-white dark:bg-at-dark-gray/40
                                ${hasError ? 'border-red-400' : selectedOption === itemIndex ? 'dark:border-accent border-at-dark-gray' : 'border-at-dark-gray'}`
                            } 
                            onClick={()=>{selectOption(itemIndex, item)}}
                        >
                            {selectedOption === itemIndex && <div className='w-2 h-2 transition duration-200 rounded-full bg-accent '></div>}
                        </button>
                    </div>
                    
                    <div className={`text-sm cursor-pointer text-wrap text-black dark:text-at-white`}>
                        <p className={`${!item.description && 'mt-0.75'}`}>{item.label}</p>
                        {item.description && item.description !== '' && !inline && <p className='text-xs mt-1.25 text-wrap'>{item.description}</p>}
                    </div>
                </div>
                ))
                }
            </div>
        </div>
    )
}

export default RadioGroup
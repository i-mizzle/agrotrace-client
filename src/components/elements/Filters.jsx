import React, { useState } from 'react'
import CloseIcon from './icons/CloseIcon'

import PlusIcon from './icons/PlusIcon'
import FunnelIcon from './icons/FunnelIcon'
import { debounce } from '../../utils'

const Filters = ({filterOptions, returnSelected, resetFilters, checkConditions, performFilterSearch}) => {
    
    // const filterOptions = [
    //     {
    //         name: 'marketplace',
    //         linkType: 'text',
    //         link: 'is',
    //         type: 'binary',
    //         options: ['Primary', 'Secondary'],
    //         value: "",
    //         displayValue: ""
    //     },
    //     {
    //         name: 'marketplace',
    //         linkType: 'text',
    //         link: 'is',
    //         type: 'binary',
    //         options: ['Primary', 'Secondary'],
    //         value: "",
    //         displayValue: ""
    //     },
    //     {
    //         name: 'offering type',
    //         linkType: 'text',
    //         link: 'is',
    //         type: 'binary',
    //         options: ['SAFE', 'Token', 'Both'],
    //         value: "",
    //         displayValue: ""
    //     },
    //     {
    //         name: 'target raised',
    //         linkType: 'option',
    //         link: ['is greater than', 'is less than'],
    //         type: 'number',
    //         value: "",
    //         displayValue: ""
    //     },
    //     {
    //         name: 'price',
    //         linkType: 'option',
    //         link: ['is greater than', 'is less than'],
    //         type: 'number',
    //         value: "",
    //         displayValue: ""
    //     }
    // ]

    const [ activeFilters, setActiveFilters ] = useState([])

    const [ selectingFilters, setSelectingFilters ] = useState(false)
    
    const [ activeFilterOption, setActiveFilterOption ] = useState(null)

    const [ filterLinkOption, setFilterLinkOption ] = useState(null)
    const [ filterValue, setFilterValue ] = useState(null)

    // const FilterDisplay = ({filterName, filterLink, filterValue}) => {
    //     return (
    //         <p className='text-sm'> <span className='font-medium'>{filterName}</span> {filterLink} <span className='font-medium'>{filterValue}</span> </p>
    //     )
    // }

    const addFilter = (index) => {
        if(!filterValue || filterValue === '') {
            return
        }

        if(filterOptions[index].linkType === 'option' && (!filterLinkOption || filterLinkOption === '')) {
            return
        }

        const tempActiveFilters = JSON.parse(JSON.stringify(activeFilters))

        let filterLink = 'is'
        if(filterOptions[index].linkType === 'option') {
            filterLink = filterLinkOption
        }
        
        // const filterText = 
        const currentFilter = JSON.parse(JSON.stringify(filterOptions[index]))

        currentFilter.displayValue = `${filterOptions[index].name} ${filterLink} ${filterValue}`

        tempActiveFilters.push(currentFilter)
        setActiveFilters(tempActiveFilters)
        setFilterLinkOption(null)
        setActiveFilterOption(null)
        setFilterValue(null)
        setSelectingFilters(false)
    }

    const removeFilter = (filter) => {
        // let tempActiveFilters = JSON.parse(JSON.stringify(activeFilters))
        const newFilters = activeFilters.filter ((item) => {
            return filter !== item 
        })
        setActiveFilters(newFilters)
    }

    const performSearch = debounce((term, optionIndex, option) => {
        console.log(option)
        performFilterSearch()
    })

    return (
        <div className="flex flex-row gap-2 flex-wrap">
            <span className={`py-2 px-3 rounded-md text-gray-600 font-outfit text-sm flex items-center justify-center gap-x-1 ${activeFilters && activeFilters.length > 0 ? 'bg-vcm-light-purple bg-opacity-20' : 'bg-gray-100'}`}> 
                <FunnelIcon className="w-4 h-4 inline" /> Filters
            </span>

            { activeFilters.map((filter, filterIndex) => (
                <span className='py-2 px-3 rounded-md bg-gray-100 text-gray-600 flex gap-x-3 items-center text-sm font-outfit' key={filterIndex}> 
                    {filter.displayValue}
                    <button onClick={()=>{removeFilter(filter)}}>
                        <CloseIcon className="w-5 h-5" />
                    </button>
                </span>
            ))}

            <div className='relative'>
                <button className='p-3 rounded-md bg-gray-100 text-gray-600 transition duration-200 hover:bg-gray-200' onClick={()=>{setSelectingFilters(!selectingFilters)}}>
                    <PlusIcon className={`w-5 h-5 transition duration-200 ${selectingFilters && 'rotate-45'}`} />
                </button>
                <div className={`z-50 bg-white rounded-md shadow-lg p-2 w-44 absolute top-0 left-14 ${ selectingFilters ? 'inline-block' : 'hidden' }`}>
                    <div className='relative'>
                        {filterOptions.map(( option, optionIndex ) => (
                            optionIndex !== 0 &&
                            <button key={optionIndex} className={`capitalize text-sm text-left my-1 p-2 hover:bg-gray-100 rounded-sm transition duration-200 text-gray-600 w-full block ${optionIndex === activeFilterOption ? 'bg-gray-100' : ''}`} onClick={()=>{setActiveFilterOption(optionIndex)}}>
                                {option.name}
                            </button>
                        ))}
                        {activeFilterOption && activeFilterOption !== 0 && 
                            <div className='absolute top-0 left-44 w-44 rounded-sm p-5 bg-white shadow-lg'>
                                <p className="text-sm font-outfit text-gray-600 mb-2 rounded-sm capitalize">{filterOptions[activeFilterOption].name}</p>
                                {filterOptions[activeFilterOption].linkType === 'text' && <p className="text-sm text-gray-600">{filterOptions[activeFilterOption].link}</p>}
                                {filterOptions[activeFilterOption].linkType === 'option' && 
                                    <select className="text-sm text-gray-600 p-1 border rounded-sm w-full my-2 outline-none" onChange={(e)=>{setFilterLinkOption(e.target.value)}}>
                                        <option value="">-- select one --</option>
                                        {filterOptions[activeFilterOption].link.map((linkOption, linkOptionIndex)=>(
                                            <option key={linkOptionIndex} value={linkOption}>{linkOption}</option>
                                        ))}
                                    </select>
                                }
                                {filterOptions[activeFilterOption].type === 'binary' && 
                                    <select className="text-sm text-gray-600 p-1 border rounded-sm w-full my-2 outline-none" onChange={(e)=>{setFilterValue(e.target.value)}}>
                                        <option value="">-- select one --</option>
                                        {filterOptions[activeFilterOption].options.map((option, optionIndex)=>(
                                            <option key={optionIndex} value={option}>{option}</option>
                                        ))}
                                    </select>
                                }

                                {filterOptions[activeFilterOption].type === 'number' && 
                                    <input placeholder='value' type='number' className="text-sm text-gray-600 p-1 border rounded-sm w-full my-2 outline-none"  onChange={(e)=>{setFilterValue(e.target.value)}} />
                                }

                                {filterOptions[activeFilterOption].type === 'free-text' && 
                                    <input placeholder='value' type="text" className="text-sm text-gray-600 p-1 border rounded-sm w-full my-2 outline-none"  onChange={(e)=>{setFilterValue(e.target.value)}} />
                                }

                                {filterOptions[activeFilterOption].type === 'search' && 
                                    <input placeholder='search' onChange={(e)=>{performSearch(e.target.value)}} type="text" className="text-sm text-gray-600 p-1 border rounded-sm w-full my-2 outline-none" />
                                }

                                <button className='w-full p-1 rounded-sm text-white text-sm bg-gray-600 my-3 transition duration-200 hover:bg-gray-800' onClick={()=>{addFilter(activeFilterOption)}}>Add Filter</button>
                            </div>
                        }
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Filters
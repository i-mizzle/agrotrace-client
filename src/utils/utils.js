import countryStates  from '../assets/static/country-states.json'
import { StatesLgas } from '../assets/static/stateslgas';

export const baseUrl = import.meta.env.VITE_API_URL;

export const accountTypes = [
    {
        label: 'Producer',
        value:'producer',
        description: 'You own a farm that produces crops, livestock, or both, and you need this account to record farm activities.'
    },
    // {
    //     label: 'Regulator',
    //     value:'regulator',
    //     description: 'You work for an agricultural regulatory agency and use this account to carry out regulatory duties.'
    // },
    // {
    //     label: 'Inspector',
    //     value:'inspector',
    //     description: 'You work for an inspection agency and use this account to carry out inspections.'
    // },
    {
        label: 'Exporter',
        value:'exporter',
        description: 'You export produce and need to manage traceability, compliance, inspections, and export shipments.'

    },
]

export const producerTypes = [
    {
        label: 'Farmer',
        value: 'farmer',
        description:
        'You cultivate crops, rear livestock, or manage mixed farming operations.'
    },
    {
        label: 'Rancher',
        value: 'rancher',
        description:
        'You manage livestock operations such as cattle, goats, sheep, poultry, or other animal production systems.'
    },
    {
        label: 'Co-operative',
        value: 'cooperative',
        description:
        'You represent a farmers\' cooperative, association, or aggregation group that manages multiple producers, batches, or shared agricultural operations.'
    },
    {
        label: 'Processor',
        value: 'processor',
        description:
        'You transform raw agricultural produce into processed or packaged products.'
    }
]

export const inspectorTypes = [
    {
        label: 'Veterinary Inspector',
        value: 'veterinary-inspector',
    },
    {
        label: 'Food Safety Inspector',
        value: 'food-safety-inspector',
    },
    {
        label: 'Export Compliance Officer',
        value: 'export-compliance-officer',
    },
    {
        label: 'Lab Inspector',
        value: 'lab-inspector',
    },
    {
        label: 'Quality Grader',
        value: 'quality-grader',
    },
    {
        label: 'Certification Agent',
        value: 'certification-agent',
    },
]

export const inspectorOrganizationTypes = [
    {
        label: 'Government',
        value: 'government',
    },
    {
        label: 'Private Lab',
        value: 'private-lab',
    },
    {
        label: 'Certification Body',
        value: 'certification-body',
    },
    {
        label: 'Export Authority',
        value: 'export-authority',
    },
    {
        label: 'Independent',
        value: 'independent',
    },
]

export const exportCommodities = [ "sesame", "cocoa", "cashew", "maize", "soybean", "ginger", "hibiscus", "shea_butter", "livestock", "poultry" ]

export const convertCamelCase = (camelCaseText) => {
    const text = camelCaseText;
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

    return finalResult
}

export const tableHeadersFields = (sampleObject, sortableColumns) => {
    if(!sampleObject) {
        return []
    }
    const headers = []
    const fields = []
    Object.keys(sampleObject).forEach((key, index)=>{
        let columnDataType = 'text'
        let forPopover = false
        let columnDisplayName = (convertCamelCase(key)).replace('_', ' ')
        let sortable = false
        let column = key

        // if(column === 'name' || column === 'status' || column === 'custodian') {
        //     sortable = true
        // }

        if(sortableColumns && sortableColumns.includes(column)) {
            sortable = true
        }

        headers.push({
            column,
            columnDisplayName,
            data: sampleObject[key],
            sortable,
            forPopover,
            columnDataType
        })

        let fieldSelected = true

        if(index > 10) {
            fieldSelected = false
        }

        fields.push({
            name: columnDisplayName,
            selected: fieldSelected
        })
    });
    return {headers, fields}
}

export const isValidObject = (obj) => {
    return obj && obj !== 'null' && obj !== 'undefined';
}

export const isValidUrl = urlString=> {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

export const slugify = (string) => {
    if (!string || string === '' ) {
        return ""
    }
    const updated = string.toLowerCase()
    const slugified = updated.split(' ').join('-')

    return slugified
}

export const unSlugify = (string) => {
    if(!string || string === '') {
        return
    }
    return string.replace(/[_-]/g, " "); 
    // return string.replace(/[^0-9_-]/g, ' ')
}

export const formatPhone = (phone) => {
    let formatted = phone
    if (!phone || phone === '') {
        return ""
    }

    if (phone.charAt(0) === '0') {
        formatted = '+234' + phone.substring(1)
    } 

    if (phone.charAt(0) === '8' || phone.charAt(0) === '7' || phone.charAt(0) === '9') {
        formatted = '+234' + phone
    } 

    return formatted
}

export const format12hrTime = (date) =>  {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime.toUpperCase();
}

export const transactionTimeStamp = (rawTimeStamp) => {
    const today = new Date()
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let formattedDate = new Date(rawTimeStamp).toDateString()
    // let formattedTime = rawTimeStamp.toTimeS
    if(today.toDateString() === new Date(rawTimeStamp).toDateString()) {
        formattedDate = 'Today'
    }

    if (yesterday.toDateString() === new Date(rawTimeStamp).toDateString()) {
        formattedDate = 'Yesterday'
    }

    return {
        date: formattedDate,
        time: format12hrTime(new Date(rawTimeStamp))
    }
}

export const authHeader = () => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      return { Authorization: 'Bearer ' + authToken };
    } else {
      return {};
    }
}

export const applicationsDefaultDisplay = () => {
    const display = localStorage.getItem('applicationsDefaultDisplay');
    if (display) {
      return display;
    } else {
      return null;
    }
}

export const studentsDefaultDisplay = () => {
    const display = localStorage.getItem('studentsDefaultDisplay');
    if (display) {
      return display;
    } else {
      return null;
    }
}

export const staffDefaultDisplay = () => {
    const display = localStorage.getItem('staffDefaultDisplay');
    if (display) {
      return display;
    } else {
      return null;
    }
}

export const defaultSidebarState = () => {
    const display = localStorage.getItem('defaultSidebarState');
    if (display) {
      return display;
    } else {
      return null;
    }
}

export const mfaSkipped = () => {
    const skipped = JSON.parse(localStorage.getItem('mfaSetupSkipped'));
    if (skipped && skipped === true) {
        return true
    } else {
        return false
    }
}

export const userPermissions = () => {
    const userPermissions = JSON.parse(localStorage.getItem('userPermissions'));
    return userPermissions
}

export const organizationDetails = () => {
    const organization = JSON.parse(localStorage.getItem('organizationDetails'));
    return organization
}

export const userDetails = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log('---->', user)
    return user
}

export const parseFilters = (filtersArray, action,  object) => {
    // console.log('--> ', filtersArray)

    if(!filtersArray || filtersArray.length === 0) {
        return null
    }

    const cleanedArray = filtersArray.filter((item) => { 
        return item.term !== ''
    })

    let filtersString = cleanedArray.map((filterObject) => {
        let string = 'or='
        if(action && action === 'filter') {
            string = 'and='
        }
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(filterObject)) {
            string += `${value}||`
        }
        return string.slice(0, -2)
    })

    if (filtersString.length > 0) {
        if(action === 'search' && object && (object === 'CARDS')) {
            filtersString.pop()
            return filtersString.join('&').toString() + '&and=status||ne||RETIRED'
        }
        if(action === 'search' && object && object === 'WALLETS') {
            filtersString.pop()
            return filtersString.join('&').toString() + '&and=status||ne||RETIRED'
        }
        return filtersString.join('&').toString()
    } else {
        return ''
    }

} 

export const daysOfWeek = [
    {
        label: "Monday",
        value: 1
    },
    {
        label: "Tuesday",
        value: 2
    },
    {
        label: "Wednesday",
        value: 3
    },
    {
        label: "Thursday",
        value: 4
    },
    {
        label: "Friday",
        value: 5
    },
    {
        label: "Saturday",
        value: 6
    },
    {
        label: "Sunday",
        value: 7
    },
]

export const selectedColorScheme = (selectedTags) => {
    if(!selectedTags || selectedTags.length === 0) {
        return null
    }
    const colorSelected = selectedTags.find((tag)=>{
        return tag.includes('ALW_THEME:')
    })

    return colorSelected
}


export const getPreselectedIndex = (value, optionsArray, valueLabel) =>{
    let preSelected = null 

    optionsArray.map((option, optionIndex) => {
        if(option[valueLabel] === value) {
            preSelected = optionIndex
        }
        return option
    })

    return preSelected
}

export const toTimeStamp = (date) => {
    const dateObj = new Date(date)
    const month = dateObj.getUTCMonth() + 1
    const day = dateObj.getUTCDate()
    const year = dateObj.getUTCFullYear()
    const time = dateObj.getUTCHours() + ':' + dateObj.getUTCMinutes() + ':' + dateObj.getUTCSeconds()
    const timeStamp = `${month}/${day}/${year} @ ${time}`
    return timeStamp
}

export const sortArrayByObjectKey = (array, key) => {
    if(!array || !key) {
        return
    }

    function SortArray(x, y){
        return x[key].localeCompare(y[key]);
    }
    var s = array.sort(SortArray);

    return s
}

const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
} 
  
export const formatDate = (date) => {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('-');
}

export const applySort = (sortObject) => {
    if(!sortObject) {
        return ''
    }
    let sortString = ''
    if (sortObject.sortBy && sortObject.sortBy !== '') {
        sortString = `sort=${sortObject.sortOrder === 'DESC' ? '-' : ''}${sortObject.sortBy}`
    }
    return sortString
}

export const validateEmail = (string) => {
    if(!string || string === '') return false
    let isValidEmail = false

    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(string.trim().match(emailFormat)) {
        isValidEmail = true
    }

    return isValidEmail
}

export const validatePhoneNumber = (phone) => {
    let isValidPhone = true

    if(phone.substring(0,4) === '+234' && (formatPhone(phone).length < 11 || formatPhone(phone).length > 14)) {
        isValidPhone = false
    }

    return isValidPhone
}

export const findItemKey = (array, searchKey, searchTerm, returnValue) => {
    if(!searchTerm || searchTerm === '' || !array) return
    const found = array.filter((found) => {
        return found[searchKey] === searchTerm
    }) 
    return found.length > 0 ? found[0][returnValue] : ''
}  


export const parseNigerianStates = () => {
    const statesArray = []

    for (const [key, value] of Object.entries(countryStates.NG.divisions)) {
        // console.log('state key => ', key, ' state value => ', value)
        statesArray.push({
            label: value,
            value: key
        })
    }

    return statesArray
}

export const parseNigerianCities = (state) => {
    console.log('state => ', state)
    const selectedState = StatesLgas.find((item)=>{
        return item.stateSlug === slugify(state)
    })
    console.log('selected state ==>', selectedState)
    return selectedState ? selectedState.lgas : []
}

export const debounce = (func, timeout = 1000) => {
    let timer;
    const debounced = function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null
            func.apply(this, args)
        }, timeout);
    };

    debounced.cancel = () => {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
    }

    return debounced
}

// export const parseCountryStates = () => {
//     // Nationalities
//     const countriesArray = []

//     for (const [key, value] of Object.entries(countryStates)) {
//         const countryFlag = Nationalities.find((country)=>{return country.name === value.name})
//         countriesArray.push({
//             label: value.name,
//             value: key,
//             image: countryFlag?.image
//         })
//     }

//     console.log('===> ',countriesArray)
//     return countriesArray
// }

export const calculateAge = (birthDateStr) => {
    const birthDate = new Date(birthDateStr);
  const today = new Date();
  
  let age = today.getUTCFullYear() - birthDate.getUTCFullYear();
  const monthDiff = today.getUTCMonth() - birthDate.getUTCMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getUTCDate() < birthDate.getUTCDate())) {
    age--;
  }
  
  return age;
}

export const sanitizePayload = (object) => {
    for (let k in object) {
        if (typeof object[k] === 'string') {
            object[k] = object[k].trim();
        }
        if (object[k] === '') {
            delete object[k];
        }
    }
    return object;
};
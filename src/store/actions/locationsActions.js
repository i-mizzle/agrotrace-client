import axios from "axios"
import { CREATE_LOCATION, CREATING_LOCATION, GET_LOCATIONS, GETTING_LOCATIONS, LOCATIONS_ERROR, SET_SUCCESS, UPDATE_LOCATION, UPDATING_LOCATION } from "../types";
import { authHeader, baseUrl } from "../../utils/utils";

export const createLocation = (locationPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_LOCATION,
            payload: true
        })
        const response = await axios.post(`${baseUrl}/locations`, locationPayload, { headers })
        
        dispatch({
            type: CREATE_LOCATION,
            payload: response.data.data
        })

        dispatch({
            type: SET_SUCCESS,
            payload: 'Location created successfully'
        })
        
    }
    catch(error){
        console.log(error)
        dispatch({
            type: LOCATIONS_ERROR,
            error
        })
    }
}

export const updateLocation = (locationId, locationPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_LOCATION,
            payload: true
        })
        const response = await axios.patch(`${baseUrl}/locations/${locationId}`, locationPayload, { headers })
        
        dispatch({
            type: UPDATE_LOCATION,
            payload: response.data.data
        })
        
    }
    catch(error){
        console.log(error)
        dispatch({
            type: LOCATIONS_ERROR,
            error
        })
    }
}

export const fetchLocations = (filterString, page, perPage) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/locations?expand=createdBy`
        if(filterString && filterString !== '') {
            url += `${url.includes('?') ? '&' : '?'}${filterString}`
        }

        if(page && page!=='') {
            url += `${url.includes('?') ? '&' : '?'}page=${page}`
        }

        if(perPage && perPage!=='') {
            url += `${url.includes('?') ? '&' : '?'}perPage=${perPage}`
        }

        dispatch( {
            type: GETTING_LOCATIONS,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: GET_LOCATIONS,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch( {
            type: LOCATIONS_ERROR,
            error
        })
    }
}

export const clearCreatedLocation = () => async (dispatch) => {    
    dispatch({
        type: CREATE_LOCATION,
        payload: null
    })
}

export const clearUpdatedLocation = () => async (dispatch) => {    
    dispatch({
        type: UPDATE_LOCATION,
        payload: null
    })
}

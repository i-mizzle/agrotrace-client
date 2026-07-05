import axios from "axios"
import { authHeader, baseUrl } from "../../utils/utils";
import { CREATE_EVENT, CREATING_EVENT, EVENTS_ERROR, GET_EVENTS, GETTING_EVENTS, SET_SUCCESS, UPDATE_EVENT, UPDATING_EVENT } from "../types";

export const createEvent = (eventPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_EVENT,
            payload: true
        })
        const response = await axios.post(`${baseUrl}/events`, eventPayload, { headers })
        
        dispatch({
            type: CREATE_EVENT,
            payload: response.data.data
        })

        dispatch({
            type: SET_SUCCESS,
            payload: 'Event created successfully'
        })
        
    }
    catch(error){
        console.log(error)
        dispatch({
            type: EVENTS_ERROR,
            error
        })
    }
}

export const updateEvent = (eventId, eventPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_EVENT,
            payload: true
        })
        const response = await axios.patch(`${baseUrl}/events/${eventId}`, eventPayload, { headers })
        
        dispatch({
            type: UPDATE_EVENT,
            payload: response.data.data
        })

        dispatch({
            type: SET_SUCCESS,
            payload: 'Event updated successfully'
        })
        
    }
    catch(error){
        console.log(error)
        dispatch({
            type: EVENTS_ERROR,
            error
        })
    }
}

export const fetchEvents = (filterString, page, perPage) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/events?expand=createdBy,asset,location`

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
            type: GETTING_EVENTS,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: GET_EVENTS,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch( {
            type: EVENTS_ERROR,
            error
        })
    }
}

export const clearCreatedEvent = () => async (dispatch) => {    
    dispatch({
        type: CREATE_EVENT,
        payload: null
    })
}

export const clearUpdatedEvent = () => async (dispatch) => {    
    dispatch({
        type: UPDATE_EVENT,
        payload: null
    })
}

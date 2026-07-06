import axios from "axios"
import { authHeader, baseUrl } from "../../utils"

import { GET_NOTIFICATIONS, GETTING_NOTIFICATIONS, NOTIFICATIONS_ERROR } from "../types"

export const fetchNotifications = (filterString, page, perPage) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/notifications?expand=actor`

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
            type: GETTING_NOTIFICATIONS,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: GET_NOTIFICATIONS,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch( {
            type: NOTIFICATIONS_ERROR,
            payload: error
        })
    }
}
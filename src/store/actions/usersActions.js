import axios from "axios"
import { authHeader, baseUrl } from "../../utils/utils";
import { GET_USERS, GETTING_USERS, USERS_ERROR } from "../types";


export const fetchUsers = (filterString, page, perPage) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/public/users?expand=organizationRoles.organization`
        
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
            type: GETTING_USERS,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: GET_USERS,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch( {
            type: USERS_ERROR,
            payload: error
        })
    }
}

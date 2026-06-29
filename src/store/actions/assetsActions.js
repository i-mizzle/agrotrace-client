import axios from "axios"
import { authHeader, baseUrl } from "../../utils/utils";
import { ASSETS_ERROR, CREATE_ASSET, CREATING_ASSET, GET_ASSETS, GETTING_ASSETS, SET_SUCCESS, UPDATE_ASSET, UPDATING_ASSET } from "../types";

export const createAsset = (assetPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_ASSET,
            payload: true
        })
        const response = await axios.post(`${baseUrl}/assets`, assetPayload, { headers })
        
        dispatch({
            type: CREATE_ASSET,
            payload: response.data.data
        })

        dispatch({
            type: SET_SUCCESS,
            payload: 'Asset created successfully'
        })
        
    }
    catch(error){
        console.log(error)
        dispatch({
            type: ASSETS_ERROR,
            error
        })
    }
}

export const updateAsset = (assetId, assetPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_ASSET,
            payload: true
        })
        const response = await axios.patch(`${baseUrl}/assets/${assetId}`, assetPayload, { headers })
        
        dispatch({
            type: UPDATE_ASSET,
            payload: response.data.data
        })

        dispatch({
            type: SET_SUCCESS,
            payload: 'Asset updated successfully'
        })
        
    }
    catch(error){
        console.log(error)
        dispatch({
            type: ASSETS_ERROR,
            error
        })
    }
}

export const fetchAssets = (filterString, page, perPage) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/assets?expand=createdBy,animal,animalGroup,crop,currentLocation`
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
            type: GETTING_ASSETS,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: GET_ASSETS,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch( {
            type: ASSETS_ERROR,
            error
        })
    }
}

export const clearCreatedAsset = () => async (dispatch) => {    
    dispatch({
        type: CREATE_ASSET,
        payload: null
    })
}

export const clearUpdatedAsset = () => async (dispatch) => {    
    dispatch({
        type: UPDATE_ASSET,
        payload: null
    })
}

import axios from "axios"
import { CREATE_PRODUCT, CREATING_PRODUCT, GET_PRODUCTS, GETTING_PRODUCTS, PRODUCTS_ERROR, SET_SUCCESS, UPDATE_PRODUCT, UPDATING_PRODUCT } from "../types";
import { authHeader, baseUrl } from "../../utils/utils";

export const createProduct = (productPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: CREATING_PRODUCT,
            payload: true
        })
        const response = await axios.post(`${baseUrl}/products`, productPayload, { headers })
        
        dispatch({
            type: CREATE_PRODUCT,
            payload: response.data.data
        })

        dispatch({
            type: SET_SUCCESS,
            payload: 'Product created successfully'
        })
        
    }
    catch(error){
        console.log(error)
        dispatch({
            type: PRODUCTS_ERROR,
            error
        })
    }
}

export const updateProduct = (productId, productPayload) => async (dispatch) => {    
    try{
        const headers = authHeader()

        dispatch({
            type: UPDATING_PRODUCT,
            payload: true
        })
        const response = await axios.patch(`${baseUrl}/products/${productId}`, productPayload, { headers })
        
        dispatch({
            type: UPDATE_PRODUCT,
            payload: response.data.data
        })
        
    }
    catch(error){
        console.log(error)
        dispatch({
            type: PRODUCTS_ERROR,
            error
        })
    }
}

export const fetchProducts = (filterString, page, perPage) => async (dispatch) => {    
    try{
        const headers = authHeader()

        let url = `${baseUrl}/products?expand=createdBy,sourceAsset,location,batch,`
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
            type: GETTING_PRODUCTS,
            payload: true
        })

        const response = await axios.get(url, { headers })

        dispatch({
            type: GET_PRODUCTS,
            payload: response.data.data
        })
        
    }
    catch(error){
        dispatch( {
            type: PRODUCTS_ERROR,
            error
        })
    }
}

export const clearCreatedProduct = () => async (dispatch) => {    
    dispatch({
        type: CREATE_PRODUCT,
        payload: null
    })
}

export const clearUpdatedProduct = () => async (dispatch) => {    
    dispatch({
        type: UPDATE_PRODUCT,
        payload: null
    })
}

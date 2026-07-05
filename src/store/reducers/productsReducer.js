import {
    GETTING_PRODUCTS,
    GET_PRODUCTS,
    CREATING_PRODUCT,
    CREATE_PRODUCT,
    UPDATING_PRODUCT,
    UPDATE_PRODUCT,
    PRODUCTS_ERROR
} from '../types';

const initialState = {
    products: [],
    loadingProducts: true,
    creatingProduct: false,
    createdProduct: null,
    updatingProduct: false,
    productsError: null,
    updatedProduct: null
}

export default function(state = initialState, action){

    switch(action.type){
        case GETTING_PRODUCTS:
        return {
            ...state,
            loadingProducts :action.payload,
        }
        case GET_PRODUCTS:
        return{
            ...state,
            loadingProducts:false,
            productsError:  null,
            products: action.payload,
        }
        case CREATING_PRODUCT:
        return {
            ...state,
            creatingProduct :action.payload,
        }
        case CREATE_PRODUCT:
        return{
            ...state,
            creatingProduct:false,
            productsError:  null,
            createdProduct: action.payload,
        }
        case UPDATING_PRODUCT:
        return {
            ...state,
            updatingProduct :action.payload,
        }
        case UPDATE_PRODUCT:
        return{
            ...state,
            updatingProduct:false,
            productsError:  null,
            updatedProduct: action.payload,
        }
        case PRODUCTS_ERROR:
        return{
            ...state,
            loadingProducts:false,
            creatingProduct:false,
            updatingProduct:false,
            productsError: action.payload 
        }
        default: return state
    }


}
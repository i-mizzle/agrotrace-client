import { ASSETS_ERROR, CREATE_ASSET, CREATING_ASSET, GET_ASSETS, GETTING_ASSETS, UPDATE_ASSET, UPDATING_ASSET } from "../types";

const initialState = {
    assets: [],
    loadingAssets: true,
    creatingAsset: false,
    createdAsset: null,
    updatingAsset: false,
    assetsError: null,
    updatedAsset: null
}

export default function(state = initialState, action){

    switch(action.type){
        case GETTING_ASSETS:
        return {
            ...state,
            loadingAssets :action.payload,
        }
        case GET_ASSETS:
        return{
            ...state,
            loadingAssets:false,
            assetsError:  null,
            assets: action.payload,
        }
        case CREATING_ASSET:
        return {
            ...state,
            creatingAsset :action.payload,
        }
        case CREATE_ASSET:
        return{
            ...state,
            creatingAsset:false,
            assetsError:  null,
            createdAsset: action.payload,
        }
        case UPDATING_ASSET:
        return {
            ...state,
            updatingAsset :action.payload,
        }
        case UPDATE_ASSET:
        return{
            ...state,
            updatingAsset:false,
            assetsError:  null,
            updatedAsset: action.payload,
        }
        case ASSETS_ERROR:
        return{
            ...state,
            loadingAssets:false,
            creatingAsset:false,
            updatingAsset:false,
            assetsError: action.payload 
        }
        default: return state
    }


}
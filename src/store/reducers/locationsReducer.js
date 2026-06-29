import { CREATE_LOCATION, CREATING_LOCATION, GET_LOCATIONS, GETTING_LOCATIONS, LOCATIONS_ERROR, UPDATE_LOCATION, UPDATING_LOCATION } from "../types";

const initialState = {
    locations: [],
    loadingLocations: true,
    creatingLocation: false,
    createdLocation: null,
    updatingLocation: false,
    locationsError: null,
    updatedLocation: null
}

export default function(state = initialState, action){

    switch(action.type){
        case GETTING_LOCATIONS:
        return {
            ...state,
            loadingLocations :action.payload,
        }
        case GET_LOCATIONS:
        return{
            ...state,
            loadingLocations:false,
            locationsError:  null,
            locations: action.payload,
        }
        case CREATING_LOCATION:
        return {
            ...state,
            creatingLocation :action.payload,
        }
        case CREATE_LOCATION:
        return{
            ...state,
            creatingLocation:false,
            locationsError:  null,
            createdLocation: action.payload,
        }
        case UPDATING_LOCATION:
        return {
            ...state,
            updatingLocation :action.payload,
        }
        case UPDATE_LOCATION:
        return{
            ...state,
            updatingLocation:false,
            locationsError:  null,
            updatedLocation: action.payload,
        }
        case LOCATIONS_ERROR:
        return{
            ...state,
            loadingLocations:false,
            creatingLocation:false,
            updatingLocation:false,
            locationsError: action.payload 
        }
        default: return state
    }


}
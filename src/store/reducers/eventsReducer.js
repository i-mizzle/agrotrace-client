import { CREATE_EVENT, CREATING_EVENT, EVENTS_ERROR, GET_EVENTS, GETTING_EVENTS, UPDATE_EVENT, UPDATING_EVENT } from "../types";

const initialState = {
    events: [],
    loadingEvents: true,
    creatingEvent: false,
    createdEvent: null,
    updatingEvent: false,
    eventsError: null,
    updatedEvent: null
}

export default function(state = initialState, action){

    switch(action.type){
        case GETTING_EVENTS:
        return {
            ...state,
            loadingEvents :action.payload,
        }
        case GET_EVENTS:
        return{
            ...state,
            loadingEvents:false,
            eventsError:  null,
            events: action.payload,
        }
        case CREATING_EVENT:
        return {
            ...state,
            creatingEvent :action.payload,
        }
        case CREATE_EVENT:
        return{
            ...state,
            creatingEvent:false,
            eventsError:  null,
            createdEvent: action.payload,
        }
        case UPDATING_EVENT:
        return {
            ...state,
            updatingEvent :action.payload,
        }
        case UPDATE_EVENT:
        return{
            ...state,
            updatingEvent:false,
            eventsError:  null,
            updatedEvent: action.payload,
        }
        case EVENTS_ERROR:
        return{
            ...state,
            loadingEvents:false,
            creatingEvent:false,
            updatingEvent:false,
            eventsError: action.payload 
        }
        default: return state
    }


}
import { GET_NOTIFICATIONS, GETTING_NOTIFICATIONS, NOTIFICATIONS_ERROR } from '../types';
const initialState = {
    notifications: [],
    loadingNotifications: true,
    notificationsError: null,
}

export default function(state = initialState, action){

    switch(action.type){
        case GETTING_NOTIFICATIONS:
        return {
            ...state,
            loadingNotifications: action.payload,
        }
        case GET_NOTIFICATIONS:
        return{
            ...state,
            loadingNotifications: false,
            notificationsError: null,
            notifications: action.payload,
        }
        case NOTIFICATIONS_ERROR:
        return{
            ...state,
            loadingNotifications: false,
            notificationsError: action.payload 
        }
        default: return state
    }

}
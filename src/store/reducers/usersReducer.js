import { GET_USERS, GETTING_USERS, USERS_ERROR } from "../types";

const initialState = {
    users: [],
    loadingUsers: true,
    usersError: null
}

export default function(state = initialState, action){

    switch(action.type){
        case GETTING_USERS:
        return {
            ...state,
            loadingUsers: action.payload,
        }
        case GET_USERS:
        return{
            ...state,
            loadingUsers: false,
            usersError: null,
            users: action.payload,
        }
        case USERS_ERROR:
        return{
            ...state,
            loadingUsers:false,
            usersError: action.payload 
        }
        default: return state
    }


}
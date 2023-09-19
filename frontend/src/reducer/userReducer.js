import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_REQUEST,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_DETAIL_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETION_REQUEST,
    USER_DELETION_SUCCESS,
    USER_DELETION_FAIL,
    USER_DELETION_RESET,
    USER_EDIT_REQUEST,
    USER_EDIT_SUCCESS,
    USER_EDIT_FAIL,
    USER_EDIT_RESET,
} from '../constants/userContants'

export const userLoginReducer = (state= {}, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading : true}
        
        case USER_LOGIN_SUCCESS:
            return {loading : false, userInfo: action.payload}

        case USER_LOGIN_FAIL:
            return {loading : false, error: action.payload}
        
        case USER_LOGOUT:
            return {loading : false}
        
        default:
            return state
    }
}

export const userRegisterReducer = (state= {}, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading : true}
        
        case USER_REGISTER_SUCCESS:
            return {loading : false, userInfo: action.payload}

        case USER_REGISTER_FAIL:
            return {loading : false, error: action.payload}
        
        case USER_LOGOUT:
            return {loading : false}
        
        default:
            return state
    }
}

export const userDetailReducer = (state= {user: {}}, action) => {
    switch(action.type){
        case USER_DETAIL_REQUEST:
            return {...state, loading : true}
        
        case USER_DETAIL_SUCCESS:
            return {loading : false, user: action.payload}

        case USER_DETAIL_FAIL:
            return {loading : false, error: action.payload}
        
        case USER_DETAIL_RESET:
            return {user: {}}
        
        default:
            return state
    }
}

export const userUpdateReducer = (state= {}, action) => {
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return {loading : true}
        
        case USER_UPDATE_SUCCESS:
            return {loading : false, success: true, userInfo: action.payload}

        case USER_UPDATE_FAIL:
            return {loading : false, error: action.payload}
        
        case USER_UPDATE_PROFILE_RESET:
            return {}
        
        default:
            return state
    }
}

export const userListReducer = (state= {loading : true}, action) => {
    switch(action.type){
        case USER_LIST_REQUEST:
            return {loading : true}
        
        case USER_LIST_SUCCESS:
            return {loading : false, users: action.payload}

        case USER_LIST_FAIL:
            return {loading : false, error: action.payload}
        
        case USER_LIST_RESET:
            return {}
        
        default:
            return state
    }
}

export const userDeletionReducer = (state= {}, action) => {
    switch(action.type){
        case USER_DELETION_REQUEST:
            return {loading : true}
        
        case USER_DELETION_SUCCESS:
            return {loading : false, success: true}

        case USER_DELETION_FAIL:
            return {loading : false, error: action.payload}
        
        case USER_DELETION_RESET:
            return {}

        default:
            return state
    }
}


export const userEditReducer = (state= {}, action) => {
    switch(action.type){
        case USER_EDIT_REQUEST:
            return {loading : true}
        
        case USER_EDIT_SUCCESS:
            return {loading : false, success: true, userInfo: action.payload}

        case USER_EDIT_FAIL:
            return {loading : false, error: action.payload}
        
        case USER_EDIT_RESET:
            return {}

        default:
            return state
    }
}

export default userLoginReducer
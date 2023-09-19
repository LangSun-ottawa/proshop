import axios from 'axios';
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

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';

const config = {
    headers : {
        'Content-type' : 'application/json'
    }
}

export const userLogin = (email, password) => (dispatch, getState) => {
    dispatch({ type: USER_LOGIN_REQUEST });

    axios
        .post(
            '/api/users/login/',
            {'username' : email, 'password' : password},
            config
        )
        .then((response) => {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: response.data
            });

            localStorage.setItem('user', JSON.stringify(response.data))
        })
        .catch((error) => {
            dispatch({
                type : USER_LOGIN_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};

export const userLogout = (id) => (dispatch) => {
    localStorage.removeItem('user')
    dispatch({
        type: USER_LOGOUT,
    })
    dispatch({
        type: USER_DETAIL_RESET,
    })
    dispatch({
        type: ORDER_LIST_MY_RESET,
    })
    dispatch({
        type: USER_LIST_RESET,
    })
}

export const userDetails = (id) => (dispatch, getState) => {
    dispatch({ type: USER_DETAIL_REQUEST });

    const {
        user : {userInfo}
    } = getState()

    const config_with_access_token = {
        headers : {
            'Content-type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
    axios
        .get(
            `/api/users/${id}`,
            config_with_access_token
        )
        .then((response) => {
            dispatch({
                type: USER_DETAIL_SUCCESS,
                payload: response.data
            });

        })
        .catch((error) => {
            dispatch({
                type : USER_DETAIL_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};

export const userList = () => (dispatch, getState) => {
    dispatch({ type: USER_LIST_REQUEST });

    const {
        user : {userInfo}
    } = getState()

    const config_with_access_token = {
        headers : {
            'Content-type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    axios
        .get(
            '/api/users/',
            config_with_access_token
        )
        .then((response) => {

            dispatch({
                type: USER_LIST_SUCCESS,
                payload: response.data
            });

        })
        .catch((error) => {
            dispatch({
                type : USER_LIST_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};

export const userDeletion = (userIdTodelete) => (dispatch, getState) => {
    dispatch({ type: USER_DELETION_REQUEST });

    const {
        user : {userInfo}
    } = getState()

    const config_with_access_token = {
        headers : {
            'Content-type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    axios
        .delete(
            `/api/users/delete/${userIdTodelete}/`,
            config_with_access_token
        )
        .then((response) => {

            dispatch({
                type: USER_DELETION_SUCCESS,
                payload: response.data
            });

        })
        .catch((error) => {
            dispatch({
                type : USER_DELETION_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};

export const userEdit = (id, user) => (dispatch, getState) => {
    dispatch({ type: USER_EDIT_REQUEST });

    const {
        user : {userInfo}
    } = getState()

    const config_with_access_token = {
        headers : {
            'Content-type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    axios
        .put(
            `/api/users/update/${id}/`,
            user,
            config_with_access_token
        )
        .then((response) => {

            dispatch({
                type: USER_EDIT_SUCCESS,
                payload: response.data
            });

            dispatch({
                type: USER_DETAIL_SUCCESS,
                payload: response.data
            });
            

        })
        .catch((error) => {
            dispatch({
                type : USER_EDIT_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};

export const userRegister = (name, email, password) => (dispatch, getState) => {
    dispatch({ type: USER_REGISTER_REQUEST });

    axios
        .post(
            '/api/users/register/',
            {'name' : name, 'email' : email, 'password' : password},
            config
        )
        .then((response) => {
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: response.data
            });

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: response.data
            });

            localStorage.setItem('user', JSON.stringify(response.data))
        })
        .catch((error) => {
            dispatch({
                type : USER_REGISTER_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};

export const userUpdate = (user) => (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
        user : {userInfo}
    } = getState()

    const config_with_access_token = {
        headers : {
            'Content-type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    axios
        .put(
            '/api/users/profile/update/',
            user,
            config_with_access_token
        )
        .then((response) => {

            dispatch({
                type: USER_UPDATE_SUCCESS,
                payload: response.data
            });

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: response.data
            });

            localStorage.setItem('user', JSON.stringify(response.data))
        })
        .catch((error) => {
            dispatch({
                type : USER_UPDATE_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};

//     dispatch({ type : PRODUCT_LIST_REQUEST})
//     axios.get('/api/products/')
//     .then(response => {
//       const data = response.data;
//       dispatch({
//         type: PRODUCT_LIST_SUCCESS,
//         payload: response.data
//     });
//     })
//     .catch(error => {
//       console.log(error)
//     });

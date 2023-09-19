import axios from 'axios';
import { 
        ORDER_CREATE_REQUEST, 
        ORDER_CREATE_FAIL, 
        ORDER_CREATE_SUCCESS, 
        ORDER_CREATE_RESET,
        ORDER_DETAIL_REQUEST,
        ORDER_DETAIL_SUCCESS,
        ORDER_DETAIL_FAIL,
        ORDER_PAY_REQUEST,
        ORDER_PAY_FAIL,
        ORDER_PAY_SUCCESS,
        ORDER_PAY_RESET,
        ORDER_LIST_MY_REQUEST,
        ORDER_LIST_MY_FAIL,
        ORDER_LIST_MY_RESET,
        ORDER_LIST_MY_SUCCESS,
        ORDER_LIST_REQUEST,
        ORDER_LIST_SUCCESS,
        ORDER_LIST_FAIL,
        ORDER_DELIVERED_REQUEST,
        ORDER_DELIVERED_SUCCESS,
        ORDER_DELIVERED_FAIL,
        ORDER_DELIVERED_RESET,
        } 
from "../constants/orderConstants";
import {CART_CLEAR_ITEMS} from "../constants/cartContants";

export const createOrder = (order) => (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST });

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
        .post(
            '/api/orders/add/',
            order,
            config_with_access_token
        )
        .then((response) => {

            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: response.data
            });

            dispatch({
                type: CART_CLEAR_ITEMS
            })

            localStorage.removeItem('cartItems')
        })
        .catch((error) => {
            dispatch({
                type : ORDER_CREATE_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};

export const payOrder = (id, paymentResult) => (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST });

    const {
        user : { userInfo }
    } = getState()

    const config_with_access_token = {
        headers : {
            'Content-type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    axios
        .put(
            `/api/orders/${id}/pay/`,
            paymentResult,
            config_with_access_token
        )
        .then((response) => {
            console.log(response.data)
            dispatch({
                type: ORDER_PAY_SUCCESS,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch({
                type : ORDER_PAY_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};

export const getOrderDetails = (id) => (dispatch, getState) => {
    dispatch({ type: ORDER_DETAIL_REQUEST });

    const {
        user : { userInfo }
    } = getState()

    const config_with_access_token = {
        headers : {
            'Content-type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    axios
        .get(
            `/api/orders/${id}/`,
            config_with_access_token
        )
        .then((response) => {

            dispatch({
                type: ORDER_DETAIL_SUCCESS,
                payload: response.data
            });
            console.log('order details')
            console.log(response.data)
            // localStorage.removeItem('cartItems')
        })
        .catch((error) => {
            dispatch({
                type : ORDER_DETAIL_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};

export const listMyOrders = () => (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    const {
        user : { userInfo }
    } = getState()

    const config_with_access_token = {
        headers : {
            'Content-type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    axios
        .get(
            `/api/orders/myorders/`,
            config_with_access_token
        )
        .then((response) => {

            dispatch({
                type: ORDER_LIST_MY_SUCCESS,
                payload: response.data
            });
            console.log('LIST ORDERS:')
            console.log(response.data)
            // localStorage.removeItem('cartItems')
        })
        .catch((error) => {
            dispatch({
                type : ORDER_LIST_MY_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};

export const listOrders = () => (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });

    const {
        user : { userInfo }
    } = getState()

    const config_with_access_token = {
        headers : {
            'Content-type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    axios
        .get(
            `/api/orders/`,
            config_with_access_token
        )
        .then((response) => {

            dispatch({
                type: ORDER_LIST_SUCCESS,
                payload: response.data
            });
            console.log('LIST ORDERS:')
            console.log(response.data)
        })
        .catch((error) => {
            dispatch({
                type : ORDER_LIST_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};


export const orderDelivered = (orderId) => (dispatch, getState) => {
    dispatch({ type: ORDER_DELIVERED_REQUEST });

    const {
        user : { userInfo }
    } = getState()

    const config_with_access_token = {
        headers : {
            'Content-type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    axios
        .put(
            `/api/orders/${orderId}/deliver/`,
            {},
            config_with_access_token
        )
        .then((response) => {

            dispatch({
                type: ORDER_DELIVERED_SUCCESS,
                payload: response.data
            });
            console.log('DELEIVERED ORDER:')
            console.log(response.data)
        })
        .catch((error) => {
            dispatch({
                type : ORDER_DELIVERED_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};
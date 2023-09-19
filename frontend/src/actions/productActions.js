import axios from 'axios';
import {PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST,
        PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_SUCCESS,
        PRODUCT_DELETE_REQUEST,
        PRODUCT_DELETE_SUCCESS,
        PRODUCT_DELETE_FAIL,
        PRODUCT_CREATE_REQUEST,
        PRODUCT_CREATE_SUCCESS,
        PRODUCT_CREATE_FAIL,
        PRODUCT_UPDATE_REQUEST,
        PRODUCT_UPDATE_SUCCESS,
        PRODUCT_UPDATE_FAIL,
        PRODUCT_UPDATE_RESET,
        PRODUCT_CREATE_REVIEW_REQUEST,
        PRODUCT_CREATE_REVIEW_SUCCESS,
        PRODUCT_CREATE_REVIEW_RESET,
        PRODUCT_CREATE_REVIEW_FAIL,
        PRODUCT_TOP_REQUEST,
        PRODUCT_TOP_SUCCESS,
        PRODUCT_TOP_FAIL,
    } from '../constants/productConstants'

export const listProducts = (keyword = '') => (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    axios
        .get(`/api/products/${keyword}`)
        .then((response) => {
            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch({
                type : PRODUCT_LIST_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};

export const listTopProducts = () => (dispatch) => {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    axios
        .get(`/api/products/top/`)
        .then((response) => {
            dispatch({
                type: PRODUCT_TOP_SUCCESS,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch({
                type : PRODUCT_TOP_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};

export const listProductDetails = (id) => (dispatch) => {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });

    axios
        .get(`/api/products/${id}`)
        .then((response) => {
            dispatch({
                type: PRODUCT_DETAIL_SUCCESS,
                payload: response.data
            });
        })
        .catch((error) => {
            dispatch({
                type : PRODUCT_DETAIL_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};


export const deleteProduct = (id) => (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

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
            `/api/products/delete/${id}`,
            config_with_access_token
            )
        .then((response) => {
            dispatch({
                type: PRODUCT_DELETE_SUCCESS,
            });
        })
        .catch((error) => {
            dispatch({
                type : PRODUCT_DELETE_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};

export const createProduct = () => (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

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
            '/api/products/create/',
            {},
            config_with_access_token
            )
        .then((response) => {
            dispatch({
                type: PRODUCT_CREATE_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            dispatch({
                type : PRODUCT_CREATE_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};

export const updateProduct = (id, product) => (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

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
            `/api/products/update/${id}/`,
            product,
            config_with_access_token
            )
        .then((response) => {
            dispatch({
                type: PRODUCT_UPDATE_SUCCESS,
                payload: response.data,
            });

            dispatch({
                type: PRODUCT_DETAIL_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            dispatch({
                type : PRODUCT_UPDATE_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};

export const createReviewInProduct = (productId, review) => (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

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
            `/api/products/${productId}/reviews/`,
            review,
            config_with_access_token
            )
        .then((response) => {
            dispatch({
                type: PRODUCT_CREATE_REVIEW_SUCCESS,
                payload: response.data,
            });
        })
        .catch((error) => {
            dispatch({
                type : PRODUCT_CREATE_REVIEW_FAIL,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail : error.message,
            })
        });
};
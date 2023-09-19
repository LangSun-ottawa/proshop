import axios from 'axios';
import { CART_ADD_ITEM, CART_PAYMENT_METHOD, CART_REMOVE_ITEM, CART_SAVING_SHIPPING } from '../constants/cartContants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
   const { data } = await axios.get(`/api/products/${id}`)

   dispatch({
       type: CART_ADD_ITEM,
       payload: {
           product : data._id,
           name: data.name,
           image: data.image,
           price: data.price,
           countInStock: data.countInStock,
           qty,
       }
   })

   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (productIdToDelete) => async (dispatch, getState) => {
 
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: {
            product : productIdToDelete,
        }
    })
 
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

 export const cartSavingShippingAction = (shippingInfo) => async (dispatch, getState) => {
 
    dispatch({
        type: CART_SAVING_SHIPPING,
        payload: {
            cartSavingShipping : shippingInfo,
        }
    })
 
    localStorage.setItem('cartSavingShipping', JSON.stringify(getState().cart.cartSavingShipping))
}

export const cartPaymentMethodAction = (paymentMethod) => async (dispatch, getState) => {
 
    dispatch({
        type: CART_PAYMENT_METHOD,
        payload: {
            cartPaymentMethod : paymentMethod,
        }
    })
 
    localStorage.setItem('cartPaymentMethod', JSON.stringify(getState().cart.cartPaymentMethod))
}
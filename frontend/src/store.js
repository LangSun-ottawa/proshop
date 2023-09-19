import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { productListReducer, productDetailReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewCreateReducer, productTopRatedReducer } from './reducer/productReducer'
import { cartReducer } from './reducer/cartReducer'
import { userDetailReducer, userLoginReducer, userRegisterReducer, userUpdateReducer, userListReducer, userDeletionReducer, userEditReducer } from './reducer/userReducer'
import { orderCreateReducer, orderDetailReducer, orderPayReducer, orderListMyReducer, orderListeducer, orderDeliveredReducer } from './reducer/orderReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({
   productList :  productListReducer,
   productDetails: productDetailReducer,
   productDelete: productDeleteReducer,
   productCreate: productCreateReducer,
   productUpdate: productUpdateReducer,
   productReviewCreate: productReviewCreateReducer,
   productTop: productTopRatedReducer,
   cart: cartReducer,
   user: userLoginReducer,
   userDetail: userDetailReducer,
   userRegister: userRegisterReducer,
   userUpdateProfile: userUpdateReducer,
   orderCreate: orderCreateReducer,
   orderDetails: orderDetailReducer,
   orderPay: orderPayReducer,
   orderDelivered: orderDeliveredReducer,
   orderListMy: orderListMyReducer,
   orderList: orderListeducer,
   userList: userListReducer,
   userDeletion: userDeletionReducer,
   updateUser: userEditReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const cartSavingShippingFromStorage = localStorage.getItem('cartSavingShipping') ? JSON.parse(localStorage.getItem('cartSavingShipping')) : {}
const cartPaymentMethodFromStorage = localStorage.getItem('cartPaymentMethod') ? JSON.parse(localStorage.getItem('cartPaymentMethod')) : ""
const userFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null


const initialState = {
    cart : {
        cartItems : cartItemsFromStorage,
        cartSavingShipping : cartSavingShippingFromStorage,
        cartPaymentMethod: cartPaymentMethodFromStorage,
    },
    user : {userInfo : userFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
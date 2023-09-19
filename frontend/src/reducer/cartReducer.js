import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVING_SHIPPING, CART_PAYMENT_METHOD, CART_CLEAR_ITEMS } from "../constants/cartContants";

export const cartReducer = (state = {cartItems : [], cartSavingShipping: {}, cartSavingMethod: ""}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            let existItem = state.cartItems.find(x => x.product == item.product)

            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            }else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        
        case CART_REMOVE_ITEM:
            const productIdToDelete = action.payload.product;
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.product !== productIdToDelete),
            }
        
        case CART_SAVING_SHIPPING:
            return {
                ...state,
                cartSavingShipping: action.payload.cartSavingShipping,
            }

        case CART_PAYMENT_METHOD:
            return {
                ...state,
                cartPaymentMethod: action.payload.cartPaymentMethod,
            }
        
        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }
            
        default:
            return state
    }
}

export default cartReducer
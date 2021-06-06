import { combineReducers } from 'redux'
import { productListReducer, productDetailsReducer,} from './productReducer'

import {cartReducer} from './cartReducer'

import {
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer,
    userUpdateReducer,
} from './userReducers'

import {
    orderCreateReducer
} from './orderReducers'

export default combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
})
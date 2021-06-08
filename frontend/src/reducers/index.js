import { combineReducers } from 'redux'
import { productListReducer, productDetailsReducer,} from './productReducer'

import {cartReducer} from './cartReducer'

import {
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer,
    userUpdateReducer,
    userListReducer,
    userDeleteReducer,
    userAdminUpdateReducer,
} from './userReducers'

import {
    orderCreateReducer,
    orderDetailReducer,
    orderPayReducer,
    orderListMyReducer,
} from './orderReducers'

export default combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    userList: userListReducer,
    userAdminUpdate: userAdminUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer
})
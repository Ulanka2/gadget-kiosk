import { combineReducers } from 'redux'
import { 
    productListReducer, 
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
} from './productReducer'

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
    orderListReducer,
    orderDeliveredReducer,
} from './orderReducers'

export default combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,

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
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDelivered: orderDeliveredReducer, 
})
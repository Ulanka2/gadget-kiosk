import axios from 'axios'

import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DELIVERED_FAIL,
} from '../constants/orderConstant'

import { 
    CART_CLEAR_ITEMS
} from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_CREATE_REQUEST})

        const token = getState().userLogin.userInfo.token

        const {data} = await axios.post('/api/orders/add/', order, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({type: ORDER_CREATE_SUCCESS, payload: data})
        dispatch({type: CART_CLEAR_ITEMS, payload:data})

        localStorage.removeItem('cartItems')

    }catch(error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_DETAILS_REQUEST})

        const token = getState().userLogin.userInfo.token

        const {data} = await axios.get(`/api/orders/${id}/`, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({type: ORDER_DETAILS_SUCCESS, payload:data})

    }catch(error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_PAY_REQUEST})

        const token = getState().userLogin.userInfo.token

        const {data} = await axios.put(`/api/orders/${id}/pay/`, paymentResult, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({type: ORDER_PAY_SUCCESS, payload: data})

    }catch(error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getMyListOrderDetails = () => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_LIST_MY_REQUEST})

        const token = getState().userLogin.userInfo.token

        const {data} = await axios.get('/api/orders/', {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({type: ORDER_LIST_MY_SUCCESS, payload:data})

    }catch(error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getListOrder = () => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_LIST_REQUEST})

        const token = getState().userLogin.userInfo.token

        const {data} = await axios.get('/api/orders/', {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({type: ORDER_LIST_SUCCESS, payload:data})

    }catch(error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deliveredOrder = (order) => async (dispatch, getState) => {
    try{
        dispatch({type: ORDER_DELIVERED_REQUEST})

        const token = getState().userLogin.userInfo.token

        const {data} = await axios.put(`/api/orders/${order._id}/delivered/`, {}, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({type: ORDER_DELIVERED_SUCCESS, payload: data})

    }catch(error) {
        dispatch({
            type: ORDER_DELIVERED_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
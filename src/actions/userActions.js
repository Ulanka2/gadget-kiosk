import axios from 'axios'

import { 
    USER_LOGIN_REQUEST, USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS, 
    
    USER_LOGOUT,

    USER_REGISTER_REQUEST, USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,

    USER_DETAILS_REQUEST, USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS, USER_DETAILS_RESET,

    USER_UPDATE_REQUEST, USER_UPDATE_FAIL,
    USER_UPDATE_SUCCESS,

    USER_LIST_REQUEST, USER_LIST_FAIL,
    USER_LIST_SUCCESS, USER_LIST_RESET,

    USER_DELETE_REQUEST, USER_DELETE_FAIL,
    USER_DELETE_SUCCESS,

    USER_ADMIN_UPDATE_REQUEST, USER_ADMIN_UPDATE_FAIL, 
    USER_ADMIN_UPDATE_SUCCESS,
} from '../constants/userConstants'

import {ORDER_LIST_MY_RESET} from '../constants/orderConstant'

export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const {data} = await axios.post('/api/users/login/', 
            { 'username': email, 'password': password}, 
            {headers: {
                'Content-type': 'application/json'
            }}
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("UserInfo", JSON.stringify(data))

    }catch(error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('UserInfo')
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_LIST_MY_RESET})
    dispatch({type: USER_LIST_RESET})
}

export const register = (name, email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const {data} = await axios.post('/api/users/register/', 
            {'name': name, 'email': email, 'password': password}, 
            {headers: {
                'Content-type': 'application/json'
            }}
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userRegisterInfo", JSON.stringify(data))

    }catch(error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const userDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const access = getState().userLogin.userInfo.token

        const {data} = await axios.get(`/api/users/${id}/`, {
            headers: {
                "Content-type": 'application/json',
                Authorization: `Bearer ${access}`,
            }
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const userUpdate = (user) => async (dispatch, getState) => {
    try{
        dispatch({type: USER_UPDATE_REQUEST})

        const token = getState().userLogin.userInfo.token

        const {data} = await axios.put(`/api/users/profile/update/`, user, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({type: USER_UPDATE_SUCCESS, payload: data})
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})

        localStorage.setItem("UserInfo", JSON.stringify(data))

    }catch(error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listUser = () => async (dispatch, getState) => {
    try{
        dispatch({type: USER_LIST_REQUEST})

        const token = getState().userLogin.userInfo.token

        const {data} = await axios.get(`/api/users/`, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({type: USER_LIST_SUCCESS, payload: data})

    }catch(error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try{
        dispatch({type: USER_DELETE_REQUEST})

        const token = getState().userLogin.userInfo.token

        const {data} = await axios.delete(`/api/users/delete/${id}/`, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({type: USER_DELETE_SUCCESS, payload: data})

    }catch(error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const adminUpdateUser = (datas) => async (dispatch, getState) => {
    try{
        dispatch({type: USER_ADMIN_UPDATE_REQUEST})

        const token = getState().userLogin.userInfo.token

        const {data} = await axios.put(`/api/users/update/${datas._id}/`, datas, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        dispatch({type: USER_ADMIN_UPDATE_SUCCESS})
        dispatch({type: USER_DETAILS_SUCCESS, payload:data})

    }catch(error) {
        dispatch({
            type: USER_ADMIN_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
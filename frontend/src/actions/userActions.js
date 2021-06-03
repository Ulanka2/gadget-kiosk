import axios from 'axios'

import { 
    USER_LOGIN_REQUEST, USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS, 
    
    USER_LOGOUT,

    USER_REGISTER_REQUEST, USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,

    USER_DETAILS_REQUEST, USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS,

    USER_UPDATE_REQUEST, USER_UPDATE_FAIL,
    USER_UPDATE_SUCCESS, USER_UPDATE_RESET,
} from '../constants/userConstants'

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
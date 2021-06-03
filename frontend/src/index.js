import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers'
import './bootstrap.min.css'
import App from './App';

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? 
      JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromLocalStorage = localStorage.getItem('UserInfo') ? 
      JSON.parse(localStorage.getItem('UserInfo')) : null

const initalState = {
  cart: {cartItems: cartItemsFromLocalStorage},
  userLogin: {userInfo: userInfoFromLocalStorage},
}

const store = createStore(reducers, initalState, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
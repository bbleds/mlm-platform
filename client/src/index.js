import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware } from 'redux'
// import configureStore from './store/configureStore'
// import App from './containers/App.js'
// import reducers from './reducers'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

// const store = configureStore({})

render(
  <Provider store="">
    <h1>My App</h1>
  </Provider>,
  document.querySelector('#root')
)
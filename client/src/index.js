import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware } from 'redux'
import configureStore from './store'
import App from './containers/App.js'
import 'materialize-css/dist/css/materialize.min.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = configureStore({})

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App/>
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('#root')
)
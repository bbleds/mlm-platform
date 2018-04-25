import React from 'react'
import { RaisedButton } from 'material-ui'
import { TOGGLE_NOTIFICATION } from '../constants'
const initialState = {
    open : false,
    message : 'Default',
    autoHideDuration : 3000
}  

export default (state = initialState, action) => {
    switch(action.type){
    case TOGGLE_NOTIFICATION:
        return {
            ...state,
            open : !state.open,
            message : action.payload.message || state.message,
            autoHideDuration : action.payload.autoHideDuration || state.autoHideDuration,
        }
    default:
        return state
    }
}  
import React from 'react'
import { RaisedButton } from 'material-ui'
import { TOGGLE_MODAL } from '../constants'
const initialState = {
    open : false,
    actions : (<RaisedButton label="Default"/>) ,
    title : 'Default',
    children : 'Default' 
}  

export default (state = initialState, action) => {
    switch(action.type){
    case TOGGLE_MODAL:
        return {
            ...state,
            open : !state.open,
            title : action.payload.title || state.title,
            actions : action.payload.actions || state.actions,
            children : action.payload.children || state.children
        }
    default:
        return state
    }
}  
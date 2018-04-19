import {
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE
   } from '../constants'
  
  const initialState = {
    users : null
  }
  
  export default (state = initialState, action) => {
    switch(action.type){
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          users: action.payload
        }
      case FETCH_USERS_FAILURE:
        return {
          ...state,
          users: false
        }
      default:
        return state
    }
}  
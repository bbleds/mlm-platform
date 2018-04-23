import {
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    SELECT_USERS_SUCCESS,
    SELECT_USERS_FAILURE
   } from '../constants'
  
  const initialState = {
    users : null,
    selectedUsers : []
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
        case SELECT_USERS_SUCCESS:
        return {
          ...state,
          selectedUsers : action.payload
        }
        case SELECT_USERS_FAILURE:
        return {
          ...state,
          selectedUsers : state.selectedUsers
        }
      default:
        return state
    }
}  
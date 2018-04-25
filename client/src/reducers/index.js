import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import usersReducer from './usersReducer'
import navReducer from './navReducer'
import modalReducer from './modalReducer'

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  users : usersReducer,
  navToggled : navReducer,
  modal : modalReducer
})
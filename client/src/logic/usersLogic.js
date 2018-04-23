import { createLogic } from 'redux-logic'
import axios from 'axios'
import { completeLogic } from '../util'
import {
  APP_ERROR,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SELECT_USERS,
  SELECT_USERS_SUCCESS
 } from '../constants'

 import { APP_SECRET_KEY } from '../config'

const fetchUsersLogic = createLogic({
  type: FETCH_USERS,
  async process({ getState, action }, dispatch, done){
    try{
      const res = await axios.get('/api/v1/users' , {
          headers : {
            Authorization : APP_SECRET_KEY
          }
      })
      console.log('RES IS ', res)
      completeLogic(dispatch, { type: FETCH_USERS_SUCCESS, payload : res.data || false }, done)
    }
    catch(err){
      const payload = 'Could not fetch users. Please try logging in again or contact support.'
      completeLogic(dispatch, { type: FETCH_USERS_FAILURE, payload : false }, done)
    }
  }
})

const selectUsersLogic = createLogic({
  type: SELECT_USERS,
  process({ getState, action }, dispatch, done){
      completeLogic(
        dispatch, 
        { type: SELECT_USERS_SUCCESS, payload : action.usersSelected.map(item => getState().users.users.data[item]) || [] }, 
        done)
  }
})

export default [
  fetchUsersLogic,
  selectUsersLogic
]
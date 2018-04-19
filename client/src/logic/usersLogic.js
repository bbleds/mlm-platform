import { createLogic } from 'redux-logic'
import axios from 'axios'
import { completeLogic } from '../util'
import {
  APP_ERROR,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
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
      // completeLogic(dispatch, { type: APP_ERROR, payload}, done)
      completeLogic(dispatch, { type: FETCH_USERS_FAILURE, payload : false }, done)
    }
  }
})

export default [
  fetchUsersLogic
]
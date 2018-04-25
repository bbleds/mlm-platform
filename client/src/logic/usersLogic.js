import { createLogic } from 'redux-logic'
import axios from 'axios'
import { completeLogic } from '../util'
import {
  APP_ERROR,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SELECT_USERS,
  SELECT_USERS_SUCCESS,
  DELETE_USERS,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_FAILURE,
  TOGGLE_MODAL,
  TOGGLE_NOTIFICATION
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

      res.data.data = res.data.data.filter((i)=>i.id!==getState().auth.user.id)
      completeLogic(dispatch, { type: FETCH_USERS_SUCCESS, payload : res.data }, done)
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
        { 
          type: SELECT_USERS_SUCCESS, 
          payload : 
            action.usersSelected === 'all' ? 
              getState().users.users.data : 
                action.usersSelected === 'none' ?
                  [] :
                  action.usersSelected.map(i => getState().users.users.data[i])
        }, 
        done)
  }
})

const deleteUsersLogic = createLogic({
  type: DELETE_USERS,
  async process({ getState, action }, dispatch, done){
    try{
      console.log(action)
      const res = await axios.delete('/api/v1/users' , {
          headers : {
            Authorization : APP_SECRET_KEY
          },
          data: {
            ids: action.userIds.join(',')
          }
      })
      
      dispatch({ type: DELETE_USERS_SUCCESS, payload :  [] })
      dispatch({ type: FETCH_USERS })
      dispatch({ 
        type: TOGGLE_NOTIFICATION, 
        payload : {
          message : action.userIds.length > 1 ? 'Deleted Users Successfully' : "Deleted User Successfully"
        }
      })
      done()
      
    }
    catch(err){
      const payload = 'Could not fetch users. Please try logging in again or contact support.'
      completeLogic(dispatch, { type: DELETE_USERS_FAILURE, payload }, done)
    }
  }
})

export default [
  fetchUsersLogic,
  selectUsersLogic,
  deleteUsersLogic
]
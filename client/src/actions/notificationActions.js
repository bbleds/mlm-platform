import {
    TOGGLE_NOTIFICATION 
} from '../constants'

export const toggleNotification = (message, autoHideDuration) => {
    return ({
    type: TOGGLE_NOTIFICATION,
    payload : {
        message,
        autoHideDuration
    }
})}
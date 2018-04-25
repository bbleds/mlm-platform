import {
    TOGGLE_MODAL 
} from '../constants'

export const toggleModal = (title, actions, children) => {
    return ({
    type: TOGGLE_MODAL,
    payload : {
        title,
        actions,
        children
    }
})}
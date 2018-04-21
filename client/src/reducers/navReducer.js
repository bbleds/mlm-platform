
import { TOGGLE_NAV } from '../constants'
const initialState = false  

export default (state = initialState, action) => {
    switch(action.type){
    case TOGGLE_NAV:
        return !state
    default:
        return state
    }
}  
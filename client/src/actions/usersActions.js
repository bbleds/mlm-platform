import {
    FETCH_USERS,
    SELECT_USERS,
    DELETE_USERS
} from '../constants'

export const fetchUsers = () => ({
    type: FETCH_USERS
})

export const selectUsers = (usersSelected=[]) => {
    return ({
        type: SELECT_USERS,
        usersSelected
    })
}

export const deleteUsers = (userIds=[]) => {
    return ({
        type: DELETE_USERS,
        userIds
    })
}
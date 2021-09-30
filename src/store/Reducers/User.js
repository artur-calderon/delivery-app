import { createAction, createReducer } from '@reduxjs/toolkit'

let INITIAL_STATE = []

export const addUserInfo = createAction('USER_INFO')
export const removeUserInfo = createAction('REMOVE_USER_INFO')

export default createReducer(INITIAL_STATE, {
  [addUserInfo.type]: (state, action) => [...state, action.payload],
  [removeUserInfo.type]: state => (state = [])
})

import { createStore, combineReducers } from 'redux'
import ProcuctReducer from './Reducers/Product'
import cartReducer from './Reducers/Cart'
import userInfo from './Reducers/User'

const rootReducer = combineReducers({
  prod: ProcuctReducer,
  cart: cartReducer,
  user: userInfo
})
export default createStore(rootReducer)

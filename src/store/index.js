import { createStore, combineReducers } from 'redux'
import ProcuctReducer from './Reducers/Product'
import cartReducer from './Reducers/Cart'

const rootReducer = combineReducers({
  prod: ProcuctReducer,
  cart: cartReducer
})
export default createStore(rootReducer)

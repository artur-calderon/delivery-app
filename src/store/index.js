import { createStore, combineReducers } from 'redux'
import ProcuctReducer from './Reducers/Product'

const rootReducer = combineReducers({
  prod: ProcuctReducer
})
export default createStore(rootReducer)

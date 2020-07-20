import { combineReducers } from 'redux'
import pickReducer from './pickReducer'

const rootReducer = combineReducers({
    pickup: pickReducer,
})

export default rootReducer;
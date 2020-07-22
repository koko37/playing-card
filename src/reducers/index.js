import { combineReducers } from 'redux'
import pickReducer from './pickReducer'
import scoreReducer from './scoreReducer'

const rootReducer = combineReducers({
    pickup: pickReducer,
    score: scoreReducer
})

export default rootReducer;
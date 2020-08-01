import { combineReducers } from 'redux'
import scoreReducer from './scoreReducer'

const rootReducer = combineReducers({
  score: scoreReducer
})

export default rootReducer;
import { combineReducers } from 'redux'
import scoreReducer from './scoreReducer'
import loginReducer from './loginReducer'

const rootReducer = combineReducers({
  score: scoreReducer,
  login: loginReducer
})

export default rootReducer

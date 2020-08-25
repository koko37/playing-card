import { combineReducers } from 'redux'
import logicReducer from './logicReducer'
import loginReducer from './loginReducer'
import scoreReducer from './scoreReducer'

const rootReducer = combineReducers({
  logic: logicReducer,
  login: loginReducer,
  score: scoreReducer
})

export default rootReducer

import * as actions from '../actions/loginAction'
import { getTokenFromLocal, saveTokenToLocal, clearTokenFromLocal, isAuthValid } from '../utils/auth'

const initialLoginState = {
  pending: false,
  hasErrors: false,
  isAuthUser: isAuthValid(),
  tokens: getTokenFromLocal() || {},
  errors: []
}

export default function loginReducer(state = initialLoginState, action) {

  switch(action.type) {
    case actions.LOGIN_PENDING:
      return {
        ...state,
        pending: true,
        hasErrors: false,
        isAuthUser: false,
        errors: []
      }

    case actions.LOGIN_COMPLETE:
      saveTokenToLocal(action.payload)
      return {
        ...state,
        pending: false,
        hasErrors: false,
        isAuthUser: true,
        tokens: action.payload
      }

    case actions.LOGIN_FAILED:
      return {
        ...state,
        pending: false,
        hasErrors: true,
        isAuthUser: false,
        errors: action.payload
      }

    case actions.LOGOUT:
      clearTokenFromLocal()
      return {
        ...state,
        tokens: {},
        isAuthUser: false
      }

    default:
      return state
  }
}

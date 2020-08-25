import * as actions from '../actions/loginAction'

const initialLoginState = {
  pending: false,
  hasErrors: false
}

export default function loginReducer(state = initialLoginState, action) {

  switch(action.type) {
    case actions.LOGIN_PENDING:
      return {
        ...state, 
        pending: true,
        hasErrors: false
      }

    case actions.LOGIN_COMPLETE:
      return {
        ...state,
        pending: false,
        hasErrors: false
      }

    case actions.LOGIN_FAILED:
      return {
        ...state,
        pending: false,
        hasErrors: true
      }

    default:
      return state
  }
}

import axios from 'axios'

export const LOGIN_PENDING = "LOGIN_PENDING"
export const LOGIN_COMPLETE = "LOGIN_COMPLETE"
export const LOGIN_FAILED = "LOGIN_FAILED"
export const LOGOUT = "LOGOUT"

export const startLogin = () => ({
  type: LOGIN_PENDING
})

export const completeLogin = (t) => ({
  type: LOGIN_COMPLETE,
  payload: t
})

export const failedLogin = (errors) => ({
  type: LOGIN_FAILED,
  payload: errors
})

export const signOut = () => ({
  type: LOGOUT
})

export function performLogin(email, password) {
  return async dispatch => {
    dispatch(startLogin())

    try {
      const params = {
        email: email,
        password: password
      }
      const resp = await axios.post('https://api60k.herokuapp.com/auth/sign_in', params)
      const tokens = {
        'access-token': resp.headers['access-token'],
        'token-type': resp.headers['token-type'],
        'client': resp.headers['client'],
        'uid': resp.headers['uid'],
        'expiry': resp.headers['expiry'],
      }

      dispatch(completeLogin(tokens))     
    } catch(err) {
      dispatch(failedLogin(err.response.data.errors))
    }
  }
}

export function performSignup(username, email, password) {
  return async dispatch => {
    dispatch(startLogin())

    try {
      const params = {
        username: username,
        email: email,
        password: password
      }
      const resp = await axios.post('https://api60k.herokuapp.com/auth', params)
      const tokens = {
        'access-token': resp.headers['access-token'],
        'token-type': resp.headers['token-type'],
        'client': resp.headers['client'],
        'uid': resp.headers['uid'],
        'expiry': resp.headers['expiry'],
      }

      dispatch(completeLogin(tokens))     
    } catch(err) {
      dispatch(failedLogin(err.response.data.errors.full_messages))
    }
  }
}
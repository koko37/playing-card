import axios from 'axios'

export const LOGIN_PENDING = "LOGIN_PENDING"
export const LOGIN_COMPLETE = "LOGIN_COMPLETE"
export const LOGIN_FAILED = "LOGIN_FAILED"

export const sessionStorageKey = "60kSESSIONstoreV1";

export const startLogin = () => ({
  type: LOGIN_PENDING
})

export const completeLogin = () => ({
  type: LOGIN_COMPLETE
})

export const failedLogin = () => ({
  type: LOGIN_FAILED
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

      window.localStorage.setItem(sessionStorageKey, JSON.stringify(tokens));
      dispatch(completeLogin())     
    } catch(err) {
      dispatch(failedLogin())
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

      console.log("token: ", tokens)
      window.localStorage.setItem(sessionStorageKey, JSON.stringify(tokens));
      dispatch(completeLogin())     
    } catch(err) {
      dispatch(failedLogin())
    }
  }
}
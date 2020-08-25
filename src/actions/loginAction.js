import axios from 'axios'

export const LOGIN_PENDING = "LOGIN_PENDING"
export const LOGIN_COMPLETE = "LOGIN_COMPLETE"
export const LOGIN_FAILED = "LOGIN_FAILED"

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
      console.log("data:", resp.data)
      console.log("header:", resp.headers)
      dispatch(completeLogin())     
    } catch(err) {
      dispatch(failedLogin())
    }
  }
}
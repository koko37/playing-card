import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Button, Alert, Spinner  } from 'react-bootstrap'
import { performSignup } from '../actions/loginAction'

const mapStateToProps = (state) => ({
  pending: state.login.pending,
  hasErrors: state.login.hasErrors
})

const mapDispatchToProps = (dispatch) => ({
  signup: (u, e, p) => dispatch(performSignup(u, e, p))
})

const Signup = ({pending, hasErrors, signup}) => {
  const style = {
    height: '70vh'
  }
  const formSignStyle = {
    maxWidth: '330px'
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [username, setUsername] = useState('')
  const [inputError, setInputError] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value)
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const onSubmit = (e) => {
    console.log("[App] Trying to sign up...")
    e.preventDefault()

    setInputError(false)
    if((password.length < 8) || (password !== passwordConfirm) || (username.length < 5)) {
      setInputError(true)
      return
    }

    signup(username, email, password)
  }

  return (
    <Row>
      <Col sm={12} style={style} className="d-flex justify-content-center align-items-center">
        <Form className="w-100 p-3 border border-info rounded bg-info" style={formSignStyle}>
          <div className="d-flex align-items-center justify-content-center">
            <h3 className="text-center mt-3">Sign up</h3>
            { pending && (
              <Spinner animation="border" size="sm" className="ml-3 mt-2 align-items-center" />
            )
            }
          </div>

          {
            inputError && (
            <Alert variant="danger">Incorrect email or password!</Alert>
            )
          }
          {
            hasErrors && (
            <Alert variant="danger">Signup failed!</Alert>
            )
          }
          <Form.Control type="text" placeholder="Username *" name="username" className="mt-3" onChange={handleUsernameChange} value={username}/>
          <Form.Control type="email" placeholder="Email *" name="email" className="mt-3" onChange={handleEmailChange} value={email}/>
          <Form.Control type="password" placeholder="Password *" name="password"  className="mt-3" onChange={handlePasswordChange} value={password}/>
          <Form.Control type="password" placeholder="Confirm Password *" name="password-again"  className="mt-3" onChange={handlePasswordConfirmChange} value={passwordConfirm}/>
          <Button className="mt-3" variant="primary" block onClick={onSubmit}>Submit</Button>
        </Form>
      </Col>
    </Row>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

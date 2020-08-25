import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { performLogin } from '../actions/loginAction'

const mapStateToProps = (state) => ({
  pending: state.login.pending,
  hasErrors: state.login.hasErrors
})

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(performLogin(email, password))
})

const Signin = ({pending, hasErrors, login}) => {
  const style = {
    height: '70vh'
  }
  const formSignStyle = {
    maxWidth: '330px'
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  
  const onSubmit = (e) => {
    console.log("[App] Trying to sign in...")
    login(email, password)
    e.preventDefault()
  }

  return (
    <Row>
      <Col sm={12} style={style} className="d-flex justify-content-center align-items-center">
        <Form className="w-100 p-3 border border-info rounded bg-info" style={formSignStyle}>
          <div className="d-flex align-items-center justify-content-center">
            <h3 className="text-center mt-3">Sign in</h3>
            { pending && (
              <Spinner animation="border" size="sm" className="ml-3 mt-2 align-items-center" />
            )
            }
          </div>
          {
            hasErrors && (
            <Alert variant="danger">Incorrect email or password!</Alert>
            )
          }
          <Form.Control type="email" placeholder="Enter email" name="email" className="mt-3" value={email} onChange={handleEmailChange}/>
          <Form.Control type="password" placeholder="Password" name="password"  className="mt-3" value={password} onChange={handlePasswordChange}/>
          <Button className="mt-3" variant="primary" block onClick={onSubmit}>Submit</Button>
        </Form>
      </Col>
    </Row>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)

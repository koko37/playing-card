import React from 'react'
import { Row, Col, Form, Button  } from 'react-bootstrap'

const Signin = () => {
  const style = {
    height: '70vh'
  }
  const formSignStyle = {
    maxWidth: '330px'
  }

  const onSubmit = (e) => {
    console.log("[App] Trying to sign in...")
  }

  return (
    <Row>
      <Col sm={12} style={style} className="d-flex justify-content-center align-items-center">
        <Form className="w-100 p-3 border border-info rounded bg-info" style={formSignStyle}>
          <h3 className="text-center mt-3">Sign in</h3>
          <Form.Control type="email" placeholder="Enter email" name="email" className="mt-3"/>
          <Form.Control type="password" placeholder="Password" name="password"  className="mt-3"/>
          <Button className="mt-3" variant="primary" block onClick={onSubmit}>Submit</Button>
        </Form>
      </Col>
    </Row>
  )
}

export default Signin

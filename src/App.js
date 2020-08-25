import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import githubIcon from "./imgs/github.png"
import Game60K from './pages/Game'

import "./styles/app.css"


const App = () => {
  
  return (
    <Container>
      <Game60K />

      <footer className="border-top border-info pt-3 my-md-5">
        <Row>
          <Col className="text-center">
            <h5>
              <a href="https://github.com/yeahCH/playing-card"><img src={githubIcon} alt="github.com/yeahch/playing-card" style={{width: '36px', marginRight: '10px'}}/></a>
              @yeahch : 2020
            </h5>
          </Col>

          <Col className="text-left">
            <h5>Features</h5>
            <ul className="list-unstyled">
              <li>ReactJS</li>
              <li>Redux</li>
              <li>PWA</li>
              <li>RestAPI</li>
            </ul>
          </Col>
        </Row>
      </footer>
    </Container>
  )
}

export default App

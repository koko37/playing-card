import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { downloadHighscore } from './actions/scoreAction'

import Game60K from './pages/Game'

import githubIcon from "./imgs/github.png"
import "./styles/app.css"

const mapStateToProps = (state) => ({
  isSignedIn: state.login.isAuthUser,
})

const mapDispatchToProps = (dispatch) => ({
  downloadScores: () => dispatch(downloadHighscore()),
})

const App = ({isSignedIn, downloadScores}) => {
  
  useEffect(() => {
    // download history
    // console.log("[App] download scores ...")
    // downloadScores()
  }, [downloadScores])

  return (
    <BrowserRouter>
      <Container fluid>
        <Game60K />
      </Container>
    </BrowserRouter>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

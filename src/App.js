import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Jumbotron, Row, Col, Button, Alert, Modal  } from 'react-bootstrap';
import CardHolder from "./components/CardHolder"

import { resetCardsStatus, appendScoreHistory, clearScoreHistory } from "./actions/scoreActions"
import initCardArray from "./utils/card"
import githubIcon from "./imgs/github.png"

import "./styles/app.css"

const mapStateToProps = (state) => ({
  score: state.score.score,
  holdersState: state.score.holdersState,
  gameOver: state.score.gameOver,
  scoreHistory: state.score.scoreHistory
})

const mapDispatchToProps = (dispatch) => ({
  resetAllCardsStatus: (cardArray) => dispatch(resetCardsStatus(cardArray)),
  appendScore: (item) => dispatch(appendScoreHistory(item)),
  clearScore: () => dispatch(clearScoreHistory())
})

const App = ({holdersState, score, gameOver, scoreHistory, resetAllCardsStatus, appendScore, clearScore}) => {
  const storageKey = "60kSCOREchReactv1";

  useEffect(() => {
    resetAllCardsStatus(initCardArray());
    console.log("[App] loading scores.");
    var scoresOldHistory = JSON.parse(window.localStorage.getItem(storageKey));
    if(scoresOldHistory !== null) {
      for(let item of scoresOldHistory) {
        console.log("[App] loading score.", item);
        appendScore(item);
      }
    }
  }, [])

  useEffect(() => {
    if(gameOver === true) {
      // append game history
      console.log("[App] saving score.")
      var scoreNewItem = {
        date: new Date(),
        score: score
      };
      appendScore(scoreNewItem);
      window.localStorage.setItem(storageKey, JSON.stringify([...scoreHistory, scoreNewItem]));

      setShowGameOverModal(true)
    }
  }, [gameOver])

  const onClickResetHistory = () => {
    if(window.confirm("Are you sure to clear history?") === true) {
      console.log("[App] clear history.");
      window.localStorage.setItem(storageKey, JSON.stringify([]));
      clearScore();
    }
  }

  const onClickRestart = () => {
    if(window.confirm("Are you sure to restart this game?") === true) {
      resetAllCardsStatus(initCardArray());
    }
  }

  const [showGameOverModal, setShowGameOverModal] = useState(false)
  const onCloseModal = () => setShowGameOverModal(false)

  return (
    <Container>
      <Modal show={showGameOverModal} onHide={onCloseModal}>
        <Modal.Header closeButton><Modal.Title>60K Points</Modal.Title></Modal.Header>
        <Modal.Body>
            <h4 className="text-center">Game Over!</h4>
            <h2 className="text-center text-danger">{score}</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col sm="12" md="10" lg="10">
          <Jumbotron className="mt-3">
            <div className="d-flex justify-content-between align-items-center border-bottom border-primary mb-2">
              <div className="d-flex align-items-center">
                <a href="https://github.com/yeahCH/playing-card"><img src={githubIcon} alt="github.com/yeahch/playing-card" style={{width: '36px', marginRight: '10px'}}/></a>
                <h1 className="text-primary">60K Points</h1>
              </div>

              <div>
                <Button variant="warning" className="mr-2" onClick={() => onClickResetHistory()}>Reset score</Button>
                <Button variant="danger" onClick={() => onClickRestart()}>New game</Button>
              </div>
            </div>
            <Row>
              <Col xs="10">
                <p className="lead my-0 text-muted">This is a card game by React</p>
                <p className="lead my-0 text-muted">Please select a pair of cards with same number. Then it will disappear.</p>
                <p className="lead my-0 text-muted">It will be over if you can not find a pair of cards any more.</p>
              </Col>

              <Col xs="2">
                <h1 className="text-danger">{score}</h1>
              </Col>
            </Row>
            {
              (holdersState.length > 0) && (
                <div>
                  <Row>
                    <CardHolder id={0} key={0}/>
                    <CardHolder id={1} key={1}/>
                    <CardHolder id={2} key={2}/>
                    <CardHolder id={3} key={3}/>
                    <CardHolder id={4} key={4}/>
                  </Row>
                  <Row>
                    <CardHolder id={10} key={10}/>
                    <CardHolder id={11} key={11}/>
                    <CardHolder id={12} key={12}/>
                    <CardHolder id={13} key={13}/>
                    <CardHolder id={14} key={14}/>
                  </Row>
                  <Row>
                    <CardHolder id={5} key={5}/>
                    <CardHolder id={6} key={6}/>
                    <CardHolder id={7} key={7}/>
                    <CardHolder id={8} key={8}/>
                    <CardHolder id={9} key={9}/>
                  </Row>
                  <Row>
                    <Col></Col>
                    <Col></Col>
                    <CardHolder id={15} key={15} />
                    <Col></Col>
                    <Col></Col>
                  </Row>
                </div>
              )
            }
          </Jumbotron>
        </Col>
        <Col sm="12" md="2" lg="2" className="mt-3">
          <h4 className="text-primary">High Scores</h4>
          {
            scoreHistory.sort((a, b) => {
              return b.score - a.score
            }).map( (item, id) => (
              <div key={id}>
                <h3>{item.score}</h3>
                <p>{new Date(item.date).toDateString()}</p>
              </div>
            ))
          }
        </Col>
      </Row>
    </Container>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

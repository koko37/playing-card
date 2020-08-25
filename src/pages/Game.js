import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Modal  } from 'react-bootstrap'
import CardHolder from "../components/CardHolder"

import { resetCardsStatus, appendScoreHistory, clearScoreHistory } from "../actions/logicActions"
import { uploadScore } from '../actions/scoreAction'
import { sessionStorageKey } from '../actions/loginAction'

import initCardArray from "../utils/card"
import "../styles/app.css"

const mapStateToProps = (state) => ({
  score: state.logic.score,
  holdersState: state.logic.holdersState,
  gameOver: state.logic.gameOver,
  scoreHistory: state.logic.scoreHistory
})

const mapDispatchToProps = (dispatch) => ({
  resetAllCardsStatus: (cardArray) => dispatch(resetCardsStatus(cardArray)),
  appendScore: (item) => dispatch(appendScoreHistory(item)),
  clearScore: () => dispatch(clearScoreHistory()),
  shareScore: (p, t) => dispatch(uploadScore(p, t))
})

const Game60K = ({holdersState, score, gameOver, scoreHistory, resetAllCardsStatus, appendScore, clearScore, shareScore}) => {
  const storageKey = "60kSCOREchReactv1";

  useEffect(() => {
    resetAllCardsStatus(initCardArray());
    console.log("[App] loading scores.");
    var scoresOldHistory = JSON.parse(window.localStorage.getItem(storageKey));
    if(scoresOldHistory !== null) {
      for(let item of scoresOldHistory) {
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

      // upload score into backend
      var tokensData = JSON.parse(window.localStorage.getItem(sessionStorageKey))
      shareScore(score, tokensData);

      setShowGameOverModal(true);
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

  const [showHelpModal, setShowHelpModal] = useState(false)
  const onCloseHelpModal = () => setShowHelpModal(false)

  return (
    <div>
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

      <Modal show={showHelpModal} onHide={onCloseHelpModal} size="lg">
        <Modal.Header closeButton><Modal.Title>How to play?</Modal.Title></Modal.Header>
        <Modal.Body>
          <p className="lead text-muted">
            This is a card game by React.<br/>
            Please select a pair of cards with same number. Then it will disappear.<br/>
            It will be over if you can not find a pair of cards any more.<br/>
            <strong className="text-info">Please login to share your scores with community!</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onCloseHelpModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col sm="12" md="10" lg="10" className="bg-info mt-2 rounded">
          <div className="d-flex justify-content-between align-items-center border-bottom border-primary mb-2">
            <div className="d-flex align-items-center">
              <h1 className="text-primary">60K</h1>
            </div>

            <div className="d-flex">
              <Button variant="info" className="mr-1" onClick={() => setShowHelpModal(true)}><strong>?</strong></Button>
              <Button variant="warning" className="mr-1" onClick={() => onClickResetHistory()}>Reset score</Button>
              <Button variant="danger" onClick={() => onClickRestart()}>New</Button>
            </div>
          </div>
          
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
        
        </Col>
        <Col sm="12" md="2" lg="2" className="mt-3">
          <h4 className="text-info">Score: </h4>
          <h2 className="text-white text-center">{score}</h2>
          <hr/>
          <h4 className="text-info">High Scores</h4>
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
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Game60K)

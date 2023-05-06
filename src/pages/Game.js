import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import Card from "../components/Card"
import CardHolder from "../components/CardHolder"
import CardExtra from "../components/CardExtra"
import CardSpare from "../components/CardSpare"
import Help from "../components/Help"
import Score from "../components/ScoreResult"
import Confetti from 'react-confetti'

import { resetCardsStatus, appendScoreHistory, clearScoreHistory } from "../actions/logicActions"

import initCardArray from "../utils/card"
import "../styles/app.css"
import githubIcon from '../imgs/github.png'

const mapStateToProps = (state) => ({
  score: state.logic.score,
  holdersState: state.logic.holdersState,
  gameOver: state.logic.gameOver,
  scoreHistory: state.logic.scoreHistory,
})

const mapDispatchToProps = (dispatch) => ({
  resetAllCardsStatus: (cardArray) => dispatch(resetCardsStatus(cardArray)),
  appendScore: (item) => dispatch(appendScoreHistory(item)),
  clearLocalScores: () => dispatch(clearScoreHistory()),
})

const Game60K = ({
  holdersState,
  score,
  gameOver,
  scoreHistory,
  resetAllCardsStatus,
  appendScore,
  clearLocalScores
}) => {

  useEffect(() => {
    resetAllCardsStatus(initCardArray());
    // console.log("[App] loading scores.");

  }, [])

  useEffect(() => {
    if (gameOver === true) {
      if (score >= 20000) {
        setCongratulatoin(true);
        setShowGameOverModal(true);
      } else {
        setShowGameOverModal(true);
      }
      // append game history
      // console.log("[App] saving score.")
      var scoreNewItem = {
        date: new Date(),
        score: score
      };
      appendScore(scoreNewItem);
    }
  }, [gameOver])

  const onClickResetHistory = () => {
    if (window.confirm("Are you sure to clear local history?") === true) {
      // console.log("[App] clear history.");
      clearLocalScores();
    }
  }

  const onClickRestart = () => {
    if (window.confirm("Are you sure to restart this game?") === true) {
      setCongratulatoin(false);
      resetAllCardsStatus(initCardArray());
    }
  }

  const [congratulation, setCongratulatoin] = useState(false);

  const [showGameOverModal, setShowGameOverModal] = useState(false)
  const onCloseModal = () => setShowGameOverModal(false)

  const [showHelpModal, setShowHelpModal] = useState(false)
  const onCloseHelpModal = () => setShowHelpModal(false)

  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <div>
      <Score score={score} show={showGameOverModal} onClose={onCloseModal} />
      <Help show={showHelpModal} onClose={onCloseHelpModal} />

      <div className="d-none">
        {
          ['a', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k'].map(
            (item, id) => (
              <div key={id}>
                <Card card={{ suit: 'h', number: item }} />
                <Card card={{ suit: 'd', number: item }} />
                <Card card={{ suit: 'c', number: item }} />
                <Card card={{ suit: 's', number: item }} />
              </div>
            )
          )
        }
      </div>

      <div>
        <div className="d-flex justify-content-between align-items-center border-bottom border-primary mb-2 pt-2">
          <h1 className="text-warning">
            Card Game <strong>60K</strong>
          </h1>

          <div className="d-flex">
            <a href="https://github.com/yeahCH/playing-card" target="_blank" className="mr-4"><img src={githubIcon} /></a>

            <Button variant="warning" onClick={() => onClickRestart()}>New Game</Button>
          </div>
        </div>
      </div>

      <Row>
        <Col sm="12" xl="10" className="mt-2 rounded">
          {
            (holdersState.length > 0) && (
              <div className="d-block d-md-flex">
                <div>
                  <Row className="px-3">
                    <CardHolder id={0} key={0} />
                    <CardHolder id={1} key={1} />
                    <CardHolder id={2} key={2} />
                    <CardHolder id={3} key={3} />
                    <CardHolder id={4} key={4} />
                  </Row>
                  <Row className="px-3 mt-1">
                    <CardHolder id={10} key={10} />
                    <CardHolder id={11} key={11} />
                    <CardHolder id={12} key={12} />
                    <CardHolder id={13} key={13} />
                    <CardHolder id={14} key={14} />
                  </Row>
                  <Row className="px-3 mt-1">
                    <CardHolder id={5} key={5} />
                    <CardHolder id={6} key={6} />
                    <CardHolder id={7} key={7} />
                    <CardHolder id={8} key={8} />
                    <CardHolder id={9} key={9} />
                  </Row>
                </div>
                <div className="d-flex d-md-block ml-2 ml-md-5 mt-2 mt-md-0" style={{ maxWidth: '40vw' }}>
                  <CardSpare />
                  <CardExtra id={15} key={15} />
                </div>
              </div>
            )
          }

        </Col>
        <Col sm="12" xl="2" className="mt-3 h-full">
          <h4 className="text-white">Score: </h4>
          <h2 className="text-white text-center">{score}</h2>

          <h5 className="text-white">Local Scores</h5>
          {
            scoreHistory.sort((a, b) => {
              return b.score - a.score
            }).filter((item, id) => id < 5).map((item, id) => (
              <div key={id}>
                <h4 className="text-center">{item.score}</h4>
                <p>{new Date(item.date).toDateString()}</p>
              </div>
            ))
          }
        </Col>
      </Row>
      {congratulation &&
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
        />}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Game60K)

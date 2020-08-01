import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Jumbotron, Row, Col, Button, Alert  } from 'react-bootstrap';
import CardHolder from "./components/CardHolder"

import { resetCardsStatus } from "./actions/scoreActions"
import initCardArray from "./utils/card"

import "./styles/app.css"

const mapStateToProps = (state) => ({
  score: state.score.score,
  holdersState: state.score.holdersState,
  gameOver: state.score.gameOver
})

const mapDispatchToProps = (dispatch) => ({
  resetAllCardsStatus: (cardArray) => dispatch(resetCardsStatus(cardArray))
})

const App = ({holdersState, score, gameOver, resetAllCardsStatus}) => {

  const card_size = {
      width: "100px", 
      height: "120px"
  }

  useEffect(() => {
    resetAllCardsStatus(initCardArray());
  }, [])

  const onClickRestart = () => {
    if(window.confirm("Are you sure to restart this game?") === true)
    {
      resetAllCardsStatus(initCardArray());
    }
  }

  return (
    <Container>
      { gameOver && (<Alert variant="danger" className="mt-2">Game over!</Alert>) }

      <Jumbotron className="mt-3">
        <div className="d-flex justify-content-between align-items-center border-bottom border-primary mb-2">
          <h1 className="text-primary">60K Points</h1>
          <Button variant="danger" onClick={() => onClickRestart()}>New game</Button>
        </div>
        <Row>
          <Col md="10" sm="10" lg="10" className="mb-3">
            <p className="lead my-0 text-muted">This is a card game by React</p>
            <p className="lead my-0 text-muted">Please select a pair of cards with same number. Then it will disappear.</p>
            <p className="lead my-0 text-muted">It will be over if you can not find a pair of cards any more.</p>
          </Col>

          <Col md="2" sm="2" lg="2">
            <h1 className="text-danger">{score}</h1>
          </Col>
        </Row>
        {
          (holdersState.length > 0) && (
            <div>
              <Row>
                <Col className="d-flex justify-content-between mb-2 px-5">
                  <CardHolder card_size={card_size} id={0} key={0}/>
                  <CardHolder card_size={card_size} id={1} key={1}/>
                  <CardHolder card_size={card_size} id={2} key={2}/>
                  <CardHolder card_size={card_size} id={3} key={3}/>
                  <CardHolder card_size={card_size} id={4} key={4}/>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-between mb-2 px-5">
                  <CardHolder card_size={card_size} id={10} key={10}/>
                  <CardHolder card_size={card_size} id={11} key={11}/>
                  <CardHolder card_size={card_size} id={12} key={12}/>
                  <CardHolder card_size={card_size} id={13} key={13}/>
                  <CardHolder card_size={card_size} id={14} key={14}/>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-between mb-2 px-5">
                  <CardHolder card_size={card_size} id={5} key={5}/>
                  <CardHolder card_size={card_size} id={6} key={6}/>
                  <CardHolder card_size={card_size} id={7} key={7}/>
                  <CardHolder card_size={card_size} id={8} key={8}/>
                  <CardHolder card_size={card_size} id={9} key={9}/>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center">
                <CardHolder card_size={card_size} id={15} key={15} />
              </Row>
            </div>
          )
        }
          
      </Jumbotron>
    </Container>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
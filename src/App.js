import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Jumbotron, Row, Col, Button  } from 'react-bootstrap';
import CardHolder from "./components/CardHolder"
import { resetCardPickup } from "./actions/picKActions"
import { resetCardsStatus } from "./actions/scoreActions"
import initCardArray from "./utils/card"

import "./styles/app.css"

const mapStateToProps = (state) => ({
  score: state.score.score,
  centerHoldersStatus: state.score.centerRowsDisableState,
  monitorCard: state.pickup.secondCard,
  allTopCards: state.score.topCards
})

const mapDispatchToProps = (dispatch) => ({
  resetCardPickup: () => dispatch(resetCardPickup()),
  resetAllCardsStatus: () => dispatch(resetCardsStatus())
})

const App = ({score, centerHoldersStatus, monitorCard, allTopCards, resetCardPickup, resetAllCardsStatus}) => {
  const [cardArrayData, setCardArrayData] = useState([]);

  const card_size = {
      width: "100px", 
      height: "120px"
  }

  useEffect(() => {
    setCardArrayData(initCardArray());
  }, [])

  useEffect(() => {
    if(monitorCard == null)
    {
      // check if game is over
      console.log(allTopCards);
    }
  }, [monitorCard])

  const onClickRestart = () => {
    if(window.confirm("Are you sure to restart this game?") === true)
    {
      setCardArrayData(initCardArray());
      resetCardPickup();
      resetAllCardsStatus();
    }
  }

  return (
    <Container>
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
          (cardArrayData.length > 0) && (
            <div>
              <Row>
                <Col className="d-flex justify-content-between mb-2 px-5">
                  <CardHolder cards={cardArrayData[0]} card_size={card_size} id={0} key={0}/>
                  <CardHolder cards={cardArrayData[1]} card_size={card_size} id={1} key={1}/>
                  <CardHolder cards={cardArrayData[2]} card_size={card_size} id={2} key={2}/>
                  <CardHolder cards={cardArrayData[3]} card_size={card_size} id={3} key={3}/>
                  <CardHolder cards={cardArrayData[4]} card_size={card_size} id={4} key={4}/>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-between mb-2 px-5">
                  <CardHolder cards={cardArrayData[10]} card_size={card_size} id={10} key={10} disable={centerHoldersStatus[0]} />
                  <CardHolder cards={cardArrayData[11]} card_size={card_size} id={11} key={11} disable={centerHoldersStatus[1]} />
                  <CardHolder cards={cardArrayData[12]} card_size={card_size} id={12} key={12} disable={centerHoldersStatus[2]} />
                  <CardHolder cards={cardArrayData[13]} card_size={card_size} id={13} key={13} disable={centerHoldersStatus[3]} />
                  <CardHolder cards={cardArrayData[14]} card_size={card_size} id={14} key={14} disable={centerHoldersStatus[4]} />
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-between mb-2 px-5">
                  <CardHolder cards={cardArrayData[5]} card_size={card_size} id={5} key={5}/>
                  <CardHolder cards={cardArrayData[6]} card_size={card_size} id={6} key={6}/>
                  <CardHolder cards={cardArrayData[7]} card_size={card_size} id={7} key={7}/>
                  <CardHolder cards={cardArrayData[8]} card_size={card_size} id={8} key={8}/>
                  <CardHolder cards={cardArrayData[9]} card_size={card_size} id={9} key={9}/>
                </Col>
              </Row>
              <Row>
                <CardHolder cards={cardArrayData[15]} card_size={card_size} id={15} key={15} />
              </Row>
            </div>
          )
        }
          
      </Jumbotron>
    </Container>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
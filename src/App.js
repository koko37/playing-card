import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Jumbotron, Row, Col, Button  } from 'react-bootstrap';
import CardHolder from "./components/CardHolder"
import { resetPickStatus } from "./actions/picKActions"
import { resetHolders } from "./actions/scoreActions"
import { getCardFromNumber, swapTwoElement } from "./utils/card"

import "./styles/app.css"

const mapStateToProps = (state) => ({
  score: state.score.score,
  centerHoldersStatus: state.score.centerRowsDisableState
})

const mapDispatchToProps = (dispatch) => ({
  resetPickCard: () => dispatch(resetPickStatus()),
  resetHolder: () => dispatch(resetHolders())
})

const App = ({score, centerHoldersStatus, resetPickCard, resetHolder}) => {
    const card_size = {
        width: "100px", 
        height: "120px"
    }
    
    const initCardData = () => {
      var cardData = new Array(16);
      let cardDataInit = [];
      let n, firstId, secondId;
      let holderNo;

      for(n=0; n<52; n++) {
        cardDataInit[n] = n+1;
      }
      // Randomize card array
      for(n=0; n<52; n++)
      {
        firstId = Math.floor(Math.random() * 52);
        secondId = Math.floor(Math.random() * 52);
        swapTwoElement(cardDataInit, firstId, secondId);
      }
      firstId = 0;
      for(holderNo=0; holderNo<15; holderNo++)
      {
        const holder_card_data = new Array(3);
        for(n=0; n<3; n++)
        {
          holder_card_data[n] = getCardFromNumber(cardDataInit[firstId++]);
        }
        cardData[holderNo] = holder_card_data;
      }
      
      // keep residue cards into final holder
      const spare_card_holder_data = new Array(7);
      n = 0;
      while(firstId < 52)
      {
        spare_card_holder_data[n++] = getCardFromNumber(cardDataInit[firstId++]);
      }
      cardData[15] = spare_card_holder_data;
      console.log("log card: ", cardData[0]);
      return cardData;
    }

    const onClickRestart = () => {
      console.log("Restart game.");
      setHolderData(initCardData());
      resetPickCard();
      resetHolder();
    }
    
    const [holderData, setHolderData] = useState(initCardData());

    return (
        <Container>
            <Jumbotron className="mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="text-primary">Playing card game</h1>

                  <Button variant="danger" onClick={() => onClickRestart()}>Restart</Button>
                </div>
                <Row>
                  <Col md="10" sm="10" lg="10">
                    <p className="lead mb-0 text-info">This is card game by React</p>
                    <p className="lead mt-0 text-info">Please select double card with same number. Then it will disappear.</p>
                  </Col>

                  <Col md="2" sm="2" lg="2">
                    <h1 className="text-danger">{score}</h1>
                  </Col>
                </Row>
                
                <Row>
                    <Col className="d-flex justify-content-between mb-2 px-5">
                      <CardHolder cards={holderData[0]} card_size={card_size} id={0} key={0}/>
                      <CardHolder cards={holderData[1]} card_size={card_size} id={1} key={1}/>
                      <CardHolder cards={holderData[2]} card_size={card_size} id={2} key={2}/>
                      <CardHolder cards={holderData[3]} card_size={card_size} id={3} key={3}/>
                      <CardHolder cards={holderData[4]} card_size={card_size} id={4} key={4}/>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-between mb-2 px-5">
                      <CardHolder cards={holderData[10]} card_size={card_size} id={10} key={10} disable={centerHoldersStatus[0]} />
                      <CardHolder cards={holderData[11]} card_size={card_size} id={11} key={11} disable={centerHoldersStatus[1]} />
                      <CardHolder cards={holderData[12]} card_size={card_size} id={12} key={12} disable={centerHoldersStatus[2]} />
                      <CardHolder cards={holderData[13]} card_size={card_size} id={13} key={13} disable={centerHoldersStatus[3]} />
                      <CardHolder cards={holderData[14]} card_size={card_size} id={14} key={14} disable={centerHoldersStatus[4]} />
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-between mb-2 px-5">
                      <CardHolder cards={holderData[5]} card_size={card_size} id={5} key={5}/>
                      <CardHolder cards={holderData[6]} card_size={card_size} id={6} key={6}/>
                      <CardHolder cards={holderData[7]} card_size={card_size} id={7} key={7}/>
                      <CardHolder cards={holderData[8]} card_size={card_size} id={8} key={8}/>
                      <CardHolder cards={holderData[9]} card_size={card_size} id={9} key={9}/>
                    </Col>
                </Row>
                <Row>
                  <CardHolder cards={holderData[15]} card_size={card_size} id={15} key={15} />
                </Row>
            </Jumbotron>
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
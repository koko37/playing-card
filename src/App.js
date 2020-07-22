import React from 'react'
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

    const cardData = new Array(15);
    var fistRowOfHolders = new Array(0);
    var lastRowOfHolders = new Array(0);
    var centerRowOfHolders = new Array(0);

    const initCardData = () => {
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

      // prepare card holder rows
      for (n=0; n<5; n++)
      {
        fistRowOfHolders.push(<CardHolder cards={cardData[n]} card_size={card_size} id={n} key={n}/>)
      }
      for (n=5; n<10; n++)
      {
        lastRowOfHolders.push(<CardHolder cards={cardData[n]} card_size={card_size} id={n} key={n}/>)
      }
      for (n=10; n<15; n++)
      {
        centerRowOfHolders.push(<CardHolder cards={cardData[n]} card_size={card_size} id={n} key={n} disable={centerHoldersStatus[n-10]} />)
      }

      // reset store status
      resetPickCard();
      resetHolder();
    }

    initCardData();

    return (
        <Container>
            <Jumbotron className="mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="text-primary">Playing card game</h1>

                  <Button variant="danger">Restart</Button>
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
                      { fistRowOfHolders }
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-between mb-2 px-5">
                    { centerRowOfHolders }
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-between mb-2 px-5">
                    { lastRowOfHolders }
                    </Col>
                </Row>
            </Jumbotron>
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
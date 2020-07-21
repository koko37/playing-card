import React from 'react'
import { Container, Jumbotron, Row, Col  } from 'react-bootstrap';
import CardHolder from "./components/CardHolder"
import "./styles/app.css"

export default () => {
    const card_size = {
        width: "120px", 
        height: "150px"
    }
    
    const getCardFromNumber = (n) => {
      let flower, number, value;
      switch(Math.floor((n-1)/13))
      {
        case 0:
          flower = "h";
          break;
        case 1:
          flower = "s";
          break;
        case 2:
          flower = "d";
          break;
        case 3:
          flower = "c";
          break;
        default:
          flower = ""
          break;
      }
      number = ((n-1) % 13) + 1;
      if(number === 1)
      {
        value = "a"
      }
      else if(number === 11)
      {
        value = "j"
      }
      else if(number === 12)
      {
        value = "q"
      }
      else if(number === 13)
      {
        value = "k"
      }
      else 
      {
        value = number;
      }
      return {flower: flower, number: value}
    }

    const swapTwoElement = (numberArray, firstIndex, secondIndex) => {
      let c = numberArray[firstIndex];
      numberArray[firstIndex] = numberArray[secondIndex];
      numberArray[secondIndex] = c;
    }

    const cardData = new Array(15);

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
    }

    initCardData();

    return (
        <Container>
            <Jumbotron className="mt-3">
                <h1 className="text-primary">Playing card game</h1>
                <p className="lead mb-0 text-info">This is card game by React</p>
                <p className="lead mt-0 text-info">Please select double card with same number. Then it will disappear.</p>
                <Row>
                    <Col className="d-flex justify-content-between mb-2 px-5">
                      <CardHolder cards={cardData[0]} card_size={card_size} />
                      <CardHolder cards={cardData[1]} card_size={card_size} />
                      <CardHolder cards={cardData[2]} card_size={card_size} />
                      <CardHolder cards={cardData[3]} card_size={card_size} />
                      <CardHolder cards={cardData[4]} card_size={card_size} />
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-between mb-2 px-5">
                      <CardHolder cards={cardData[5]} card_size={card_size} disable={true} />
                      <CardHolder cards={cardData[6]} card_size={card_size} disable={true} />
                      <CardHolder cards={cardData[7]} card_size={card_size} disable={true} />
                      <CardHolder cards={cardData[8]} card_size={card_size} disable={true} />
                      <CardHolder cards={cardData[9]} card_size={card_size} disable={true} />
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-between mb-2 px-5">
                      <CardHolder cards={cardData[10]} card_size={card_size} />
                      <CardHolder cards={cardData[11]} card_size={card_size} />
                      <CardHolder cards={cardData[12]} card_size={card_size} />
                      <CardHolder cards={cardData[13]} card_size={card_size} />
                      <CardHolder cards={cardData[14]} card_size={card_size} />
                    </Col>
                </Row>
            </Jumbotron>
        </Container>
    )
}

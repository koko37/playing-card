import React, { useEffect } from 'react'
import { Container, Jumbotron, Row  } from 'react-bootstrap';
import CardHolder from "./components/CardHolder"
import "./styles/app.css"

export default () => {
    const card_size = {
        width: "90px", 
        height: "120px"
    }
    
    const getCardFromNumber = (n) => {
      let flower, number, value;
      switch(Math.floor(n/13))
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
      number = (n % 13) ;
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
      else if(number === 0)
      {
        value = "k"
      }
      else 
      {
        value = number;
      }
      return {flower: flower, number: value}
    }

    const card_data = [
      [getCardFromNumber(1),getCardFromNumber(2),getCardFromNumber(3)],
      [getCardFromNumber(14),getCardFromNumber(15),getCardFromNumber(16)],
      [getCardFromNumber(27),getCardFromNumber(28),getCardFromNumber(29)],
      [getCardFromNumber(40),getCardFromNumber(41),getCardFromNumber(42)],
      [getCardFromNumber(50),getCardFromNumber(12),getCardFromNumber(13)]
    ];
    useEffect(() => {
      console.log("app initialize.");
    }, []);

    return (
        <Container>
            <Jumbotron className="mt-3">
                <h1>Playing card game</h1>
                <p className="lead">This is card game by React</p>
                <Row className="d-flex justify-content-between mb-2">
                    <CardHolder cards={card_data[0]} card_size={card_size} />
                    <CardHolder cards={card_data[1]} card_size={card_size} />
                    <CardHolder cards={card_data[2]} card_size={card_size} />
                    <CardHolder cards={card_data[3]} card_size={card_size} />
                    <CardHolder cards={card_data[4]} card_size={card_size} />
                    
                </Row>
            </Jumbotron>
        </Container>
    )
}

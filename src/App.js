import React from 'react'
import { Container, Jumbotron  } from 'react-bootstrap';
import CardHolder from "./components/CardHolder"


export default () => {
    const card_size = {
        width: "90px", 
        height: "120px"
    }
    const cards_place_1 = [
        {flower: "h", number: "3"},
        {flower: "c", number: "5"},
        {flower: "d", number: "j"},
        {flower: "s", number: "8"},
    ]
    const cards_place_2 = [
        {flower: "h", number: "6"},
        {flower: "c", number: "7"},
        {flower: "d", number: "8"},
        {flower: "s", number: "9"},
    ]
    
    return (
        <Container>
            <Jumbotron className="mt-3">
                <h1>Playing card game</h1>
                <p className="lead">This is card game by React</p>
                <div className="d-flex">
                    <CardHolder cards={cards_place_1} card_size={card_size} />
                    <CardHolder cards={cards_place_2} card_size={card_size} />
                </div>
                
            </Jumbotron>
        </Container>
    )
}

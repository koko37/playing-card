import React from 'react'
import { Container, Jumbotron, Row  } from 'react-bootstrap';
import CardHolder from "./components/CardHolder"
import "./styles/app.css"

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
    
    const cards_place_3 = [
        {flower: "c", number: "6"},
        {flower: "h", number: "7"},
        {flower: "c", number: "8"},
        {flower: "d", number: "9"},
    ]

    const cards_place_4 = [
        {flower: "c", number: "3"},
        {flower: "h", number: "5"},
        {flower: "h", number: "j"},
        {flower: "c", number: "8"},
    ]

    return (
        <Container>
            <Jumbotron className="mt-3">
                <h1>Playing card game</h1>
                <p className="lead">This is card game by React</p>
                <Row className="d-flex justify-content-between mb-2">
                    <CardHolder cards={cards_place_1} card_size={card_size} />
                    <CardHolder cards={cards_place_2} card_size={card_size} />
                    <CardHolder cards={cards_place_3} card_size={card_size} />
                    <CardHolder cards={cards_place_4} card_size={card_size} />
                    <CardHolder cards={cards_place_4} card_size={card_size} />
                </Row>
                
                <Row className="d-flex justify-content-between mb-2">
                    <CardHolder cards={cards_place_1} card_size={card_size} />
                    <CardHolder cards={cards_place_2} card_size={card_size} />
                    <CardHolder cards={cards_place_3} card_size={card_size} />
                    <CardHolder cards={cards_place_4} card_size={card_size} />
                    <CardHolder cards={cards_place_4} card_size={card_size} />
                </Row>

                <Row className="d-flex justify-content-between mb-2">
                    <CardHolder cards={cards_place_1} card_size={card_size} />
                    <CardHolder cards={cards_place_2} card_size={card_size} />
                    <CardHolder cards={cards_place_3} card_size={card_size} />
                    <CardHolder cards={cards_place_4} card_size={card_size} />
                    <CardHolder cards={cards_place_4} card_size={card_size} />
                </Row>
            </Jumbotron>
        </Container>
    )
}

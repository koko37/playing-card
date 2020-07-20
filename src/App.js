import React, { useState } from 'react'
import { Container, Row, Button, Jumbotron  } from 'react-bootstrap';
import Card from "./components/Card"

export default () => {
    const card_size = {
        width: "90px", 
        height: "120px"
    }

    return (
        <Container>
            <Jumbotron className="mt-3">
                <h1>Playing card game</h1>
                <p className="lead">This is card game by React</p>
                <div className="d-flex">
                    <Card flower="h" number="3" size={card_size} />
                    <Card flower="d" number="3" size={card_size} />
                    <Card flower="s" number="k" size={card_size} />
                    <Card flower="c" number="j" size={card_size} />
                </div>
                
            </Jumbotron>
        </Container>
    )
}

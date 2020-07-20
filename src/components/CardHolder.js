import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styles from "../styles/card-holder.module.css"
import Card from "./Card"
import { pickFirstCard, pickSecondCard, releaseSelected } from "../actions/picKActions"

const mapStateToProps = (state) => ({
    firstCard: state.pickup.firstCard,
    secondCard: state.pickup.secondCard
})

const mapDispatchToProps = (dispatch) => ({
    setFirstCard: (card) => dispatch(pickFirstCard(card)),
    setSecondCard: (card) => dispatch(pickSecondCard(card)),
    releaseSelect: () => dispatch(releaseSelected())
})

const CardHolder = ({cards, card_size, firstCard, secondCard, setFirstCard, setSecondCard, releaseSelect}) => {
    const [cardList, setCardList] = useState(cards);
    const [topCard, setTopCard] = useState(cards[cards.length - 1])
    const [active, setActive] = useState(false);

    useEffect(()=>{
        setActive(firstCard === topCard);
    }, [firstCard, topCard])

    useEffect(()=>{
        console.log("second card selected: ", JSON.stringify(firstCard), JSON.stringify(secondCard));
        if((firstCard != null) && (secondCard != null) && (firstCard.number === secondCard.number))
        {
            if(firstCard === topCard)
            {
                const cardListNew = cardList.slice(0, cardList.length-1);
                const topCardNew = cardListNew[cardListNew.length - 1];
                setCardList(cardListNew);
                setTopCard(topCardNew);
                releaseSelect();
            }
        }
    }, [secondCard])

    const style = {
        border: active ? "solid 1px #f00" : "none"
    }

    const pickCard = (card) => {
        // check validation
        if(cardList.length ===0)
        {
            return
        }
        if(firstCard == null)
        {
            setFirstCard(topCard);
            console.log("selected first card!");
            return;
        }
        if(firstCard === topCard)
        {
            console.log("same card selected.");
            return;
        }
        if(firstCard.number !== topCard.number)
        {
            console.log("different card selected.");
            releaseSelect();
            return;
        }

        // remove seecond card
        setSecondCard(topCard);
        const cardListNew = cardList.slice(0, cardList.length-1);
        const topCardNew = cardListNew[cardListNew.length - 1];
        setCardList(cardListNew);
        setTopCard(topCardNew);
    }

    return(
        <div className={styles.cardHolder} style={style}>
            {topCard != null && (
                <Card card={topCard} size={card_size} pickup={pickCard} />
            )}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CardHolder)
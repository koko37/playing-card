import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styles from "../styles/card-holder.module.css"
import Card from "./Card"
import BlankCard from "./BlankCard"
import BackCard from "./BackCard"

import { pickFirstCard, pickSecondCard, releaseSelected } from "../actions/picKActions"
import { emptyHolder } from "../actions/scoreActions"

const mapStateToProps = (state) => ({
    firstCard: state.pickup.firstCard,
    secondCard: state.pickup.secondCard
})

const mapDispatchToProps = (dispatch) => ({
    setFirstCard: (card) => dispatch(pickFirstCard(card)),
    setSecondCard: (card) => dispatch(pickSecondCard(card)),
    releaseSelect: () => dispatch(releaseSelected()),
    emptyCardHolder: (n) => dispatch(emptyHolder(n))
})

const CardHolder = ({cards, card_size, firstCard, secondCard, setFirstCard, setSecondCard, releaseSelect, id, emptyCardHolder, disable=false}) => {
    const [cardList, setCardList] = useState(cards);
    const [topCard, setTopCard] = useState(cards[cards.length - 1])
    const [active, setActive] = useState(false);

    useEffect(()=>{
        setActive(firstCard === topCard);
    }, [firstCard, topCard])

    useEffect(()=>{
        if((firstCard != null) && (secondCard != null) && (firstCard.number === secondCard.number))
        {
            if(firstCard === topCard)
            {
                const cardListNew = cardList.slice(0, cardList.length-1);
                const topCardNew = cardListNew[cardListNew.length - 1];
                setCardList(cardListNew);
                setTopCard(topCardNew);
                releaseSelect();
                if(cardListNew.length === 0)
                {
                  // this CardHolder is empty, so dispatch to calculate score
                  emptyCardHolder(id);
                }
            }
        }
    }, [secondCard])

    const pickCard = (card) => {
        // check validation
        if(cardList.length ===0)
        {
            return
        }
        if(firstCard == null)
        {
            setFirstCard(topCard);
            return;
        }
        if(firstCard === topCard)
        {
            return;
        }
        if(firstCard.number !== topCard.number)
        {
            releaseSelect();
            return;
        }

        // remove seecond card
        setSecondCard(topCard);
        const cardListNew = cardList.slice(0, cardList.length-1);
        const topCardNew = cardListNew[cardListNew.length - 1];
        setCardList(cardListNew);
        setTopCard(topCardNew);
        if(cardListNew.length === 0)
        {
          // this CardHolder is empty, so dispatch to calculate score
          emptyCardHolder(id);
        }
    }

    return(
        <div className={styles.cardHolder}>
            {(topCard != null) && (disable === false) && (
              <Card card={topCard} size={card_size} active={active} pickup={pickCard} />
            )}
            {(topCard != null) && (disable === true) && (
              <BackCard size={card_size} />
            )}
            {(topCard == null) && (
              <BlankCard size={card_size} />
            )}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CardHolder)
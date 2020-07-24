import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styles from "../styles/card-holder.module.css"
import Card from "./Card"
import BlankCard from "./BlankCard"
import BackCard from "./BackCard"

import { pickFirstCard, pickSecondCard, resetCardPickup } from "../actions/picKActions"
import { updateScore } from "../actions/scoreActions"

const mapStateToProps = (state) => ({
  firstCard: state.pickup.firstCard,
  secondCard: state.pickup.secondCard
})

const mapDispatchToProps = (dispatch) => ({
  setFirstCard: (card) => dispatch(pickFirstCard(card)),
  setSecondCard: (card) => dispatch(pickSecondCard(card)),
  resetCardPickup: () => dispatch(resetCardPickup()),
  updateScore: (n) => dispatch(updateScore(n))
})

const CardHolder = ({cards, card_size, firstCard, secondCard, setFirstCard, setSecondCard, resetCardPickup, id, emptyCardHolder, disable=false}) => {
  const [cardList, setCardList] = useState(cards);
  const [topCard, setTopCard] = useState(cards[cards.length - 1])
  const [active, setActive] = useState(false);

  useEffect(()=>{
      setActive(firstCard === topCard);
  }, [firstCard, topCard])

  useEffect(()=>{
    setCardList(cards);
    setTopCard(cards[cards.length - 1]);
    setActive(false);
  }, [cards])
  
  useEffect(()=>{
    if((firstCard != null) && (secondCard != null) && (firstCard.number === secondCard.number))
    {
      if(firstCard === topCard)
      {
        const cardListNew = cardList.slice(0, cardList.length-1);
        const topCardNew = cardListNew[cardListNew.length - 1];
        setCardList(cardListNew);
        setTopCard(topCardNew);
        resetCardPickup();
        // this CardHolder is empty, so dispatch to calculate score
        if(cardListNew.length === 0)
        {
          updateScore(id);
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
      console.log("set first card");
      setFirstCard(topCard);
      return;
    }
    if(firstCard === topCard)
    {
      return;
    }
    if(firstCard.number !== topCard.number)
    {
      resetCardPickup();
      return;
    }

    console.log("set second card");
    // remove seecond card
    setSecondCard(topCard);
    const cardListNew = cardList.slice(0, cardList.length-1);
    const topCardNew = cardListNew[cardListNew.length - 1];
    setCardList(cardListNew);
    setTopCard(topCardNew);
    if(cardListNew.length === 0)
    {
      // this CardHolder is empty, so dispatch to calculate score
      updateScore(id);
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
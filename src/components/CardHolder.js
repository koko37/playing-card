import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styles from "../styles/card-holder.module.css"
import Card from "./Card"
import BlankCard from "./BlankCard"
import BackCard from "./BackCard"

import { updateScore, saveTopCardStatus } from "../actions/scoreActions"

const mapStateToProps = (state) => ({
  holderState: state.score.holderState
})

const mapDispatchToProps = (dispatch) => ({
})

const CardHolder = ({id, card_size, holderState}) => {

  const cardsCount = holderState[id].cardData.length;
  const topCard = cardsCount > 0 ? holderState[id].cardData[cardsCount-1] : null;
  const active = holderState[id].isFirstSelected;

  return(
    <div className={styles.cardHolder}>
      {((holderState[id].enable === true) && (cardsCount > 0)) && (
        <Card card={topCard} size={card_size} active={active}/>
      )}
      {(holderState[id].enable === false) && (cardsCount > 0) && (
        <BackCard size={card_size} />
      )}
      {(cardsCount === 0) && (
        <BlankCard size={card_size} />
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CardHolder)
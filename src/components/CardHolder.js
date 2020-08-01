import React from 'react'
import { connect } from 'react-redux'
import styles from "../styles/card-holder.module.css"
import Card from "./Card"
import BlankCard from "./BlankCard"
import BackCard from "./BackCard"

import { pickupCard } from "../actions/scoreActions"

const mapStateToProps = (state) => ({
  holdersState: state.score.holdersState,
  firstId: state.score.firstSelectedId,
  secondId: state.score.secondSelectedId
})

const mapDispatchToProps = (dispatch) => ({
  pickup: (id) => dispatch(pickupCard(id))
})

const CardHolder = ({id, card_size, holdersState, firstId, secondId, pickup}) => {
  const cardsCount = holdersState[id].cardsData.length;
  const topCard = cardsCount > 0 ? holdersState[id].cardsData[cardsCount-1] : null;
  const active = ((id === firstId) || (id === secondId));

  return(
    <div className={styles.cardHolder}>
      {((holdersState[id].enable === true) && (cardsCount > 0)) && (
        <Card card={topCard} size={card_size} active={active} id={id} pickup={pickup}/>
      )}
      {(holdersState[id].enable === false) && (cardsCount > 0) && (
        <BackCard size={card_size} />
      )}
      {(cardsCount === 0) && (
        <BlankCard size={card_size} />
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CardHolder)
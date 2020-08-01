import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from "../styles/card-holder.module.css"
import Card from "./Card"
import BlankCard from "./BlankCard"
import BackCard from "./BackCard"

import { resetPickupCard, 
  pickupFirstCard, 
  pickupSecondCard, 
  removeFirstCard, 
  removeSecondCard 
} from "../actions/scoreActions"

const mapStateToProps = (state) => ({
  holdersState: state.score.holdersState,
  firstId: state.score.firstSelectedId,
  secondId: state.score.secondSelectedId
})

const mapDispatchToProps = (dispatch) => ({
  resetPickup: () => dispatch(resetPickupCard()),
  pickupFirst: (id) => dispatch(pickupFirstCard(id)),
  pickupSecond: (id) => dispatch(pickupSecondCard(id)),
  removeFirst: (id) => dispatch(removeFirstCard(id)),
  removeSecond: (id) => dispatch(removeSecondCard(id)),
})

const CardHolder = ({id, card_size, holdersState, firstId, secondId, 
  resetPickup, pickupFirst, pickupSecond, removeFirst, removeSecond}) => {
  const cardsCount = holdersState[id].cardsData.length;
  const topCard = cardsCount > 0 ? holdersState[id].cardsData[cardsCount-1] : null;
  const active = ((id === firstId) || (id === secondId));

  useEffect(() => {
    if((firstId !== -1) && (secondId !== -1) && (secondId === id)) {
      var firstCard = holdersState[firstId].cardsData[holdersState[firstId].cardsData.length-1];
      var secondCard = holdersState[secondId].cardsData[holdersState[secondId].cardsData.length-1];
      if(firstCard.number !== secondCard.number) {
        resetPickup();
        return;
      }
      setTimeout(() => {
        removeFirst(firstId);
        removeSecond(secondId);
      }, 200);
    }
  }, [firstId, secondId]);

  const compareCards = (lastSelectedId) => {
      if(firstId === -1) {
        pickupFirst(lastSelectedId);
        return;
      }
      pickupSecond(lastSelectedId);
  }
  
  return(
    <div className={styles.cardHolder}>
      {((holdersState[id].enable === true) && (cardsCount > 0)) && (
        <Card card={topCard} size={card_size} active={active} id={id} pickup={compareCards}/>
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
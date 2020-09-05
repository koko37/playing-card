import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import { sendSpareCardToLastHolder } from '../actions/logicActions'
import FreeCard from "./FreeCard"
import BlankCard from "./BlankCard"

const mapStateToProps = (state) => ({
  spareCards: state.logic.spareCardsState
})

const mapDispatchToProps = (dispatch) => ({
  transferFreeCard: () => dispatch(sendSpareCardToLastHolder())
})

const CardSpare = ({ spareCards, transferFreeCard }) => {
  const [highlight, setHighlight] = useState(true)
  const [toggleHighlight, setToggleHighLight] = useState(true)

  setTimeout(() => {
    setToggleHighLight(!toggleHighlight)
  }, 1500)

  useEffect(() => {
    if(spareCards.length > 0) {
      setHighlight(true)
    } else {
      setHighlight(false)
    }
  }, [spareCards])

  return (
    <Col className="d-flex mb-1 mx-lg-4 flex-1" onClick={() => transferFreeCard()}>
      { (spareCards.length > 0) && (<FreeCard highlight={highlight && toggleHighlight} />) }
      { (spareCards.length === 0) && (<BlankCard />) }
    </Col>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CardSpare);
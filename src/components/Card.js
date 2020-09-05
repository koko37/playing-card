import React from 'react'
import styles from "../styles/card.module.css"

const cardImages = require.context('../imgs/cards')

export default ({id, card, active, pickup}) => {
  const card_style = {
    borderRadius: '5%',
    boxShadow: (active ? '0px 0px 10px 10px #CC8' : 'none')
  }
  
  const imageFileName = () => {
    return card.number.toString().toUpperCase() + card.suit.toUpperCase() + ".png"
  }
  return (
    <div className={styles.card + " flex-grow-1"} style={card_style} onClick={() => pickup(id)}>
      <img className={styles.cardImage} src={cardImages(`./${imageFileName()}`)} alt={imageFileName()} />
    </div>
  )
}

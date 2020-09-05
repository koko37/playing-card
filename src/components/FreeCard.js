import React from 'react'
import styles from "../styles/back-card.module.css"
const cardImages = require.context('../imgs/cards')

export default ({highlight = false}) => {
  const cardStyle = {
    borderRadius: '5%',
    boxShadow: (highlight ? '0px 0px 6px 6px #CC8' : '0px 0px 4px 4px #CC8')
  }

  const imageFileName = () => {
    return "BACKY.png"
  }
  return (
      <div className={styles.backCard + " flex-grow-1"} style={cardStyle}>
        <img className={styles.cardImage} src={cardImages(`./${imageFileName()}`)} alt={imageFileName()} />
      </div>
  )
}
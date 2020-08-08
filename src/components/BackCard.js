import React from 'react'
import styles from "../styles/back-card.module.css"
const cardImages = require.context('../imgs/cards')

export default () => {
  const imageFileName = () => {
    return "BACKY.png"
  }
  return (
      <div className={styles.backCard + " flex-grow-1"}>
        <img className={styles.cardImage} src={cardImages(`./${imageFileName()}`)} alt={imageFileName()} />
      </div>
  )
}
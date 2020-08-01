import React from 'react'
import styles from "../styles/card.module.css"

import club from "../imgs/c.png"
import diamond from "../imgs/d.png"
import heart from "../imgs/h.png"
import spade from "../imgs/s.png"

export default ({id, card, size, active, pickup}) => {
  const width = size != null ? size.width : "120px"
  const height = size != null ? size.height : "150px"

  const getImage = (f) => {
    switch(f)
    {
      case "h":
        return heart;
      case "d":
        return diamond;
      case "c":
        return club;
      case "s":
        return spade;
      default: 
        return null;
    }
  }

  const card_style = {
    width: width,
    height: height,
    color: (card.suit === "h" || card.suit === "d") ? "red" : "black",
    backgroundImage: `url(${getImage(card.suit)})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "10% 10%",
    backgroundSize: "20% 15%",
    borderColor: (active ? 'red' : '#ccc')
  }

  return (
    <div className={styles.card + " d-flex align-items-center justify-content-center"} style={card_style} onClick={() => pickup(id)}>
      <span className={styles.number}>{card.number.toString().toUpperCase()}</span>
    </div>
  )
}

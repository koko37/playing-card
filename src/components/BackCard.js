import React from 'react'
import styles from "../styles/back-card.module.css"

export default ({size}) => {
    const width = size != null ? size.width : "120px"
    const height = size != null ? size.height : "150px"

    const card_style = {
        width: width,
        height: height,
    }

    return (
        <div className={styles.backCard} style={card_style}>
        </div>
    )
}
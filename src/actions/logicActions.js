export const RESET_CARDS_STATUS = "RESET_CARDS_STATUS"
export const RESET_PICKUP_CARD = "RESET_PICKUP_CARD"
export const PICKUP_FIRST_CARD = "PICKUP_FIRST_CARD"
export const PICKUP_SECOND_CARD = "PICKUP_SECOND_CARD"
export const REMOVE_FIRST_CARD = "REMOVE_FIRST_CARD"
export const REMOVE_SECOND_CARD = "REMOVE_SECOND_CARD"
export const OPEN_CENTER_CARD = "OPEN_CENTER_CARD"
export const CHECK_GAME_OVER = "CHECK_GAME_OVER"
export const APPEND_SCORE_HISTORY ="APPEND_SCORE_HISTORY"
export const CLEAR_SCORE_HISTORY = "CLEAR_SCORE_HISTORY"
export const SEND_SPARE_CARD_TO_LAST_HOLDER = "SEND_SPARE_CARD_TO_LAST_HOLDER"

export const resetCardsStatus = (cardArrayData) => ({
  type: RESET_CARDS_STATUS,
  payload: cardArrayData
})
export const resetPickupCard = () => ({
  type: RESET_PICKUP_CARD
})
export const pickupFirstCard = (id) => ({
  type: PICKUP_FIRST_CARD,
  payload: id
})
export const pickupSecondCard = (id) => ({
  type: PICKUP_SECOND_CARD,
  payload: id
})
export const removeFirstCard = (id) => ({
  type: REMOVE_FIRST_CARD,
  payload: id
})
export const removeSecondCard = (id) => ({
  type: REMOVE_SECOND_CARD,
  payload: id
})
export const openCenterCard = () => ({
  type: OPEN_CENTER_CARD
})
export const checkGameOver = () => ({
  type: CHECK_GAME_OVER,
})
export const appendScoreHistory = (history) => ({
  type: APPEND_SCORE_HISTORY,
  payload: history
})
export const clearScoreHistory = () => ({
  type: CLEAR_SCORE_HISTORY
})

export const sendSpareCardToLastHolder = () => ({
  type: SEND_SPARE_CARD_TO_LAST_HOLDER
})

export const RESET_CARDS_STATUS = "RESET_CARDS_STATUS"
export const RESET_PICKUP_CARD = "RESET_PICKUP_CARD"
export const PICKUP_FIRST_CARD = "PICKUP_FIRST_CARD"
export const PICKUP_SECOND_CARD = "PICKUP_SECOND_CARD"
export const REMOVE_FIRST_CARD = "REMOVE_FIRST_CARD"
export const REMOVE_SECOND_CARD = "REMOVE_SECOND_CARD"
export const OPEN_CENTER_CARD = "OPEN_CENTER_CARD"
export const UPDATE_SCORE = "UPDATE_SCORE"

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
export const updateScore = () => ({
  type: UPDATE_SCORE,
})
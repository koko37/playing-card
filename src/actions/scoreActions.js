export const UPDATE_SCORE = "UPDATE_SCORE"
export const PICKUP_CARD = "PICKUP_CARD"
export const RESET_PICKUP_CARD = "RESET_PICKUP_CARD"

export const RESET_CARDS_STATUS = "RESET_CARDS_STATUS"
export const SAVE_TOP_CARD_STATUS = "SAVE_TOP_CARD_STATUS"

export const resetCardsStatus = (cardArrayData) => ({
  type: RESET_CARDS_STATUS,
  payload: cardArrayData
})
export const resetPickupCard = () => ({
  type: RESET_PICKUP_CARD
})
export const pickupCard = (id) => ({
  type: PICKUP_CARD,
  payload: id
})



export const updateScore = (holder_no) => ({
  type: UPDATE_SCORE,
  payload: holder_no
})
export const saveTopCardStatus = (id, cardData) => ({
  type: SAVE_TOP_CARD_STATUS,
  payload: {id: id, cardData: cardData}
})
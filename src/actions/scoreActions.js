export const UPDATE_SCORE = "UPDATE_SCORE"


export const RESET_CARDS_STATUS = "RESET_CARDS_STATUS"
export const RESET_PICKUP_CARD = "RESET_PICKUP_CARD"
export const PICKUP_FIRST_CARD = "PICKUP_FIRST_CARD"
export const PICKUP_SECOND_CARD = "PICKUP_SECOND_CARD"
export const REMOVE_FIRST_CARD = "REMOVE_FIRST_CARD"
export const REMOVE_SECOND_CARD = "REMOVE_SECOND_CARD"

export const SAVE_TOP_CARD_STATUS = "SAVE_TOP_CARD_STATUS"

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





export const updateScore = (holder_no) => ({
  type: UPDATE_SCORE,
  payload: holder_no
})
export const saveTopCardStatus = (id, cardData) => ({
  type: SAVE_TOP_CARD_STATUS,
  payload: {id: id, cardData: cardData}
})
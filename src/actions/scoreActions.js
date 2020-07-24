export const UPDATE_SCORE = "UPDATE_SCORE"
export const RESET_CARDS_STATUS = "RESET_CARDS_STATUS"
export const SAVE_TOP_CARD_STATUS = "SAVE_TOP_CARD_STATUS"

export const updateScore = (holder_no) => ({
  type: UPDATE_SCORE,
  payload: holder_no
})

export const resetCardsStatus = () => ({
  type: RESET_CARDS_STATUS
})

export const saveTopCardStatus = (id, cardData) => ({
  type: SAVE_TOP_CARD_STATUS,
  payload: {id: id, cardData: cardData}
})
export const PICK_FIRST_CARD = 'PICK_FIRST_CARD'
export const PICK_SECOND_CARD = 'PICK_SECOND_CARD'
export const RELEASE_SELECTED_CARDS = 'RELEASE_SELECTED_CARD'
export const RESET_PICK_STATUS = 'RESET_PICK_STATUS'

export const pickFirstCard = (card) => ({
    type: PICK_FIRST_CARD,
    payload: card
})

export const pickSecondCard = (card) => ({
    type: PICK_SECOND_CARD,
    payload: card
})

export const releaseSelected = () => ({
    type: RELEASE_SELECTED_CARDS
})

export const resetPickStatus = () => ({
  type: RESET_PICK_STATUS
})

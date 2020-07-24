export const UPDATE_SCORE = "UPDATE_SCORE"
export const RESET_HOLDERS = "RESET_HOLDERS"

export const updateScore = (holder_no) => ({
  type: UPDATE_SCORE,
  payload: holder_no
})

export const resetHolders = () => ({
  type: RESET_HOLDERS
})

export const EMPTY_HOLDER = "EMPTY_HOLDER"
export const RESET_HOLDERS = "RESET_HOLDERS"

export const emptyHolder = (holder_no) => ({
  type: EMPTY_HOLDER,
  payload: holder_no
})

export const resetHolders = () => ({
  type: RESET_HOLDERS
})

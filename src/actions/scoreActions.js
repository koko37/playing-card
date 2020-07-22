export const EMPTY_HOLDER = "EMPTY_HOLDER"

export const emptyHolder = (holder_no) => ({
  type: EMPTY_HOLDER,
  payload: holder_no
})

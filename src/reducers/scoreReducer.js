import * as actions from "../actions/scoreActions"

export const initialState = {
  score: 0,
  centerRowsDisableState: [true, true, true, true, true],
  blankHolders: []
}

export default function scoreReducer(state = initialState, action) {
  switch(action.type) {
    case actions.EMPTY_HOLDER:
      state.blankHolders.push(action.payload);
      // check whether pair holder is already empty?
      var pairId = state.blankHolders.indexOf( (action.payload < 5) ? (action.payload+5) : (action.payload-5));
      var newScore = state.score + ((action.payload < 10) ? 1000 : 10000);
      // if two pair holder are opened already, then open the center holder.
      if(pairId !== -1)
      {
        state.centerRowsDisableState[action.payload % 5] = false;
      }
      return {
        score: newScore,
        centerRowsDisableState: state.centerRowsDisableState,
        blankHolders: state.blankHolders
      }

    case actions.RESET_HOLDERS:
      return initialState;
      
    default:
      return state;
  }
}
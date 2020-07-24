import * as actions from "../actions/scoreActions"

export const initialState = {
  score: 0,
  centerRowsDisableState: [true, true, true, true, true],
  blankHolders: []
}

export default function scoreReducer(state = initialState, action) {
  var newCenterRowsState = [];
  var blankHoldersNew = [];
  switch(action.type) {
    case actions.UPDATE_SCORE:
      console.log("update score: ", action.payload);
      Object.assign(blankHoldersNew, state.blankHolders);
      Object.assign(newCenterRowsState, state.centerRowsDisableState);
      var newScore = state.score + ((action.payload < 10) ? 1000 : 10000);

      blankHoldersNew.push(action.payload);
      // check whether pair holder is already empty?
      var pairId = blankHoldersNew.indexOf( (action.payload < 5) ? (action.payload+5) : (action.payload-5));
      // if two pair holder are opened already, then open the center holder.
      if(pairId !== -1)
      {
        newCenterRowsState[action.payload % 5] = false;
      }
      return {
        score: newScore,
        centerRowsDisableState: newCenterRowsState,
        blankHolders: blankHoldersNew
      }

    case actions.RESET_HOLDERS:
      return initialState;
      
    default:
      return state;
  }
}
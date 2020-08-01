import * as actions from "../actions/scoreActions"

const defaultHolderState = {
  enable: false,
  cardsData: [],
};
export const initialState = {

  centerRowsDisableState: [true, true, true, true, true],
  blankHolders: [],
  topCards: new Array(16),

  score: 0,
  gameOver: false,
  holdersState: [],
  firstSelectedId: -1,
  secondSelectedId: -1,
}

export default function scoreReducer(state = initialState, action) {
  var newCenterRowsState = [];
  var blankHoldersNew = [];
  var topCardsNew = [];

  switch(action.type) {
    case actions.UPDATE_SCORE:
      Object.assign(blankHoldersNew, state.blankHolders);
      Object.assign(newCenterRowsState, state.centerRowsDisableState);
      var newScore = state.score + ((action.payload < 10) ? 1000 : 10000);
      // console.log("[scoreReducer] update score. ", action.payload, newScore);

      blankHoldersNew.push(action.payload);
      // check whether pair holder is already empty?
      var pairId = blankHoldersNew.indexOf( (action.payload < 5) ? (action.payload+5) : (action.payload-5));
      // if two pair holder are opened already, then open the center holder.
      if(pairId !== -1)
      {
        newCenterRowsState[action.payload % 5] = false;
      }
      return {
        ...state,
        score: newScore,
        centerRowsDisableState: newCenterRowsState,
        blankHolders: blankHoldersNew,
      }

    case actions.SAVE_TOP_CARD_STATUS:
      Object.assign(topCardsNew, state.topCards);
      topCardsNew[action.payload.id] = action.payload.cardData;
      return {
        ...state,
        topCards: topCardsNew,
      }
  
      /**
       *  reset all game status
       */
    case actions.RESET_CARDS_STATUS:
      // console.log("[scoreReducer] Reset card status.");
      var holderStatesTemp = [];
      var holderStateTemp;
      let i;
      for(i=0; i<16; i++) {
        // [TODO] check again for memory assignment
        holderStateTemp = {};
        Object.assign(holderStateTemp, defaultHolderState);
        holderStateTemp.cardsData = action.payload[i];
        if((i<10) || (i>14))
        {
          holderStateTemp.enable = true;
        }
        holderStatesTemp.push(holderStateTemp);
      }
      return {
        ...state,
        score: 0,
        gameOver: false,
        firstSelectedId: -1,
        secondSelectedId: -1,
        holdersState: holderStatesTemp,
      }
      
    /**
     * reset card pickup status
     */
    case actions.RESET_PICKUP_CARD:
      return {
        ...state,
        firstSelectedId: -1,
        secondSelectedId: -1
      }

    /**
     * select one card
     */
    case actions.PICKUP_CARD:
      if(state.firstSelectedId === -1) {
        return {
        ...state,
        firstSelectedId: action.payload,
        }
      }
      return {
        ...state,
        secondSelectedId: action.payload,
      }

    default:
      return state;
  }
}
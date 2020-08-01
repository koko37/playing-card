import * as actions from "../actions/scoreActions"
import { isGameOver } from "../utils/card"

const defaultHolderState = {
  enable: false,
  cardsData: [],
};
export const initialState = {
  score: 0,
  gameOver: false,
  holdersState: [],
  firstSelectedId: -1,
  secondSelectedId: -1,
}

export default function scoreReducer(state = initialState, action) {
  var cardsDataTemp = [];
  var removedCard;
  var scoreTemp;

  switch(action.type) {
    /**
       *  reset all game status
       */
    case actions.RESET_CARDS_STATUS:
      console.log("[Action] Reset game status.");
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
      console.log("[Action] reset pickup state.");
      return {
        ...state,
        firstSelectedId: -1,
        secondSelectedId: -1
      }

    /**
     * pickup first card
     */
    case actions.PICKUP_FIRST_CARD:
      console.log("[Action] pickup first.");
      return {
        ...state,
        firstSelectedId: action.payload
      }

    /**
     * pickup second card
     */
    case actions.PICKUP_SECOND_CARD:
      console.log("[Action] pickup second.");
      return {
        ...state,
        secondSelectedId: action.payload
      }

    /**
     * remove first card
     */
    case actions.REMOVE_FIRST_CARD:
      cardsDataTemp = []
      Object.assign(cardsDataTemp, state.holdersState[action.payload].cardsData);
      removedCard = cardsDataTemp.pop();
      console.log("[Action] removed first.", removedCard);
      scoreTemp = state.score;
      // update score
      if(cardsDataTemp.length === 0) {
        if((action.payload > 9) & (action.payload < 15)) {
          scoreTemp += 10000;
        } else if(action.payload !== 15) {
          scoreTemp += 1000;
        }
      }
      return {
        ...state,
        score: scoreTemp,
        firstSelectedId: -1,
        holdersState: [...state.holdersState.slice(0, action.payload),
        {...state.holdersState[action.payload], cardsData: cardsDataTemp},
      ...state.holdersState.slice(action.payload+1,state.holdersState.length)]
      }

    /**
     * remove second card
     */
    case actions.REMOVE_SECOND_CARD:
      cardsDataTemp = [];
      Object.assign(cardsDataTemp, state.holdersState[action.payload].cardsData);
      removedCard = cardsDataTemp.pop();
      console.log("[Action] removed second.", removedCard);
      scoreTemp = state.score;
      // update score
      if(cardsDataTemp.length === 0) {
        if((action.payload > 9) & (action.payload < 15)) {
          scoreTemp += 10000;
        } else if(action.payload !== 15) {
          scoreTemp += 1000;
        }
      }
      return {
        ...state,
        score: scoreTemp,
        secondSelectedId: -1,
        holdersState: [...state.holdersState.slice(0, action.payload),
        {...state.holdersState[action.payload], cardsData: cardsDataTemp},
      ...state.holdersState.slice(action.payload+1,state.holdersState.length)]
      }
    
    /**
     * update center card enable state
     */
    case actions.OPEN_CENTER_CARD:
      for(let i=0; i<5; i++) {
        if((state.holdersState[i].cardsData.length === 0) && 
        (state.holdersState[i+5].cardsData.length === 0)) {
          if(state.holdersState[i+10].enable === false) {
            console.log("[Action] open center card.", 
              state.holdersState[i+10].cardsData[state.holdersState[i+10].cardsData.length-1]);
            return {
              ...state,
              holdersState: [...state.holdersState.slice(0, i+10),
                {...state.holdersState[i+10], enable: true},
              ...state.holdersState.slice(i+11,state.holdersState.length)]
            }
          }
        }
      }
      return state;
    
    /**
     * check game over
     */
    case actions.CHECK_GAME_OVER:
      if(isGameOver(state.holdersState)) {
        console.log("[Action] GAME OVER!");
        return {
          ...state,
          gameOver: true
        }
      }
      return state;

    default:
      return state;
  }
}
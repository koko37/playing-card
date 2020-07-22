import * as actions from "../actions/picKActions"

export const initialState = {
    firstCard: null,
    secondCard: null,
}

export default function pickReducer(state = initialState, action) {
    switch(action.type) {
        case actions.PICK_FIRST_CARD:
          return {...state, firstCard: action.payload};

        case actions.PICK_SECOND_CARD:
          return {...state, secondCard: action.payload};

        case actions.RELEASE_SELECTED_CARDS:
          return {...state, firstCard: null, secondCard: null};

        case actions.RESET_PICK_STATUS:
          return {firstCard: null, secondCard: null};
          
        default:
            return state;
    }
}
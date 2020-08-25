import * as actions from '../actions/scoreAction'

const initialScoreState = {
  uploading: false,
  hasErrors: false,
  scores: []
}

export default function scoreReducer(state = initialScoreState, action) {

  switch(action.type) {
    case actions.SCORE_UPLOAD_PENDING:
      return {
        ...state,
        uploading: true,
        hasErrors: false
      }

    case actions.SCORE_UPLOAD_COMPLETE:
      return {
        ...state,
        uploading: false,
        hasErrors: false,
        scores: action.payload
      }

    case actions.SCORE_UPLOAD_FAILED:
      return {
        ...state,
        uploading: false,
        hasErrors: true
      }

    default:
      return state
  }
}

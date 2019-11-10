import {
  REQUEST_DATA,
  RECEIVE_DATA
} from '../actions/actions'

function itemReducer(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_DATA:
      return {...state, isFetching: true }
    case RECEIVE_DATA:
      return {...state, isFetching: false, items: action.items}
    default:
      return state
  }
}

export default itemReducer

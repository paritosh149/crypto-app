import {
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_ERROR,
  CLOSE_ERROR
} from "../actions/actions";

function itemReducer(
  state = {
    isFetching: false,
    items: [],
    isOpen: false
  },
  action
) {
  switch (action.type) {
    case REQUEST_DATA:
      return { ...state, isFetching: true };
    case RECEIVE_DATA:
      return { ...state, isFetching: false, items: action.items };
    case RECEIVE_ERROR:
      return {
        ...state,
        isFetching: false,
        isError: true,
        error: action.error,
        isOpen: true
      };
    case CLOSE_ERROR:
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

export default itemReducer;

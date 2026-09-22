import { ActionType } from './action';

function threadDetailErrorReducer(error = null, action = {}) {
  switch (action.type) {
  case ActionType.SET_THREAD_DETAIL_ERROR:
    return action.payload.error;
  case ActionType.CLEAR_THREAD_DETAIL_ERROR:
    return null;
  default:
    return error;
  }
}

export default threadDetailErrorReducer;

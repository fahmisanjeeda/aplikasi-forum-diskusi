import { ActionType } from './action';
import { applyVote } from '../../utils/voteHelper';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;
  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...threads];
  case ActionType.TOGGLE_UP_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return applyVote(thread, { userId: action.payload.userId, voteType: 1 });
      }
      return thread;
    });
  case ActionType.TOGGLE_DOWN_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return applyVote(thread, { userId: action.payload.userId, voteType: -1 });
      }
      return thread;
    });
  case ActionType.NEUTRALIZE_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return applyVote(thread, { userId: action.payload.userId, voteType: 0 });
      }
      return thread;
    });
  default:
    return threads;
  }
}

export default threadsReducer;

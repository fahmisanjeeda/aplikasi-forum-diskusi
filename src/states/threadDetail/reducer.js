import { ActionType } from './action';
import { applyVote } from '../../utils/voteHelper';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.detailThread;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.ADD_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };
  case ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL:
    return applyVote(threadDetail, { userId: action.payload.userId, voteType: 1 });
  case ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL:
    return applyVote(threadDetail, { userId: action.payload.userId, voteType: -1 });
  case ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL:
    return applyVote(threadDetail, { userId: action.payload.userId, voteType: 0 });
  case ActionType.TOGGLE_UP_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return applyVote(comment, { userId: action.payload.userId, voteType: 1 });
        }
        return comment;
      }),
    };
  case ActionType.TOGGLE_DOWN_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return applyVote(comment, { userId: action.payload.userId, voteType: -1 });
        }
        return comment;
      }),
    };
  case ActionType.NEUTRALIZE_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return applyVote(comment, { userId: action.payload.userId, voteType: 0 });
        }
        return comment;
      }),
    };
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;

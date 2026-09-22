import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  setThreadDetailErrorAction,
  clearThreadDetailErrorAction,
} from '../threadDetailError/action';
import { determineVoteAction } from '../../utils/voteHelper';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UP_VOTE_THREAD_DETAIL: 'TOGGLE_UP_VOTE_THREAD_DETAIL',
  TOGGLE_DOWN_VOTE_THREAD_DETAIL: 'TOGGLE_DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_VOTE_THREAD_DETAIL: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
  TOGGLE_UP_VOTE_COMMENT: 'TOGGLE_UP_VOTE_COMMENT',
  TOGGLE_DOWN_VOTE_COMMENT: 'TOGGLE_DOWN_VOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
};

function receiveThreadDetailAction(detailThread) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      detailThread,
    },
  };
}

function clearThreadDetailAction() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentAction(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteThreadDetailAction(userId) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleDownVoteThreadDetailAction(userId) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralizeVoteThreadDetailAction(userId) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleUpVoteCommentAction({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentAction({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralizeVoteCommentAction({ commentId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetailAction());
    dispatch(clearThreadDetailErrorAction());
    dispatch(showLoading());
    try {
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailAction(detailThread));
    } catch (error) {
      dispatch(setThreadDetailErrorAction(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentAction(comment));
    } catch (error) {
      alert(error.message);
      throw error;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function _dispatchThreadDetailVote(dispatch, userId, voteType) {
  if (voteType === 1) {
    dispatch(toggleUpVoteThreadDetailAction(userId));
  } else if (voteType === -1) {
    dispatch(toggleDownVoteThreadDetailAction(userId));
  } else {
    dispatch(neutralizeVoteThreadDetailAction(userId));
  }
}

function _dispatchCommentVote(dispatch, commentId, userId, voteType) {
  if (voteType === 1) {
    dispatch(toggleUpVoteCommentAction({ commentId, userId }));
  } else if (voteType === -1) {
    dispatch(toggleDownVoteCommentAction({ commentId, userId }));
  } else {
    dispatch(neutralizeVoteCommentAction({ commentId, userId }));
  }
}

async function _callThreadDetailVoteApi(threadId, voteType) {
  if (voteType === 1) {
    await api.upVoteThread(threadId);
  } else if (voteType === -1) {
    await api.downVoteThread(threadId);
  } else {
    await api.neutralVoteThread(threadId);
  }
}

async function _callCommentVoteApi(threadId, commentId, voteType) {
  if (voteType === 1) {
    await api.upVoteComment({ threadId, commentId });
  } else if (voteType === -1) {
    await api.downVoteComment({ threadId, commentId });
  } else {
    await api.neutralVoteComment({ threadId, commentId });
  }
}

function asyncToggleVoteThreadDetail(targetVoteType) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote.');
      return;
    }

    const { nextVoteType, rollbackVoteType } = determineVoteAction(
      threadDetail,
      authUser.id,
      targetVoteType,
    );

    // Optimistic Update
    _dispatchThreadDetailVote(dispatch, authUser.id, nextVoteType);

    try {
      await _callThreadDetailVoteApi(threadDetail.id, nextVoteType);
    } catch (error) {
      alert(error.message);
      // Rollback
      _dispatchThreadDetailVote(dispatch, authUser.id, rollbackVoteType);
    }
  };
}

function asyncToggleUpVoteThreadDetail() {
  return asyncToggleVoteThreadDetail(1);
}

function asyncToggleDownVoteThreadDetail() {
  return asyncToggleVoteThreadDetail(-1);
}

function asyncToggleVoteComment(commentId, targetVoteType) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote.');
      return;
    }

    const comment = threadDetail.comments.find((c) => c.id === commentId);
    if (!comment) return;

    const { nextVoteType, rollbackVoteType } = determineVoteAction(
      comment,
      authUser.id,
      targetVoteType,
    );

    // Optimistic Update
    _dispatchCommentVote(dispatch, commentId, authUser.id, nextVoteType);

    try {
      await _callCommentVoteApi(threadDetail.id, commentId, nextVoteType);
    } catch (error) {
      alert(error.message);
      // Rollback
      _dispatchCommentVote(dispatch, commentId, authUser.id, rollbackVoteType);
    }
  };
}

function asyncToggleUpVoteComment(commentId) {
  return asyncToggleVoteComment(commentId, 1);
}

function asyncToggleDownVoteComment(commentId) {
  return asyncToggleVoteComment(commentId, -1);
}

export {
  ActionType,
  receiveThreadDetailAction,
  clearThreadDetailAction,
  addCommentAction,
  toggleUpVoteThreadDetailAction,
  toggleDownVoteThreadDetailAction,
  neutralizeVoteThreadDetailAction,
  toggleUpVoteCommentAction,
  toggleDownVoteCommentAction,
  neutralizeVoteCommentAction,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleVoteThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleVoteComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
};

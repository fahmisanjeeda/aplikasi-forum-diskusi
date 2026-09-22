import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveUsersAction } from '../users/action';
import { determineVoteAction } from '../../utils/voteHelper';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UP_VOTE_THREAD: 'TOGGLE_UP_VOTE_THREAD',
  TOGGLE_DOWN_VOTE_THREAD: 'TOGGLE_DOWN_VOTE_THREAD',
  NEUTRALIZE_VOTE_THREAD: 'NEUTRALIZE_VOTE_THREAD',
};

function receiveThreadsAction(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadAction(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpVoteThreadAction({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadAction({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizeVoteThreadAction({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const [users, threads] = await Promise.all([
        api.getAllUsers(),
        api.getAllThreads(),
      ]);
      dispatch(receiveUsersAction(users));
      dispatch(receiveThreadsAction(threads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadAction(thread));
      return thread;
    } catch (error) {
      alert(error.message);
      throw error;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function _dispatchThreadVote(dispatch, threadId, userId, voteType) {
  if (voteType === 1) {
    dispatch(toggleUpVoteThreadAction({ threadId, userId }));
  } else if (voteType === -1) {
    dispatch(toggleDownVoteThreadAction({ threadId, userId }));
  } else {
    dispatch(neutralizeVoteThreadAction({ threadId, userId }));
  }
}

async function _callThreadVoteApi(threadId, voteType) {
  if (voteType === 1) {
    await api.upVoteThread(threadId);
  } else if (voteType === -1) {
    await api.downVoteThread(threadId);
  } else {
    await api.neutralVoteThread(threadId);
  }
}

function asyncToggleVoteThread(threadId, targetVoteType) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote.');
      return;
    }

    const thread = threads.find((t) => t.id === threadId);
    if (!thread) return;

    const { nextVoteType, rollbackVoteType } = determineVoteAction(
      thread,
      authUser.id,
      targetVoteType,
    );

    // Optimistic Update
    _dispatchThreadVote(dispatch, threadId, authUser.id, nextVoteType);

    try {
      await _callThreadVoteApi(threadId, nextVoteType);
    } catch (error) {
      alert(error.message);
      // Rollback
      _dispatchThreadVote(dispatch, threadId, authUser.id, rollbackVoteType);
    }
  };
}

function asyncToggleUpVoteThread(threadId) {
  return asyncToggleVoteThread(threadId, 1);
}

function asyncToggleDownVoteThread(threadId) {
  return asyncToggleVoteThread(threadId, -1);
}

export {
  ActionType,
  receiveThreadsAction,
  addThreadAction,
  toggleUpVoteThreadAction,
  toggleDownVoteThreadAction,
  neutralizeVoteThreadAction,
  asyncPopulateUsersAndThreads,
  asyncAddThread,
  asyncToggleVoteThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
};

const ActionType = {
  SET_THREAD_DETAIL_ERROR: 'SET_THREAD_DETAIL_ERROR',
  CLEAR_THREAD_DETAIL_ERROR: 'CLEAR_THREAD_DETAIL_ERROR',
};

function setThreadDetailErrorAction(error) {
  return {
    type: ActionType.SET_THREAD_DETAIL_ERROR,
    payload: {
      error,
    },
  };
}

function clearThreadDetailErrorAction() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL_ERROR,
  };
}

export {
  ActionType,
  setThreadDetailErrorAction,
  clearThreadDetailErrorAction,
};

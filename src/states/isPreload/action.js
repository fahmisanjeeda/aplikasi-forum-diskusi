import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUserAction } from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadAction(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserAction(authUser));
    } catch {
      dispatch(setAuthUserAction(null));
    } finally {
      dispatch(setIsPreloadAction(false));
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  setIsPreloadAction,
  asyncPreloadProcess,
};

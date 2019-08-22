import * as types from './ui.types';

const initialState = {
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case types.UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};

export default reducer;

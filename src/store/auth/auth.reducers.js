import * as types from './auth.types';

const initialState = {
  token: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case types.AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null
      };
    default:
      return state;
  }
};

export default reducer;

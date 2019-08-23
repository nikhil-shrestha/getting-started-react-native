import * as types from './auth.types';

const initialState = {
  token: null,
  expiryDate: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        expiryDate: action.payload.expiryDate
      };
    case types.AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        expiryDate: null
      };
    default:
      return state;
  }
};

export default reducer;

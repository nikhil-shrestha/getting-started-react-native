import * as types from './auth.types';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TRY_AUTH:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default reducer;

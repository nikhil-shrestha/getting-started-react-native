import * as types from './auth.types';

export const tryAuth = authData => {
  return {
    type: types.TRY_AUTH,
    payload: authData
  };
};

import { AsyncStorage } from 'react-native';

import * as types from './auth.types';
import { uiStartLoading, uiStopLoading } from '../ui/ui.actions';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    const apiKey = 'AIzaSyAXAD5GJMl6JDGRpWUSjJOG9p8PM8zBeBI';
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      apiKey;
    if (authMode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        apiKey;
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(err => {
        console.log(err);
        alert('Authentication failed, please try again!');
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        if (parsedRes.error) {
          alert('Authentication failed, please try again!');
        } else {
          dispatch(authSetToken(parsedRes.idToken));
          startMainTabs();
        }
      });
  };
};

export const authStoreToken = token => {
  return dispatch => {
    dispatch(authSetToken(token));
    AsyncStorage.setItem('ap:auth:token', token);
  };
};

export const authSetToken = token => {
  return {
    type: types.AUTH_SET_TOKEN,
    payload: token
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        AsyncStorage.getItem('ap:auth:token')
          .catch(err => reject())
          .then(tokenFromStorage => {
            dispatch(authSetToken(tokenFromStorage));
            resolve(tokenFromStorage);
          });
      } else {
        resolve(token);
      }
    });
    return promise;
  };
};

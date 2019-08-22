import * as types from './auth.types';
import { uiStartLoading, uiStopLoading } from '../ui/ui.actions';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = authData => {
  return disptach => {
    disptach(authSignup(authData));
  };
};

export const authSignup = authData => {
  return disptach => {
    disptach(uiStartLoading());
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXAD5GJMl6JDGRpWUSjJOG9p8PM8zBeBI',
      {
        method: 'POST',
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .catch(err => {
        console.log(err);
        alert('Authentication failed, please try again!');
        disptach(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        disptach(uiStopLoading());

        if (parsedRes.error) {
          alert('Authentication failed, please try again!');
        } else {
          startMainTabs();
        }
      });
  };
};

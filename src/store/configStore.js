import { createStore, combineReducers, compose } from 'redux';

import placeReducer from './places/places.reducer';
import authReducer from './auth/auth.reducers';

const rootReducer = combineReducers({
  places: placeReducer,
  auth: authReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configStore = () => {
  return createStore(rootReducer, composeEnhancers());
};

export default configStore;

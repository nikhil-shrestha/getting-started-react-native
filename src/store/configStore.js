import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import placeReducer from './places/places.reducer';
import authReducer from './auth/auth.reducers';
import uiReducer from './ui/ui.reducers';

const rootReducer = combineReducers({
  places: placeReducer,
  auth: authReducer,
  ui: uiReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configStore;

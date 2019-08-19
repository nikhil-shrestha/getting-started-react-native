import { createStore, combineReducers } from 'redux';

import placeReducer from './places/places.reducer';

const rootReducer = combineReducers({
  places: placeReducer
});

const configStore = () => {
  return createStore(rootReducer);
};

export default configStore;

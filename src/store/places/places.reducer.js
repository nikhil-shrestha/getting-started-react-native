import * as types from './places.types';

const initialState = {
  places: [],
  placeAdded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PLACES:
      return {
        ...state,
        places: action.payload
      };

    case types.REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.key;
        })
      };

    case types.PLACE_ADDED:
      return {
        ...state,
        placeAdded: true
      };

    case types.START_ADD_PLACE:
      return {
        ...state,
        placeAdded: false
      };

    default:
      return state;
  }
};

export default reducer;

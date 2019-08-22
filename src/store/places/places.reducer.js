import * as types from './places.types';

const initialState = {
  places: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PLACES:
      return {
        ...state,
        places: action.payload
      };

    case REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.key;
        })
      };

    default:
      return state;
  }
};

export default reducer;

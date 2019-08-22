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

    case types.DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.id !== action.payload;
        })
      };

    default:
      return state;
  }
};

export default reducer;

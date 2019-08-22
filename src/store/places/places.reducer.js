import uuid from 'uuid';

import * as actionTypes from './places.types';

const initialState = {
  places: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: uuid.v4(),
          name: action.payload.placeName,
          image: {
            uri: action.payload.image.uri
          },
          location: action.payload.location
        })
      };

    case actionTypes.DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.payload;
        })
      };

    default:
      return state;
  }
};

export default reducer;

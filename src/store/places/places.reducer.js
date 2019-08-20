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
          name: action.payload,
          image: {
            uri:
              'https://usit-blog.s3-eu-west-1.amazonaws.com/wp-content/uploads/2018/02/26140820/Cook-Islands-768x561.jpg'
          }
        })
      };

    case actionTypes.DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== state.selectedPlace.key;
        })
      };

    default:
      return state;
  }
};

export default reducer;

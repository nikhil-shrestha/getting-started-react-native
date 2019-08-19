import * as actionTypes from './places.types';

const initialState = {
  places: [],
  selectedPlace: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random(),
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
        }),
        selectedPlace: null
      };

    case actionTypes.SELECT_PLACE:
      return {
        ...state,
        selectedPlace: state.places.find(place => {
          return place.key === action.payload;
        })
      };

    case actionTypes.DESELECT_PLACE:
      return {
        ...state,
        selectedPlace: null
      };
    default:
      return state;
  }
};

export default reducer;

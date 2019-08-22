import * as actionTypes from './places.types';

export const addPlace = (placeName, location) => {
  return {
    type: actionTypes.ADD_PLACE,
    payload: {
      placeName,
      location
    }
  };
};

export const deletePlace = key => {
  return {
    type: actionTypes.DELETE_PLACE,
    payload: key
  };
};

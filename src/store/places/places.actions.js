import * as actionTypes from './places.types';

export const addPlace = placeName => {
  return {
    type: actionTypes.ADD_PLACE,
    payload: placeName
  };
};

export const deletePlace = () => {
  return {
    type: actionTypes.DELETE_PLACE
  };
};

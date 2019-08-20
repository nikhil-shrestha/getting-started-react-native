import * as actionTypes from './places.types';

export const addPlace = placeName => {
  return {
    type: actionTypes.ADD_PLACE,
    payload: placeName
  };
};

export const deletePlace = key => {
  return {
    type: actionTypes.DELETE_PLACE,
    payload: key
  };
};

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

export const selectPlace = key => {
  return {
    type: actionTypes.SELECT_PLACE,
    payload: key
  };
};

export const deselectPlace = () => {
  return {
    type: actionTypes.DESELECT_PLACE
  };
};

import * as actionTypes from './places.types';

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    const placeData = {
      name: placeName,
      location
    };
    fetch('https://rn-course-1566437520068.firebaseio.com/places.json', {
      method: 'POST',
      body: JSON.stringify(placeData)
    })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
      })
      .catch(err => console.log(err));
  };
};

export const deletePlace = key => {
  return {
    type: actionTypes.DELETE_PLACE,
    payload: key
  };
};

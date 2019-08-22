import * as types from './places.types';
import { uiStartLoading, uiStopLoading } from '../ui/ui.actions';

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch(
      'https://us-central1-rn-course-1566437520068.cloudfunctions.net/storeImage',
      {
        method: 'POST',
        body: JSON.stringify({
          image: image.base64
        })
      }
    )
      .catch(err => {
        console.log(err);
        alert('Something went wrong, Please try again!');
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location,
          image: parsedRes.imageUrl
        };
        return fetch(
          'https://rn-course-1566437520068.firebaseio.com/places.json',
          {
            method: 'POST',
            body: JSON.stringify(placeData)
          }
        );
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong, Please try again!');
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
      });
  };
};

export const getPlaces = () => {
  console.log('getplaces');
  return dispatch => {
    fetch('https://rn-course-1566437520068.firebaseio.com/places.json')
      .catch(err => {
        alert('Something went wrong, sorry :/');
        console.log(err);
      })
      .then(res => res.json())
      .then(parsedRes => {
        const places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            key: key
          });
        }
        dispatch(setPlaces(places));
      });
  };
};

export const setPlaces = places => {
  return {
    type: types.SET_PLACES,
    payload: places
  };
};

export const deletePlace = key => {
  return {
    type: types.DELETE_PLACE,
    payload: key
  };
};

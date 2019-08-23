import * as types from './places.types';
import { uiStartLoading, uiStopLoading } from '../ui/ui.actions';
import { authGetToken } from '../auth/auth.actions';

export const startAddPlace = () => {
  return {
    type: types.START_ADD_PLACE
  };
};

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => alert('No valid token found'))
      .then(token => {
        authToken = token;
        return fetch(
          'https://us-central1-rn-course-1566437520068.cloudfunctions.net/storeImage',
          {
            method: 'POST',
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong, please try again!');
        dispatch(uiStopLoading());
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location: location,
          image: parsedRes.imageUrl
        };
        return fetch(
          'https://rn-course-1566437520068.firebaseio.com/places.json?auth=' +
            authToken,
          {
            method: 'POST',
            body: JSON.stringify(placeData)
          }
        );
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
        dispatch(placeAdded());
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong, please try again!');
        dispatch(uiStopLoading());
      });
  };
};

export const placeAdded = () => {
  return {
    type: types.PLACE_ADDED
  };
};

export const getPlaces = token => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch(
          'https://rn-course-1566437520068.firebaseio.com/places.json?auth=' +
            token
        );
      })
      .catch(() => alert('No valid token found'))
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
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
      })
      .catch(err => {
        alert('Something went wrong, sorry :/');
        console.log(err);
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
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        dispatch(removePlace(key));
        return fetch(
          `https://rn-course-1566437520068.firebaseio.com/places/${key}.json?auth=${token}`,
          {
            method: 'DELETE'
          }
        );
      })
      .catch(() => alert('No valid token found'))
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        console.log('Done!');
      })
      .catch(err => {
        alert('Something went wrong, sorry :/');
        console.log(err);
      });
  };
};

export const removePlace = key => {
  return {
    type: types.REMOVE_PLACE,
    key: key
  };
};

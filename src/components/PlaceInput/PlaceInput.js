import React from 'react';

import DefaultInput from '../UI/DefaultInput/DefaultInput';

const placeInput = ({ placeName, onPlaceNameChanged }) => {
  return (
    <DefaultInput
      placeholder="Place Name"
      value={placeName}
      onChangeText={onPlaceNameChanged}
    />
  );
};

export default placeInput;

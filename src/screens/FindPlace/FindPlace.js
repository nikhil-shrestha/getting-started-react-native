import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
  itemSelectedHandler = key => {
    console.log(key);
    const selPlace = this.props.places.find(place => place.key === key);
    Navigation.push(this.props.componentId, {
      component: {
        name: 'awesome-places.PlaceDetailScreen',
        passProps: {
          selectedPlace: selPlace
        },
        options: {
          topBar: {
            title: {
              text: selPlace.name
            }
          }
        }
      }
    });
  };

  render() {
    return (
      <View>
        <PlaceList
          places={this.props.places}
          onItemSelected={this.itemSelectedHandler}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.places
});

export default connect(mapStateToProps)(FindPlaceScreen);

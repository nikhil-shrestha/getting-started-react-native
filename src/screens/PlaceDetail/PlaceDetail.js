import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

import { deletePlace } from '../../store/places/places.actions';

class PlaceDetail extends Component {
  placeDeletedHandler = key => {
    this.props.onDeletePlace(key);
    Navigation.pop(this.props.componentId);
  };
  render() {
    const { selectedPlace } = this.props;
    return (
      <View style={styles.container}>
        <Image source={selectedPlace.image} style={styles.placeImage} />
        <Text style={styles.placeName}>{selectedPlace.name}</Text>
        <View>
          <TouchableOpacity
            onPress={() => this.placeDeletedHandler(selectedPlace.key)}
          >
            <View style={styles.deleteButton}>
              <Icon size={30} name="ios-trash" color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    width: '100%',
    height: 200
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  deleteButton: {
    alignItems: 'center'
  }
});

const mapDispatchToProps = dispatch => ({
  onDeletePlace: key => dispatch(deletePlace(key))
});

export default connect(
  null,
  mapDispatchToProps
)(PlaceDetail);

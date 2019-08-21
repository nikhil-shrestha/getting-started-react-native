import React, { Component } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';

import { addPlace } from '../../store/places/places.actions';

class SharePlace extends Component {
  state = {
    placeName: ''
  };

  constructor(props) {
    super(props);
    this.isSideDrawerVisible = false;
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'sideDrawerToggle') {
      !this.isSideDrawerVisible
        ? (this.isSideDrawerVisible = true)
        : (this.isSideDrawerVisible = false);
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: this.isSideDrawerVisible
          }
        }
      });
    }
  }

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });
  };

  placeSubmitHandler = () => {
    const { placeName } = this.state;
    if (placeName.trim() === '') {
      return;
    }

    this.props.onAddPlace(placeName);
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput
            placeName={this.state.placeName}
            onPlaceNameChanged={this.placeNameChangedHandler}
          />
          <View style={styles.button}>
            <Button title="Share the Place" onPress={this.placeSubmitHandler} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    margin: 8
  }
});

const mapDispatchToProps = dispatch => ({
  onAddPlace: placeName => dispatch(addPlace(placeName))
});

export default connect(
  null,
  mapDispatchToProps
)(SharePlace);

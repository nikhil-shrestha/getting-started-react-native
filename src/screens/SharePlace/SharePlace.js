import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import validate from '../../utils/validation';

import { addPlace, startAddPlace } from '../../store/places/places.actions';

class SharePlace extends Component {
  constructor(props) {
    super(props);
    this.isSideDrawerVisible = false;
    Navigation.events().bindComponent(this);
  }

  componentWillMount() {
    this.reset();
  }

  reset = () => {
    this.setState({
      controls: {
        placeName: {
          value: '',
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          value: null,
          valid: false
        }
      }
    });
  };

  componentDidUpdate() {
    if (this.props.placeAdded) {
      Navigation.mergeOptions(this.props.componentId, {
        bottomTabs: {
          currentTabIndex: 0
        }
      });
    }
  }

  componentDidAppear() {
    console.log('screen changed');
    this.props.onStartAddPlace();
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

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
  };

  placeNameChangedHandler = val => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        placeName: {
          ...prevState.controls.placeName,
          value: val,
          valid: validate(val, prevState.controls.placeName.validationRules),
          touched: true
        }
      }
    }));
  };

  locationPickedHandler = location => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        location: {
          value: location,
          valid: true
        }
      }
    }));
  };

  imagePickedHandler = image => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        image: {
          value: image,
          valid: true
        }
      }
    }));
  };

  placeSubmitHandler = () => {
    const { placeName, location, image } = this.state.controls;
    this.props.onAddPlace(placeName.value, location.value, image.value);
    this.reset();
    this.imagePicker.reset();
    this.locationPicker.reset();
  };

  render() {
    const { placeName, location } = this.state.controls;

    let submitButton = (
      <Button
        title="Share the Place"
        onPress={this.placeSubmitHandler}
        disabled={!placeName.valid && !location.valid}
      />
    );

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage
            onImagePicked={this.imagePickedHandler}
            ref={ref => (this.imagePicker = ref)}
          />
          <PickLocation
            onLocationPick={this.locationPickedHandler}
            ref={ref => (this.locationPicker = ref)}
          />
          <PlaceInput
            placeName={placeName.value}
            onPlaceNameChanged={this.placeNameChangedHandler}
          />
          <View style={styles.button}>{submitButton}</View>
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

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
  placeAdded: state.places.placeAdded
});

const mapDispatchToProps = dispatch => ({
  onAddPlace: (placeName, location, image) =>
    dispatch(addPlace(placeName, location, image)),
  onStartAddPlace: () => dispatch(startAddPlace())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharePlace);

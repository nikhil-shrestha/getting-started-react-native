import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../utils/validation';

import { tryAuth } from '../../store/auth/auth.actions';

import backgroundImage from '../../assets/images/background.jpg';

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'potrait' : 'landscape',
    authMode: 'login',
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
    }
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      };
    });
  };

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'potrait' : 'landscape'
    });
  };

  loginHandler = () => {
    const { email, password } = this.state.controls;
    const authData = {
      email: email.value,
      password: password.value
    };
    this.props.onLogin(authData);
    startMainTabs();
  };

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
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === 'password'
                ? validate(
                    prevState.controls.confirmPassword,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  render() {
    const { viewMode, authMode } = this.state;
    const { email, password, confirmPassword } = this.state.controls;

    let headingText = null;
    let confirmPasswordControl = null;
    if (viewMode === 'potrait') {
      headingText = (
        <MainText>
          <HeadingText>Please Login</HeadingText>
        </MainText>
      );
    }

    if (authMode === 'signup') {
      confirmPasswordControl = (
        <View
          style={
            viewMode === 'potrait'
              ? styles.potraitPasswordWrapper
              : styles.landscapePasswordWrapper
          }
        >
          <DefaultInput
            placeholder="Confirm Password"
            style={styles.input}
            value={confirmPassword.value}
            valid={confirmPassword.valid}
            touched={confirmPassword.touched}
            onChangeText={val => this.updateInputState('confirmPassword', val)}
          />
        </View>
      );
    }

    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground
            color="#29AAF4"
            onPress={this.switchAuthModeHandler}
          >
            Switch to {authMode === 'login' ? 'Sign Up' : 'Log In'}
          </ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your Email Address"
              style={styles.input}
              value={email.value}
              valid={email.valid}
              touched={email.touched}
              onChangeText={val => this.updateInputState('email', val)}
            />
            <View
              style={
                viewMode === 'potrait' || authMode === 'login'
                  ? styles.potraitPasswordContainer
                  : styles.landscapePasswordContainer
              }
            >
              <View
                style={
                  viewMode === 'potrait' || authMode === 'login'
                    ? styles.potraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput
                  placeholder="Password"
                  style={styles.input}
                  value={password.value}
                  valid={password.valid}
                  touched={password.touched}
                  onChangeText={val => this.updateInputState('password', val)}
                />
              </View>
              {confirmPasswordControl}
            </View>
          </View>
          <ButtonWithBackground
            color="#29AAF4"
            onPress={this.loginHandler}
            disabled={
              (!confirmPassword.valid && authMode === 'signup') ||
              !password.valid ||
              !email.valid
            }
          >
            Submit
          </ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#EEE',
    borderColor: '#BBB'
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  potraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordWrapper: {
    width: '45%'
  },
  potraitPasswordWrapper: {
    width: '100%'
  }
});

const mapDispatchToProps = dispatch => ({
  onLogin: authData => dispatch(tryAuth(authData))
});

export default connect(
  null,
  mapDispatchToProps
)(AuthScreen);

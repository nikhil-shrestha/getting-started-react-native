import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function DefaultInput(props) {
  return (
    <TextInput
      underlineColorAndroid="transparent"
      {...props}
      style={[
        styles.input,
        props.style,
        !props.valid && props.touched ? styles.invalid : null
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#EEE',
    padding: 5,
    marginTop: 8,
    marginBottom: 8
  },
  invalid: {
    backgroundColor: '#F9C0C0',
    borderColor: 'red'
  }
});

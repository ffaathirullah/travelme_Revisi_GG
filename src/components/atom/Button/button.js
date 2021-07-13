import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../utils/colors';
import PropTypes from 'prop-types';

export default function button({title, onpress, width, height, prior}) {
  return (
    <TouchableOpacity
      onPress={onpress}
      style={{width, height, ...styles.button(prior)}}>
      <Text style={styles.text(prior)}> {title} </Text>
    </TouchableOpacity>
  );
}

button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
  width: PropTypes.number,
  height: PropTypes.number,
  onpress: PropTypes.func,
};

const styles = StyleSheet.create({
  button: (type) => ({
    backgroundColor: type === 'primary' ? '#2D929A' : '#F1F1F1',
    borderWidth: 1,
    padding: 8,
    borderColor: '#2D929A',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 48
  }),
  text: (type) => ({
    color: type === 'primary' ? 'white' : '#2D929A',
    fontSize: type === 'primary' ? 20 : 18,
    fontWeight: type === 'primary' ? 'bold' : '400',
    textAlign: 'center',
    textAlignVertical: 'center',
  }),
});

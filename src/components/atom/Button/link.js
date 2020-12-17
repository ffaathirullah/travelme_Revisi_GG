import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function link({onPress, text}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.textLink}>{text} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textLink: {
    color: 'blue',
  },
});

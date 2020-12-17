import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {
  Icon_Air_Terjun,
  Icon_Gunung,
  Icon_Bukit,
  Icon_Danau,
  Icon_Hutan_Raya,
  Icon_Museum,
  Icon_Perkebunan,
  Icon_Peternakan
} from '../../assets/icons';
import {WarnaSekunder} from '../../utils';

const BottomIcon = ({title, type}) => {
  const Icon = () => {
    if (title === 'Hutan Raya') {
      return <Icon_Hutan_Raya />;
    }
    if (title === 'Air Terjun') {
      return <Icon_Air_Terjun />;
    }
    if (title === 'Gunung') {
      return <Icon_Gunung />;
    }
    if (title === 'Danau') {
      return <Icon_Danau />;
    }
    if (title === 'Museum') {
      return <Icon_Museum />;
    }
    if (title === 'Peternakan') {
      return <Icon_Peternakan />;
    }
    if (title === 'Bukit') {
      return <Icon_Bukit />;
    }
    if (title === 'Perkebunan') {
      return <Icon_Perkebunan />;
    }
    return <Icon_Hutan_Raya />;
  };
  return (
    <TouchableOpacity style={styles.container(type)}>
      <View style={styles.button(type)}>
        <Icon />
      </View>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BottomIcon;

const styles = StyleSheet.create({
  container: (type) => ({
    marginBottom: type === 'layanan' ? 12 : 0
  }),
  text: (type) => ({
    fontSize: 10,
    textAlign: 'center',
  }),
  button: (type) => ({
    backgroundColor: WarnaSekunder,
    padding: type === 'layanan' ? 12 : 7,
    borderRadius: 10,
  }),
});

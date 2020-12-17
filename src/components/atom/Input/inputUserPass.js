import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/Feather';

export default function inputUserPass({
  iconName,
  placeholder,
  type,
  onChangeText,
  keyBoardType = 'default',
}) {
  const [Visible, setVisible] = useState(false);

  return (
    <View style={styles.inputStyleContainer}>
      <Icon name={iconName} size={20} style={{paddingHorizontal: 8}} />
      <TextInput
        placeholder={placeholder}
        secureTextEntry={type === 'password' && !Visible}
        style={styles.inputStyle}
        autoCapitalize="none"
        keyboardType={keyBoardType}
        onChangeText={(a) => onChangeText(a)}
      />
      {type == 'password' && (
        <TouchableOpacity
          style={{paddingHorizontal: 7}}
          onPress={() => setVisible((prev) => !prev)}>
          <Icon name={Visible ? 'eye' : 'eye-off'} size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
}

inputUserPass.propTypes = {
  type: PropTypes.oneOf(['text', 'password']),
};

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
  },
  inputStyleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#EAEAEA'
  },
});

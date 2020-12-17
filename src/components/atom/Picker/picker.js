import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import IconFeather from 'react-native-vector-icons/Feather';

export default function picker({
  onValueChange,
  items = [],
  selectedValue,
  iconName,
  enabled = true,
}) {
  return (
    <View style={styles.pickerContainer}>
      <IconFeather name={iconName} size={20} style={{paddingHorizontal: 5}} />
      <Picker
        enabled={enabled}
        mode="dropdown"
        selectedValue={selectedValue}
        style={styles.pickerStyle}
        onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}>
        {items.map((item, index) => (
          <Picker.Item label={item?.label} value={item?.value} key={index} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    alignSelf: 'stretch',
    backgroundColor: '#EAEAEA'
  },
  pickerStyle: {
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: 20,
  },
});

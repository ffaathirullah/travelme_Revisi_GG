import {array} from 'prop-types';
import React, {useEffect} from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import NavIcon from '../../utils/navIcon';
import {Gap} from '../../components/atom';

const {width, height} = Dimensions.get('window');

export default function listDest({navigation}) {
  useEffect(() => {}, []);
  return (
    <ScrollView style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>
        Destinasi di daerah mu
      </Text>

      <Gap height={30} />
      <TouchableOpacity
        onPress={() => navigation.push('addDest')}
        activeOpacity={0.7}
        style={styles.buttonAddDest}>
        <Text>Tambah destinasi baru</Text>

        <FeatherIcon name="plus" size={24} />
      </TouchableOpacity>
      <Gap height={30} />

      <View style={styles.iconListContainer}>
        {NavIcon.map((a, idx) => (
          <TouchableOpacity
            onPress={() => navigation.push('lists', {type: a.type})}
            key={idx.toString()}
            style={{
              marginHorizontal: 7,
              width: 70,
              height: 65,
              marginVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={a.img} style={{height: 60, width: 60}} />
            <Gap height={4} />
            <Text adjustsFontSizeToFit numberOfLines={1}>
              {a.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Gap height={30} />

      <View>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          Rekomendasi Tempat
        </Text>
        <Gap height={10} />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {[...Array(10)].map((itemDUmmy, idx) => (
            <View
              key={idx}
              style={{
                height: 200,
                width: width / 2 - 40,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                marginHorizontal: 10,
                marginVertical: 10,
                overflow: 'hidden',
                borderRadius: 10,
              }}>
              <Image
                source={require('../../assets/png/dummyPemandangan.png')}
                style={{top: 0, bottom: 0, left: 0, right: 0}}
              />
              <Text style={{position: 'absolute', bottom: 5, color: 'white'}}>
                Rekomendasi {idx}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  buttonAddDest: {
    height: 50,
    left: 0,
    right: 0,
    borderRadius: 7,
    elevation: 3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#fcfcfc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

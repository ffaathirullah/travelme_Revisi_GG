import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Gap} from '../../components';

import {withFirebase} from '../../config/firebase/firebaseContext';

const ItemDestination = ({item, navigation}) => {
  console.log(item);
  return (
    <TouchableOpacity
      onPress={() => navigation.push('detail', {data: item, id: item.id})}
      style={styles.itemListContainer}>
      <Image
        source={{uri: item.photo[0]}}
        style={{
          height: 80,
          width: 80,
          marginHorizontal: 10,
        }}
      />
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
        <Gap height={5} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/png/iconClock.png')}
            style={{height: 14, width: 14, marginRight: 10}}
          />
          <Text>
            {item.openTime} - {item.closeTime}
          </Text>
        </View>
        <Gap height={5} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/png/iconLocation.png')}
            style={{height: 14, width: 14, marginRight: 10}}
          />
          <Text style={{textTransform: 'capitalize'}}>{item.city}</Text>
        </View>
      </View>
      {/* //Todo Status */}
      {/* <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end',
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 40,
          backgroundColor: '#a5faf0',
        }}>
        <Text>Status</Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

function listDestinations({route, navigation, firebase}) {
  const [ListDest, setListDest] = useState([]);
  const {type} = route.params;

  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    firebase
      .doListGetLocation(userInfo.prov, userInfo.city, type)
      .then((a) => setListDest(a));
    // return () => {
    //   cleanup
    // }
  }, []);

  return (
    <View style={{paddingHorizontal: 15, flex: 1, backgroundColor: 'white'}}>
      <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 20}}>
        Pilih Tempat Kerja Anda
      </Text>
      <FlatList
        data={ListDest}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <ItemDestination item={item} navigation={navigation} />
        )}
      />
    </View>
  );
}

export default withFirebase(listDestinations);

const styles = StyleSheet.create({
  itemListContainer: {
    overflow: 'hidden',
    left: 0,
    right: 0,
    height: 120,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
    marginTop: 18,
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 10,
  },
});

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Gap} from '../../../components';
import {withFirebase} from '../../../config/firebase/firebaseContext';
import listDest from '../../mainGuide/destination';

const ItemDestination = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.push('listDetail', {data: item, id: item.id})}
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
            source={require('../../../assets/png/iconClock.png')}
            style={{height: 14, width: 14, marginRight: 10}}
          />
          <Text>
            {item.openTime} - {item.closeTime}
          </Text>
        </View>
        <Gap height={5} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../../assets/png/iconLocation.png')}
            style={{height: 14, width: 14, marginRight: 10}}
          />
          <Text style={{textTransform: 'capitalize'}}>{item.city}</Text>
        </View>
        <Gap height={5} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../../assets/png/money.png')}
            style={{height: 14, width: 14, marginRight: 10}}
          />
          <Text style={{textTransform: 'capitalize'}}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function listScreen({route, navigation, firebase}) {
  const [listDest, setListDest] = useState(null);
  // const [infoScreen, setInfoScreen] = useState('mohonTunggu');
  const {type} = route.params;

  const userInfo = useSelector((state) => state.areaDestReducer);

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
        Ayo berwisata
      </Text>
      {listDest && listDest.length > 0 ? (
        <FlatList
          data={listDest}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <ItemDestination item={item} navigation={navigation} />
          )}
        />
      ) : listDest && listDest.length == 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Tidak ditemukan </Text>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text> mohon tunggu </Text>
          <ActivityIndicator color="blue" size="large" />
        </View>
      )}
    </View>
  );
}

export default withFirebase(listScreen);

const styles = StyleSheet.create({
  itemListContainer: {
    overflow: 'hidden',
    left: 0,
    right: 0,
    height: 120,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 0.2,

    marginTop: 18,
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 10,
  },
});

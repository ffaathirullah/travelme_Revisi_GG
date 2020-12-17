import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
// import {SharedElement} from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
import {withFirebase} from '../../config/firebase/firebaseContext';
import FeatherIcon from 'react-native-vector-icons/Feather';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {Gap} from '../../components/atom';

const {width, height} = Dimensions.get('window');

const headerIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

function detailPlace({route, navigation, firebase}) {
  const {myId, data} = route.params;

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        {/* <SharedElement id={`item.${myId}.photo`}> */}
        <Image source={{uri: data.photo[0]}} style={{width, height: 350}} />
        {/* </SharedElement> */}
        <View
          useNativeDriver={true}
          animation={headerIn}
          delay={150}
          duration={340}
          style={styles.confContainer}>
          <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center'}}
            onPress={() =>
              firebase
                .doAdminActionVerifPlaceAccept(data, myId)
                .then((a) => navigation.navigate('home'))
            }>
            <FeatherIcon name="check" size={24} />
            <Text>Setujui</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center'}}
            onPress={() =>
              firebase
                .doAdminActionVerifPlaceReject(myId)
                .then((a) => navigation.pop())
            }>
            <FeatherIcon name="x" size={24} />
            <Text>Tolak</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center'}}
            onPress={() =>
              navigation.push('checkList', {
                name: data.name,
                type: data.type,
                prov: data.prov,
                city: data.city,
                photo: [data.photo[0]],
                lat: data.lat,
                lang: data.lang,
                myId: myId,
              })
            }>
            <FeatherIcon name="arrow-right" size={24} />
            <Text>Periksa</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginVertical: 24, marginHorizontal: 16}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{data.name} </Text>
        <Gap height={7} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/png/iconClock.png')}
            style={{height: 15, width: 15, marginHorizontal: 10}}
          />

          <Text>
            {data['openTime']} - {data['closeTime']}
          </Text>
        </View>
        <Gap height={7} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/png/iconLocation.png')}
            style={{
              height: 15,
              width: 15,
              marginHorizontal: 10,
              resizeMode: 'contain',
            }}
          />

          <Text>{data.type}</Text>
        </View>
        <Gap height={7} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{textTransform: 'capitalize'}}>
            {data.prov} - {data.city}
          </Text>
        </View>
      </View>

      <View style={{marginHorizontal: 16}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          Deskripsi Singkat
        </Text>
        <Gap height={8} />
        <Text>{data.desc}</Text>
      </View>
      <Gap height={16} />
      <View style={{flex: 1, height: 400, marginHorizontal: 20}}>
        <Text>Lokasi</Text>
        <MapView
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: data.lat,
            longitude: data.lang,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker coordinate={{latitude: data.lat, longitude: data.lang}} />
        </MapView>
      </View>
    </ScrollView>
  );
}

// detailPlace.sharedElements = (route, otherRoute, showing) => {
//   const {myId} = route.params;
//   return [
//     {
//       id: `item.${myId}.photo`,
//     },
//   ];
// };

export default withFirebase(detailPlace);

const styles = StyleSheet.create({
  confContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    height: 50,
    width: 180,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 1,
  },
});

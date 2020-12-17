import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Gap} from '../../components/atom';
import {withFirebase} from '../../config/firebase/firebaseContext';

const ItemCompared = (props) => {
  const rejectFunc = () => {
    props.firebase
      .doAdminActionVerifPlaceReject(props.myId)
      .then(() => props.navigation.navigate('home'));
  };

  const acceptFunc = () => {
    props.navigation.navigate('detailPlace');
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 7,
        }}>
        <Image
          style={{
            height: 130,
            width: 130,
            resizeMode: 'cover',
          }}
          source={{uri: props.item.photo[0]}}
        />
        <View style={{marginHorizontal: 10}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {props.item.name}
          </Text>
          <Gap height={10} />
          <Text style={{textTransform: 'capitalize'}}>
            {props.item.prov} - {props.item.city}
          </Text>
          <Gap height={10} />
          <Text>{props.item.type}</Text>
          {props.pertama && (
            <View style={styles.confContainer}>
              <TouchableOpacity
                onPress={() => acceptFunc()}
                style={[styles.confButton, {backgroundColor: '#a5faf0'}]}>
                <Text>Setujui</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => rejectFunc()}
                style={[styles.confButton, {backgroundColor: '#ff6da0'}]}>
                <Text>Tolak</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <MapView
        // provider={PROVIDER_GOOGLE}
        style={{height: 270, left: 0, right: 0}}
        initialRegion={{
          latitude: -6.969526453655142,
          longitude: 107.62544702662755,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}>
        <Marker
          coordinate={{
            latitude: -6.969526453655142,
            longitude: 107.62544702662755,
          }}
        />
      </MapView>
    </View>
  );
};

function compareItem({route, firebase, navigation}) {
  const firstItem = route.params.first;
  const secondItem = route.params.second;
  const myId = route.params.myId;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}>
      <ItemCompared
        pertama={true}
        item={firstItem}
        firebase={firebase}
        myId={myId}
        navigation={navigation}
      />
      <Gap height={20} />
      <ItemCompared item={secondItem.item} />
    </View>
  );
}

export default withFirebase(compareItem);

const styles = StyleSheet.create({
  confButton: {
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 80,
    borderRadius: 7,
    elevation: 3,
  },
  confContainer: {
    right: 0,
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

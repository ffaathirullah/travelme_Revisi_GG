import React, {useEffect} from 'react';
import {StyleSheet, Dimensions, Text, View, Linking} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch} from 'react-redux';
import locationCheck from '../../config/redux/action/gpsAction';

const {height, width} = Dimensions.get('window');

export default function guideMap() {
  const OpenMap = (lat, lng) => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${lat},${lng}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };
  return (
    <View style={{flex: 1}}>
      <MapView
        style={{width, height: 400}}
        initialRegion={{
          latitude: -6.974027994937152,
          longitude: 107.63036776461826,
          latitudeDelta: 0.1,
          longitudeDelta: 0.05,
        }}>
        <Marker
          onPress={(s) =>
            OpenMap(
              s.nativeEvent.coordinate.latitude,
              s.nativeEvent.coordinate.longitude,
            )
          }
          title="judul map"
          description="descriptsi map"
          coordinate={{
            latitude: -6.974027994937152,
            longitude: 107.63036776461826,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({});

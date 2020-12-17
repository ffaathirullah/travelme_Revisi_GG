import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Gap} from '../../components/atom';
import {withFirebase} from '../../config/firebase/firebaseContext';

const ItemList = ({
  item,
  navigation,
  name,
  prov,
  city,
  photo,
  lat,
  lang,
  type,
  myId,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        item
          ? navigation.push('compare', {
              myId,
              first: {name, photo, lat, lang, prov, type, city},
              second: {item},
            })
          : navigation.pop();
      }}>
      <View
        style={{
          marginVertical: 4,
          borderWidth: 0.2,
          borderColor: '#000',
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderRadius: 7,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item ? item.photo[0] : photo[0]}}
            style={[
              {
                width: 70,
                height: 70,
                marginHorizontal: 10,
              },
            ]}
          />

          <View>
            <Text>{item ? item.name : name}</Text>
          </View>
        </View>

        <View style={{}}>
          <Text>{item ? item.prov : prov} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function checkList({firebase, route, navigation}) {
  const {prov, city, type, photo, name, lat, lang, myId} = route.params;
  const [List, setList] = useState([]);

  useEffect(() => {
    firebase.doListGetLocation(prov, city, type).then((a) => setList(a));
  }, []);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        paddingVertical: 15,
      }}>
      <Text style={{fontSize: 16}}>
        {prov} - {city}
      </Text>
      <Text style={{fontSize: 19}}>
        Jenis wisata :
        <Text style={{fontSize: 19, fontWeight: 'bold'}}> {type}</Text>
      </Text>
      <Gap height={19} />
      <ItemList
        myId={myId}
        type={type}
        name={name}
        prov={prov}
        photo={photo}
        navigation={navigation}
      />
      <Gap height={10} />
      <View
        style={{height: 1, borderBottomWidth: 0.2, borderBottomColor: '#000'}}
      />
      <Gap height={10} />
      <Text style={{fontSize: 16}}>Bandingkan Dengan :</Text>
      <Gap height={10} />
      <View>
        <FlatList
          data={List}
          renderItem={({item}) => (
            <ItemList
              myId={myId}
              item={item}
              photo={photo}
              name={name}
              lat={lat}
              lang={lang}
              navigation={navigation}
              city={city}
              prov={prov}
              type={type}
            />
          )}
          keyExtractor={(item, idx) => item + idx}
        />
      </View>
    </View>
  );
}

export default withFirebase(checkList);

const styles = StyleSheet.create({});

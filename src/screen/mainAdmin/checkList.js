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
import {TextInput} from 'react-native-gesture-handler';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
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
  const [listRequest, setListRequest] = useState(null);
  const [tempListRequest, settempListRequest] = useState(listRequest);
  const [sortList, setSortList] = useState(true);
  const [searchVal, setSearchVal] = useState('');

  const searchPlace = () => {
    const check = listRequest.filter((a) =>
      a.name.toLowerCase().includes(searchVal.toLowerCase()),
    );
    settempListRequest(check);
  };

  const sortListFunc = (ListReq, sortList) => {
    const newList = [...ListReq];

    newList.sort((a, b) => {
      if (sortList) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
      } else {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
      }
      return 0;
    });

    return newList;
  };
  useEffect(() => {
    settempListRequest(listRequest);
    if (tempListRequest) {
      settempListRequest((list) => {
        const newList = sortListFunc(list);
        return newList;
      });
    }
  }, [sortList, listRequest]);
  useEffect(() => {
    firebase.doListGetLocation(prov, city, type).then((a) => setListRequest(a));
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
      <View style={styles.navBar}>
        <View>
          <TouchableOpacity
            onPress={() => setSortList((prev) => !prev)}
            style={styles.btnSort}>
            <IconMaterial name="sort" size={30} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 0.2,
            borderRadius: 10,
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <TextInput
            style={{flex: 1}}
            onChangeText={(val) => setSearchVal(val)}
          />
          <TouchableOpacity onPress={() => searchPlace()}>
            <Text>Seach</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Gap height={10} />
      <ScrollView style={styles.scrollView}>
        <View>
          {tempListRequest && (
            <FlatList
              data={tempListRequest}
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
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default withFirebase(checkList);

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingRight: 30,
  },
  btnSort: {
    margin: 5,
    padding: 5,
  },
});

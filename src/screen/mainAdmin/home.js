import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image, Button} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {withFirebase} from '../../config/firebase/firebaseContext';
import firestore from '@react-native-firebase/firestore';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

import {useDispatch} from 'react-redux';

const ItemList = ({item, navigation}) => {
  const {data, id} = item;

  return (
    <TouchableOpacity
      onPress={() => navigation.push('detailPlace', {myId: id, data})}>
      <View style={styles.cardContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: data?.photo[0]}}
            style={[
              styles.image,
              {
                width: 70,
                height: 70,
                marginHorizontal: 10,
              },
            ]}
          />

          <Text>{data?.name}</Text>
        </View>

        <View>
          <Text style={{textTransform: 'capitalize'}}>{data?.prov} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function home({firebase, navigation, route}) {
  const [listRequest, setListRequest] = useState(null);
  const [tempListRequest, settempListRequest] = useState(listRequest);
  const [sortList, setSortList] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  const dispatch = useDispatch();

  const logoutFunc = async () => {
    const logoutProc = await firebase.doLogout();
    if (logoutProc == 'logout') {
      dispatch({type: 'LOGOUTADMINUSER'});
    }
  };

  const searchPlace = () => {
    const check = listRequest.filter((a) =>
      a.data.name.toLowerCase().includes(searchVal.toLowerCase()),
    );
    settempListRequest(check);
  };

  const sortListFunc = (ListReq, sortList) => {
    const newList = [...ListReq];

    newList.sort((a, b) => {
      if (sortList) {
        if (a.data.name < b.data.name) {
          return -1;
        }
        if (a.data.name > b.data.name) {
          return 1;
        }
      } else if (!sortList) {
        if (a.data.name > b.data.name) {
          return -1;
        }
        if (a.data.name < b.data.name) {
          return 1;
        }
      }
      return 0;
    });

    return newList;
  };

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () =>
      firebase.doAdminGetRequestLocation().then((a) => setListRequest(a)),
    );
    return () => {
      subscribe;
    };
  }, [navigation]);

  useEffect(() => {
    settempListRequest(listRequest);
    if (tempListRequest) {
      settempListRequest((list) => {
        const newList = sortListFunc(list);
        return newList;
      });
    }
  }, [sortList, listRequest]);

  return (
    <View>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.btnLogout} onPress={() => logoutFunc()}>
          <IconMaterial name="logout" size={30} />
        </TouchableOpacity>
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
      {tempListRequest && (
        <FlatList
          style={{margin: 20}}
          data={tempListRequest}
          keyExtractor={(a) => a.id}
          renderItem={({item}) => (
            <ItemList item={item} navigation={navigation} />
          )}
        />
      )}
    </View>
  );
}

export default withFirebase(home);

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 4,
    borderWidth: 0.2,
    borderColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  btnLogout: {
    alignSelf: 'flex-start',
    margin: 5,
    padding: 5,
    transform: [{rotate: '180deg'}],
  },
  btnSort: {
    margin: 5,
    padding: 5,
  },
});

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {withFirebase} from '../../config/firebase/firebaseContext';
import firestore from '@react-native-firebase/firestore';

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
  const [listRequest, setListRequest] = useState([]);
  // const deleteIndex = route.params?.deleteIndex;
  const dispatch = useDispatch();

  const logoutFunc = async () => {
    const logoutProc = await firebase.doLogout();
    if (logoutProc == 'logout') {
      dispatch({type: 'LOGOUTADMINUSER'});
    }
  };

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () =>
      firebase.doAdminGetRequestLocation().then((a) => setListRequest(a)),
    );

    return () => {
      subscribe;
    };
  }, [navigation]);
  return (
    <View>
      <Button title="logout" onPress={() => logoutFunc()} />
      {listRequest.map((item, idx) => (
        <View key={idx}>
          <ItemList item={item} navigation={navigation} />
        </View>
      ))}
      {/* <FlatList
        style={{margin: 20}}
        data={listRequest}
        keyExtractor={(a) => a.id}
        renderItem={({item}) => ItemList(item, navigation)}
      /> */}
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
});

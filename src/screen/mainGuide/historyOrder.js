import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {withFirebase} from '../../config/firebase/firebaseContext';
import auth from '@react-native-firebase/auth';
import {Gap} from '../../components';

const renderDate = (date) => {
  const minute = date.getMinutes() + 1;
  const hour = date.getHours() + 1;
  const theDate = date.getDate();
  const month = date.getMonth() + 1;

  const format = `${month}/${theDate}/${hour}:${minute}`;

  return format;
};

const ItemRender = ({item, firebase}) => {
  const [guideInfo, setGuideInfo] = useState({});
  const [placeInfo, setPlaceInfo] = useState({});

  const myUid = auth().currentUser.uid;

  const itemDate = new Date(item.date);

  const historyDate = renderDate(itemDate);

  useEffect(() => {
    firebase.doGetCurrentUserInfo(item.otherUid).then((a) => setGuideInfo(a));
    firebase
      .doGetPlaceDetail(item.prov, item.city, item.placeUID)
      .then((a) => setPlaceInfo(a));

    return () => {};
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        left: 0,
        right: 0,
        borderColor: '#000',
        borderWidth: 0.2,
        borderRadius: 10,
        flexDirection: 'row',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={
            placeInfo.photo
              ? {uri: placeInfo.photo[0]}
              : require('../../assets/png/dummyPemandangan.png')
          }
          style={{height: 80, width: 80, resizeMode: 'cover', borderRadius: 25}}
        />
        <Gap width={10} />
        <View>
          <Text
            style={{
              textTransform: 'capitalize',
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            {placeInfo?.name}
          </Text>
          <Gap height={10} />
          <Text style={{textTransform: 'capitalize', fontSize: 14}}>
            oleh: {guideInfo.name}
          </Text>
        </View>
      </View>
      <Text
        style={{
          position: 'absolute',
          right: 10,
          top: 5,
          color: '#909090',
          fontSize: 15,
        }}>
        {historyDate}
      </Text>
      <View
        style={{
          flexWrap: 'wrap',
          paddingHorizontal: 10,
          right: 0,
          position: 'absolute',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            textTransform: 'capitalize',
            fontWeight: 'bold',
            fontSize: 14,
          }}>
          {item.status}
        </Text>
      </View>
    </View>
  );
};

function historyOrder({navigation, firebase}) {
  const [historyList, setHistoryList] = useState([]);

  const myUid = auth().currentUser.uid;

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () =>
      firebase.doUserGetHistory(myUid).then((a) => setHistoryList(a)),
    );

    return () => {
      subscribe;
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>History</Text>
      <Gap height={20} />
      <FlatList
        data={historyList}
        keyExtractor={(item) => item.date.toString()}
        renderItem={({item}) => (
          <ItemRender item={item} myUid={myUid} firebase={firebase} />
        )}
      />
    </View>
  );
}

export default withFirebase(historyOrder);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

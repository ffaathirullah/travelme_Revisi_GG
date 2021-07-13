import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image, Linking} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Gap} from '../../../components';
import {withFirebase} from '../../../config/firebase/firebaseContext';
import fireStore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ItemRender = ({item, firebase, index, myUid}) => {
  const [guideInfo, setGuideInfo] = useState({});
  const [requestStatus, setRequestStatus] = useState({});
  const [placeInfo, setPlaceInfo] = useState(null);

  const myRequest = useSelector((state) => state.myRequest);

  const subscribePath = fireStore()
    .collection('user')
    .doc(myUid)
    .collection('myRequest')
    .doc(item.otherUid);

  const cancelFunc = async () => {
    await firebase.doUserOrderToHistoryGuide(myUid, item.otherUid, 'cancel');
  };

  useEffect(() => {
    const step1 = firebase
      .doGetPlaceDetail(item.prov, item.city, item.placeUID)
      .then((a) => setPlaceInfo(a));

    const step2 = firebase
      .doGetCurrentUserInfo(item.otherUid)
      .then((a) => setGuideInfo(a));

    const subscribe = subscribePath.onSnapshot((doc) => {
      setRequestStatus(doc.data());
      console.log(doc.data());
    });

    return () => {
      step1;
      step2;
      subscribe;
    };
  }, []);

  return (
    <View style={styles.itemOrderContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{uri: guideInfo?.profileImage}}
          style={{height: 80, width: 80, resizeMode: 'cover', borderRadius: 25}}
        />
        <Gap width={10} />
        <View>
          <Text style={{fontWeight: 'bold'}}>{guideInfo?.name}</Text>
          <Gap height={5} />
          <Text>{placeInfo?.name} </Text>
          <Gap height={5} />
          <Text style={{textTransform: 'capitalize'}}>
            {myRequest[index]?.status == 'request'
              ? 'Menunggu konfirmasi'
              : 'Disetujui'}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexWrap: 'wrap',
          paddingHorizontal: 10,
          right: 0,
          position: 'absolute',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <Gap height={5} />
        <TouchableOpacity
          disabled={requestStatus?.status !== 'request'}
          onPress={() => cancelFunc()}
          style={{
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              requestStatus?.status === 'request' ? '#fD929A' : '#909090',
            borderRadius: 7,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function onOrder({firebase}) {
  const myRequest = useSelector((state) => state.myRequest);
  const [myListOrder, setMyListOrder] = useState([]);

  const myUid = auth().currentUser.uid;

  const pathReq = fireStore()
    .collection('user')
    .doc(myUid)
    .collection('myRequest');

  useEffect(() => {
    const subscrib = pathReq.onSnapshot((querySnap) => {
      querySnap.docChanges().forEach((change) => {
        if (change.type === 'added') {
          setMyListOrder((prevData) => [...prevData, change.doc.data()]);
        }

        if (change.type === 'modified') {
          setMyListOrder((prevData) => {
            const getIndex = prevData
              .map((id) => id.otherUid)
              .indexOf(change.doc.data().otherUid);
            prevData[getIndex] = change.doc.data();

            return prevData;
          });
        }
        if (change.type === 'removed') {
          setMyListOrder((prevData) =>
            prevData.filter((a) => a.date != change.doc.data().date),
          );
        }
      });
    });
    return () => {
      subscrib;
    };
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}>
      <FlatList
        data={myListOrder}
        keyExtractor={(item) => item.date.toString()}
        renderItem={({item, index}) => (
          <ItemRender
            item={item}
            firebase={firebase}
            index={index}
            myUid={myUid}
          />
        )}
      />
    </View>
  );
}

export default withFirebase(onOrder);

const styles = StyleSheet.create({
  itemOrderContainer: {
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
  },
});

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  Linking,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';

import {Button, Gap} from '../../components/atom';
import {withFirebase} from '../../config/firebase/firebaseContext';

const {width, height} = Dimensions.get('window');

const ItemRenderAcc = ({item, firebase, myUid}) => {
  const [senderInfo, setSenderInfo] = useState({});
  const [placeInfo, setPlaceInfo] = useState({});

  useEffect(() => {
    const step1 = firebase
      .doGetCurrentUserInfo(item.otherUid)
      .then((a) => setSenderInfo(a));
    const step2 = firebase
      .doGetPlaceDetail(item.prov, item.city, item.placeUID)
      .then((a) => setPlaceInfo(a));

    return () => {
      step1;
      step2;
    };
  }, []);

  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 14}}>{placeInfo.name}</Text>
        <Gap height={5} />
        <Text>oleh: {senderInfo.name} </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `whatsapp://send?text=hello&phone=62${senderInfo.contact}`,
            )
          }
          style={{
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2D919A',
            borderRadius: 7,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <Text style={{color: '#fff'}}>Pesan</Text>
        </TouchableOpacity>
        <Gap height={7} />
        <TouchableOpacity
          onPress={() =>
            firebase.doUserOrderToHistoryGuide(
              myUid,
              item.otherUid,
              'completed',
            )
          }
          style={{
            backgroundColor: '#2D929A',
            height: 25,
            width: 70,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>Selesai</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ItemRenderReq = ({item, firebase, myUid}) => {
  const [placeInfo, setplaceInfo] = useState(null);
  const [guideInfo, setGuideInfo] = useState(null);

  useEffect(() => {
    firebase
      .doGetPlaceDetail(item.prov, item.city, item.placeUID)
      .then((a) => setplaceInfo(a));
    firebase.doGetCurrentUserInfo(item.otherUid).then((a) => setGuideInfo(a));
  }, []);

  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 14}}>
          {placeInfo?.name}
        </Text>
        <Gap height={5} />
        <Text>oleh: {guideInfo?.name}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => firebase.doGuideAcceptRequest(myUid, item.otherUid)}
          style={{
            backgroundColor: '#2D929A',
            height: 25,
            width: 70,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>Terima</Text>
        </TouchableOpacity>
        <Gap height={5} />
        <TouchableOpacity
          onPress={() =>
            firebase.doUserOrderToHistoryGuide(myUid, item.otherUid, 'rejected')
          }
          style={{
            backgroundColor: '#EBEFEF',
            height: 25,
            width: 70,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Tolak</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function home({firebase}) {
  const [dataAcc, setDataAcc] = useState([]);
  const [dataReq, setDataReq] = useState([]);

  const myUid = auth().currentUser.uid;

  const userInfo = useSelector((state) => state.userInfo);

  const pathReq = fireStore()
    .collection('user')
    .doc(myUid)
    .collection('myRequest');

  useEffect(() => {
    const subscribeAccReq = pathReq
      .where('status', '==', 'accepted')
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            setDataAcc((prevData) => [...prevData, change.doc.data()]);
          }

          if (change.type === 'removed') {
            setDataAcc((prevData) =>
              prevData.filter((a) => a.date != change.doc.data().date),
            );
          }
        });
      });

    return () => {
      subscribeAccReq;
    };
  }, []);

  useEffect(() => {
    const subscribeInReq = pathReq
      .where('status', '==', 'request')
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            setDataReq((prevData) => [...prevData, change.doc.data()]);
          }

          if (change.type === 'removed') {
            setDataReq((prevData) =>
              prevData.filter((a) => a.date != change.doc.data().date),
            );
          }
        });
      });
    return () => {
      subscribeInReq;
    };
  }, []);

  return (
    <View style={{backgroundColor: '#fff', flex: 1, paddingHorizontal: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 15,
          alignItems: 'center',
        }}>
        <Text style={styles.textTravelme}>TravelMe</Text>

        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',

            width: 130,
            borderRadius: 10,
            paddingVertical: 5,
            backgroundColor: 'rgba(0,0,0,.1)',
          }}>
          <Image
            source={require('../../assets/png/iconLocation.png')}
            style={{
              height: 13,
              width: 13,
              resizeMode: 'cover',
              marginHorizontal: 8,
            }}
          />
          <Text style={{textTransform: 'capitalize'}}>{userInfo?.city}</Text>
        </View>
      </View>
      <Gap height={35} />
      <View>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Dalam Proses</Text>
        <Gap height={16} />

        <FlatList
          keyExtractor={(item) => item.date.toString()}
          data={dataAcc}
          renderItem={({item}) => (
            <ItemRenderAcc item={item} firebase={firebase} myUid={myUid} />
          )}
        />
      </View>
      <Gap height={30} />
      <View>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Pesanan Baru</Text>
        <Gap height={16} />

        <FlatList
          data={dataReq}
          keyExtractor={(item) => item.date.toString()}
          renderItem={({item}) => (
            <ItemRenderReq item={item} firebase={firebase} myUid={myUid} />
          )}
        />
      </View>
    </View>
  );
}

export default withFirebase(home);

const styles = StyleSheet.create({
  cardContainer: {
    left: 0,
    right: 0,
    height: 80,
    paddingHorizontal: 20,
    borderWidth: 0.2,
    borderColor: '#000',
    borderRadius: 10,
    marginVertical: 7,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTravelme: {
    fontSize: 20,
    color: '#2D929A',
    fontWeight: 'bold',
  },
});

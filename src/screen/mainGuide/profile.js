import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Gap} from '../../components/atom';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {withFirebase} from '../../config/firebase/firebaseContext';
import FeatherIcon from 'react-native-vector-icons/Feather';
import authFirebase from '@react-native-firebase/auth';
import StarRating from 'react-native-star-rating';
import {TextInput} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const renderDate = (date) => {
  const minute = date.getMinutes() + 1;
  const hour = date.getHours() + 1;
  const theDate = date.getDate();
  const month = date.getMonth() + 1;

  const format = `${month}/${theDate}/${hour}:${minute}`;

  return format;
};

const ItemReview = ({item, firebase}) => {
  const [senderInfo, setSenderInfo] = useState({});

  useEffect(() => {
    firebase.doGetCurrentUserInfo(item.sender).then((a) => setSenderInfo(a));
  }, []);

  return (
    <View
      style={{
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingHorizontal: 7,
        paddingVertical: 15,
        elevation: 3,
        marginVertical: 5,
        borderRadius: 10,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          {senderInfo.name}
        </Text>
        <Text>20/10/2020</Text>
      </View>
      <StarRating
        rating={item.rate}
        starSize={25}
        containerStyle={{width: 140}}
        maxStars={5}
        fullStarColor={'#fa2'}
        disabled={true}
      />
      <Gap height={15} />
      <Text style={{letterSpacing: 1, fontSize: 16}} adjustsFontSizeToFit>
        {item.message}
      </Text>
    </View>
  );
};

const WorkPlaceCard = ({item, prov, city, firebase}) => {
  const [Data, setData] = useState({});

  const myUid = authFirebase().currentUser?.uid;

  useEffect(() => {
    firebase
      .doGuideGetPlaceInfo(prov, city, item.idWorkPlace)
      .then((a) => setData(a));
  }, []);

  return (
    <View style={styles.workPlaceCardContainer}>
      <TouchableOpacity
        onPress={() =>
          firebase.doGuideMinPlaceWork(prov, city, item.idWorkPlace, myUid)
        }
        style={{
          position: 'absolute',
          top: 5,
          right: 7,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <FeatherIcon name="trash" size={20} />
      </TouchableOpacity>
      <Image
        source={require('../../assets/png/dummyPemandangan.png')}
        style={{height: 60, width: 60}}
      />
      <Gap width={10} />
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{Data.name}</Text>
        <Gap height={10} />
        <Text style={{textTransform: 'capitalize'}}>
          {Data.prov}, {Data.city}
        </Text>
      </View>
    </View>
  );
};

function profile({navigation, firebase}) {
  const userInfo = useSelector((state) => state.userInfo);
  const workPlace = useSelector((state) => state.workPlace);
  const [myReview, setMyReview] = useState([]);
  const [myPrice, setMyPrice] = useState(userInfo.price || 0);

  const getArrayRate = (myReview && myReview.map((a) => a.rate)) || [0, 0];
  const getRateGuide = getArrayRate && getArrayRate.reduce((a, b) => a + b, 0);

  const dispatch = useDispatch();
  const myUid = authFirebase().currentUser.uid;

  const logoutFunc = async () => {
    const logoutProc = await firebase.doLogout();
    if (logoutProc == 'logout') {
      dispatch({type: 'LOGOUTADMINUSER'});
    }
  };

  useEffect(() => {
    firebase.doGuideGetReview(myUid).then((a) => setMyReview(a));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontWeight: 'bold', fontSize: 24}}>Profile</Text>
        <View style={styles.settingContainer}>
          <TouchableOpacity onPress={() => navigation.push('setting')}>
            <MaterialIcon size={24} name="settings" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => logoutFunc()}>
            <MaterialIcon size={24} name="logout" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {userInfo.profileImage ? (
          <Image
            source={{uri: userInfo.profileImage && userInfo.profileImage}}
            style={{
              height: 120,
              width: 120,
              borderRadius: 60,
            }}
          />
        ) : (
          <View
            style={{
              height: 120,
              width: 120,
              borderRadius: 60,
              backgroundColor: 'black',
            }}
          />
        )}

        <Gap height={7} />
        <Text style={{color: '#767676', fontSize: 14}}>Guide</Text>
        <Gap height={7} />
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{userInfo.name}</Text>
        <Gap height={7} />
        <Text style={{fontSize: 14}}>{userInfo.contact} </Text>
        <Gap height={7} />
        <StarRating
          disabled={true}
          starSize={25}
          containerStyle={{width: 140}}
          maxStars={5}
          rating={getRateGuide}
          fullStarColor={'#fa2'}
        />
        <Gap height={7} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={styles.saldoContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                onChangeText={(a) => setMyPrice(a)}
                value={myPrice}
                placeholder={myPrice.toString()}
              />
              <Text>/Jam </Text>
            </View>
            <TouchableOpacity
              style={styles.topUpContainer}
              onPress={() => firebase.doGuideSetPrice(userInfo.id, myPrice)}>
              <Text>Set price</Text>
            </TouchableOpacity>
          </View>
          <Gap width={7} />
          <View style={styles.saldoContainer}>
            <View>
              <Text>Rp. {userInfo.balance || 0} </Text>
            </View>
            <TouchableOpacity
              style={styles.topUpContainer}
              onPress={() => firebase.doGuideWithDraw(userInfo.id)}>
              <Text>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Gap height={30} />

      <View style={{paddingHorizontal: 20}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          Wilayah Kerja Saya
        </Text>
        <Gap height={15} />
        <FlatList
          scrollEnabled={false}
          data={workPlace}
          renderItem={({item}) => (
            <WorkPlaceCard
              item={item}
              prov={userInfo.prov}
              city={userInfo.city}
              firebase={firebase}
            />
          )}
          keyExtractor={(item) => item.idWorkPlace}
        />
      </View>

      <Gap height={30} />

      <View style={styles.reviewContainer}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Review</Text>
        <Gap height={15} />

        <FlatList
          data={myReview}
          renderItem={({item}) => (
            <ItemReview
              item={item}
              firebase={firebase}
              keyExtractor={(item) => item.message}
            />
          )}
        />
      </View>
    </ScrollView>
  );
}

export default withFirebase(profile);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    height: 110,
    width,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewContainer: {paddingHorizontal: 20},
  saldoContainer: {
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 0.2,
    borderColor: '#2D929A',
    borderRadius: 9,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
  },
  settingContainer: {
    position: 'absolute',
    top: 10,
    right: 5,
    height: 40,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  topUpContainer: {
    height: 50,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderColor: '#2D929A',
    borderTopWidth: 0.4,
    borderBottomWidth: 0.4,
    borderLeftWidth: 0.2,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
  },
  workPlaceCardContainer: {
    backgroundColor: '#fff',
    left: 0,
    right: 0,
    height: 100,
    paddingHorizontal: 7,
    paddingVertical: 15,
    elevation: 3,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

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
  Linking,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Gap} from '../../../components/atom';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import FeatherIcon from 'react-native-vector-icons/Feather';
import authFirebase from '@react-native-firebase/auth';
import {withFirebase} from '../../../config/firebase/firebaseContext';
import StarRating from 'react-native-star-rating';

const {width, height} = Dimensions.get('window');

const WorkPlaceCard = ({item, prov, city, firebase}) => {
  const [Data, setData] = useState({});

  //Todo change uid
  const myUid = authFirebase().currentUser?.uid;

  useEffect(() => {
    firebase
      .doGuideGetPlaceInfo(prov, city, item.idWorkPlace)
      .then((a) => setData(a));
  }, []);

  return (
    <View style={styles.workPlaceCardContainer}>
      <Image
        source={require('../../../assets/png/dummyPemandangan.png')}
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

const RateCard = ({item, firebase}) => {
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
        disabled={true}
        starSize={18}
        containerStyle={{width: 120}}
        maxStars={5}
        rating={item.rate}
        fullStarColor={'#fa2'}
      />
      <Gap height={15} />
      <Text style={{letterSpacing: 1, fontSize: 16}} adjustsFontSizeToFit>
        {item.message}
      </Text>
    </View>
  );
};

function seekGuideProfile({navigation, firebase, route}) {
  const {data} = route.params;
  const [workPlace, setWorkPlace] = useState([]);
  const [reviewGuide, setReviewGuide] = useState([{}]);
  const getArrayRate = (reviewGuide && reviewGuide.map((a) => a.rate)) || [
    0,
    0,
  ];
  const getRateGuide = getArrayRate && getArrayRate.reduce((a, b) => a + b, 0);

  const userInfo = useSelector((state) => state.userInfo);

  const userBalance = userInfo.balance || 0;
  const dataPrice = data?.price || 0;

  console.log('price', dataPrice);
  console.log('balance', userBalance);

  useEffect(() => {
    firebase.doGuideGetPlaceWork(data.id).then((a) => setWorkPlace(a));
    firebase.doGuideGetReview(data.id).then((a) => setReviewGuide(a));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{
            position: 'absolute',
            // backgroundColor: 'red',
            left: 10,
            top: 15,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <FeatherIcon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', fontSize: 24}}>Guide</Text>
      </View>
      <View
        style={{
          height: 260,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {data.profileImage ? (
          <Image
            source={{uri: data.profileImage && data.profileImage}}
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

        <Gap height={10} />
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{data.name}</Text>
        <Gap height={7} />
        <Text>Rating User</Text>
        <Gap height={7} />
        <Text>Rp. {dataPrice}/Jam</Text>
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
        <View style={{flexDirection: 'row'}}>
          <Gap width={10} />

          {userBalance < dataPrice ? (
            <View
              style={{
                // width: 100,
                backgroundColor: '#909090',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <Text>Saldo tidak cukup</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                // width: 100,
                backgroundColor: '#2D929A',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <Text style={{textAlign: 'center', color: '#fff'}}>
                Kirim permintaan
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Gap height={30} />

      <View style={{paddingHorizontal: 20}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Wilayah Kerja</Text>
        <Gap height={15} />
        <View>
          <View>
            <FlatList
              scrollEnabled={false}
              data={workPlace}
              renderItem={({item}) => (
                <WorkPlaceCard
                  item={item}
                  prov={data.prov}
                  city={data.city}
                  firebase={firebase}
                />
              )}
              keyExtractor={(item) => item.idWorkPlace}
            />
          </View>
        </View>
      </View>

      <Gap height={30} />

      <View style={styles.reviewContainer}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Review</Text>
        <Gap height={15} />
        <FlatList
          data={reviewGuide}
          renderItem={({item}) => <RateCard item={item} firebase={firebase} />}
        />
      </View>
    </ScrollView>
  );
}

export default withFirebase(seekGuideProfile);

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
});

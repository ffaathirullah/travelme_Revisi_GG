import {firebase} from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {useSelector} from 'react-redux';
import {Gap} from '../../../components';
import {withFirebase} from '../../../config/firebase/firebaseContext';

function reviewServices({route, navigation, firebase}) {
  const [placeInfo, setPlaceInfo] = useState({});
  const [reviewGuide, setReviewGuide] = useState('');
  const [reviewPlace, setReviewPlace] = useState('');
  const [starGuide, setStarGuide] = useState(0);
  const [starPlace, setStarPlace] = useState(0);

  const date = new Date().getTime();

  const {data, guideInfo} = route.params;

  const userInfo = useSelector((state) => state.userInfo);

  const sendReviewFunc = async () => {
    try {
      await firebase.doUserGiveReview(
        userInfo.id,
        guideInfo.id,
        data.placeUID,
        data.prov,
        data.city,
        reviewGuide,
        starGuide,
        reviewPlace,
        starPlace,
        data.idHistory,
        date,
      );
      navigation.popToTop();
    } catch (error) {}
  };

  useEffect(() => {
    firebase
      .doGetPlaceDetail(data.prov, data.city, data.placeUID)
      .then((a) => setPlaceInfo(a));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerGuide}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Guide</Text>
        <Gap height={10} />
        <View style={{alignItems: 'baseline', flexDirection: 'row'}}>
          <Image
            source={{uri: guideInfo.profileImage}}
            style={{height: 60, width: 60, borderRadius: 20}}
          />
          <Gap width={10} />
          <Text>{guideInfo.name}</Text>
        </View>
        <Gap height={10} />
        <StarRating
          disabled={false}
          starSize={25}
          containerStyle={{width: 140}}
          maxStars={5}
          rating={starGuide}
          fullStarColor={'#fa2'}
          selectedStar={(rating) => setStarGuide(rating)}
        />
        <Gap height={10} />
        <View
          style={{
            borderColor: '#000',
            borderWidth: 0.5,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}>
          <TextInput
            value={reviewGuide}
            numberOfLines={8}
            style={{textAlignVertical: 'top'}}
            placeholder="Tuliskan pendapatmu tentang guide ini"
            onChangeText={(text) => setReviewGuide(text)}
          />
        </View>
      </View>
      <Gap height={10} />
      <View
        style={{left: 0, right: 0, height: 1, backgroundColor: '#909090'}}
      />
      <Gap height={10} />

      <View style={styles.containerPlace}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Place</Text>
        <Gap height={10} />
        <View style={{alignItems: 'baseline', flexDirection: 'row'}}>
          <Image
            source={
              placeInfo.photo
                ? {uri: placeInfo.photo[0]}
                : require('../../../assets/png/dummyPemandangan.png')
            }
            style={{height: 60, width: 60, borderRadius: 20}}
          />
          <Gap width={10} />
          <Text>{placeInfo?.name}</Text>
        </View>
        <Gap height={10} />
        <StarRating
          disabled={false}
          starSize={25}
          containerStyle={{width: 140}}
          maxStars={5}
          rating={starPlace}
          fullStarColor={'#fa2'}
          selectedStar={(rating) => setStarPlace(rating)}
        />
        <Gap height={10} />
        <View
          style={{
            borderColor: '#000',
            borderWidth: 0.5,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}>
          <TextInput
            value={reviewPlace}
            numberOfLines={8}
            style={{textAlignVertical: 'top'}}
            placeholder="Tuliskan pendapatmu tentang guide ini"
            onChangeText={(text) => setReviewPlace(text)}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => sendReviewFunc()}
        style={{
          elevation: 3,
          height: 15,
          borderRadius: 7,
          backgroundColor: '#4Dc25A',
          paddingVertical: 20,
          paddingHorizontal: 15,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Kirim</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default withFirebase(reviewServices);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  containerGuide: {
    elevation: 3,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  containerPlace: {
    elevation: 3,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

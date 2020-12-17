import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Gap} from '../../../components';
import {withFirebase} from '../../../config/firebase/firebaseContext';
import fireStore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const renderDate = (date) => {
  const minute = date.getMinutes() + 1;
  const hour = date.getHours() + 1;
  const theDate = date.getDate();
  const month = date.getMonth() + 1;

  const format = `${month}/${theDate}/${hour}:${minute}`;

  return format;
};

const ItemRender = ({item, firebase, navigation}) => {
  const [guideInfo, setGuideInfo] = useState({});
  const [requestStatus, setRequestStatus] = useState({});

  const itemDate = new Date(item.date);

  const historyDate = renderDate(itemDate);

  useEffect(() => {
    firebase.doGetCurrentUserInfo(item.otherUid).then((a) => setGuideInfo(a));
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.push('reviewServices', {data: item, guideInfo})}
      disabled={item.status != 'completed' || item.review === true}
      style={styles.cardContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{uri: guideInfo?.profileImage}}
          style={{height: 80, width: 80, resizeMode: 'cover', borderRadius: 25}}
        />
        <Gap width={10} />
        <View>
          <Text
            style={{
              textTransform: 'capitalize',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {guideInfo.name}
          </Text>
          <Gap height={10} />
          <Text style={{textTransform: 'capitalize', fontSize: 15}}>
            {guideInfo.city}
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
    </TouchableOpacity>
  );
};

function onOrder({firebase, navigation}) {
  const [histodyData, setHistodyData] = useState([]);

  const myUid = auth().currentUser.uid;

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () =>
      firebase.doUserGetHistory(myUid).then((a) => setHistodyData(a)),
    );
    return () => {
      subscribe;
    };
  }, [navigation]);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}>
      <FlatList
        data={histodyData}
        keyExtractor={(item) => item?.date?.toString()}
        renderItem={({item, index}) => (
          <ItemRender
            navigation={navigation}
            item={item}
            firebase={firebase}
            index={index}
          />
        )}
      />
    </View>
  );
}

export default withFirebase(onOrder);

const styles = StyleSheet.create({
  cardContainer: {
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

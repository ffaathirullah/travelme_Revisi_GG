import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from '../../components';

import home from '../../screen/mainUser/home/home';
import pesanan from '../../screen/mainUser/pesanan/pesanan';
import profile from '../../screen/mainUser/profile/profile';
import orderMenu from './userOrderFlow';
import fireStore from '@react-native-firebase/firestore';
import authFirebase from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {withFirebase} from '../firebase/firebaseContext';
import {notifMan} from '../notification/notificationManager';

const MainUser = createBottomTabNavigator();

function mainUser({firebase, navigation}) {
  const myUid = authFirebase().currentUser.uid;

  const dispatch = useDispatch();

  const orderPath = fireStore()
    .collection('user')
    .doc(myUid)
    .collection('myRequest');

  useEffect(() => {
    const getOrderTrack = orderPath.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          dispatch({type: 'ADDMYREQUEST', payload: change.doc.data()});
          console.log('error');
        }
        if (change.type === 'modified') {
          dispatch({type: 'MODIFIEDMYREQUEST', payload: change.doc.data()});
          // if (
          //   change.doc.data().status == 'rejected' ||
          //   change.doc.data().status == 'canceled'
          // ) {
          //   firebase.doUserOrderHistoryGuide(
          //     myUid,
          //     change.doc.id,
          //     change.doc.data().status,
          //   );
          // }
        }

        if (change.type === 'removed') {
          dispatch({type: 'DELETEMYREQUEST', payload: change.doc.data()});
        }
      });
    });

    return () => {
      getOrderTrack;
      dispatch({type: 'NULLMYREQUEST'});
      dispatch({type: 'NULLMYAREADEST'});
    };
  }, []);

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () =>
      firebase
        .doGetCurrentUserInfo(myUid)
        .then((a) => dispatch({type: 'MYSTATUS', payload: a})),
    );

    return () => {
      subscribe;
      dispatch({type: 'NULLMYSTATUS'});
    };
  }, [navigation]);

  return (
    <MainUser.Navigator
      headerMode="none"
      tabBar={(props) => <BottomNavigator {...props} />}>
      <MainUser.Screen name="Home" component={home} />
      <MainUser.Screen name="Pesanan" component={orderMenu} />
      <MainUser.Screen name="Profile" component={profile} />
    </MainUser.Navigator>
  );
}

export default withFirebase(mainUser);

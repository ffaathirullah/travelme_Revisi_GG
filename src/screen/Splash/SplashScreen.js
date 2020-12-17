import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {withFirebase} from '../../config/firebase/firebaseContext';
import authFirebase from '@react-native-firebase/auth';

function SplashScreen({firebase}) {
  const dispatch = useDispatch();
  const myUid = authFirebase().currentUser?.uid;

  const firstActionFunc = async () => {
    const myRole = await firebase.doCheckRole(myUid);

    if (myRole == null) {
      setTimeout(() => {
        dispatch({type: 'LOGINADMINUSER', payload: myRole});
      }, 1000);
    }
    dispatch({type: 'LOGINADMINUSER', payload: myRole});
  };

  useEffect(() => {
    firstActionFunc();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/png/iconMain.png')}
        style={{height: 90, width: 90}}
      />
      <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
        TravelMe
      </Text>
    </View>
  );
}

export default withFirebase(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D929A',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

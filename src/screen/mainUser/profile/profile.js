import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Gap} from '../../../components/atom';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {withFirebase} from '../../../config/firebase/firebaseContext';

const {width, height} = Dimensions.get('window');

function profile({navigation, firebase}) {
  const userInfo = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  const logoutFunc = async () => {
    const logoutProc = await firebase.doLogout();
    if (logoutProc == 'logout') {
      dispatch({type: 'LOGOUTADMINUSER'});
    }
  };

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
          height: 260,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={
            userInfo.profileImage
              ? {uri: userInfo.profileImage}
              : require('../../../assets/png/userDefault.png')
          }
          style={{
            height: 120,
            width: 120,
            borderRadius: 60,
          }}
        />

        <Gap height={7} />
        <Text style={{color: '#767676', fontSize: 14}}>Traveler</Text>
        <Gap height={7} />
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{userInfo.name}</Text>
        <Gap height={7} />
        <Text style={{fontSize: 14}}>{userInfo.email} </Text>
        <Gap height={9} />
        <Text style={{fontSize: 14}}>{userInfo.contact} </Text>
        <Gap height={9} />
        <View style={styles.saldoContainer}>
          <View>
            <Text>Rp. {userInfo.balance || 0} </Text>
          </View>
          <TouchableOpacity
            style={styles.topUpContainer}
            onPress={() => navigation.push('topUp', {myUid: userInfo.id})}>
            <Text>Top Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Gap height={30} />
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
});

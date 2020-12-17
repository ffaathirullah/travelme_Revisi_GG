import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Button as EButton,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {withFirebase} from '../../config/firebase/firebaseContext';
import {InputText, Gap, Link, Button} from '../../components';
import authFirebase from '@react-native-firebase/auth';

import {Icon_app_auth} from '../../assets'

function login({navigation, firebase}) {
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);
  const [Error, setError] = useState('');
  const dispatch = useDispatch();

  const myUid = authFirebase().currentUser?.uid;

  const loginFunc = async () => {
    if (Email == null || Password == null) {
      setError('Email & Password tidak boleh kosong!');
    } else {
      try {
        const authStatus = await firebase.doAuthLoginUser(
          Email.trim(),
          Password,
        );
        const myRole = authStatus;
        if (!myRole.exists) {
          setError('Email of Password is incorrect');
        } else {
          dispatch({type: 'LOGINADMINUSER', payload: myRole.data().role});
        }
      } catch (error) {
        setError(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Icon_app_auth/>
        <Text style={styles.title}>Silahkan Login dulu!</Text>
        <Text style={styles.subTitle}>Isi form login agar kamu dapat terhubung dengan akunmu</Text>
        <Text style={styles.textError}>{Error} </Text>
        {/* <Gap height={15} /> */}
        <InputText
          type="text"
          placeholder="email"
          iconName="user"
          onChangeText={(mail) => setEmail(mail)}
        />
        <Gap height={15} />
        <InputText
          type="password"
          placeholder="password"
          iconName="lock"
          onChangeText={(pass) => setPassword(pass)}
        />
        <Gap height={15} />
        <Button
          prior="primary"
          title="Login"
          onpress={() => loginFunc()}
        />

        <Gap height={15} />
        <Link
          onPress={() => navigation.push('forgot')}
          text={'Lupa Password ?'}
        />
        <Gap height={15} />
        <View style={{height: 1, backgroundColor: '#a0a0a0', alignSelf: 'stretch'}} />
        <Gap height={15} />
        <Button
          prior="secondary"
          title="Register"
          onpress={() => navigation.push('register')}
        />
      </View>
    </View>
  );
}

export default withFirebase(login);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16
  },
  textError: {
    color: 'red',
  },
  title:{
    marginTop: 27,
    marginBottom: 4,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    marginBottom : 16,
    color: 'grey',
    fontSize: 13,
    textAlign: 'center',
  },
});

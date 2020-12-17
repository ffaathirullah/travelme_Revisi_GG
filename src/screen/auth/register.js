import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import Axios from 'axios';
import {withFirebase} from '../../config/firebase/firebaseContext';
import {InputText, Gap, Picker, Link, Button} from '../../components';
import ProvList from '../../utils/provList.json';
import {Icon_app_auth, Icon_backstackManipulation} from '../../assets'

function register({navigation, firebase}) {
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);
  const [Prov, setProv] = useState(null);
  const [City, setCity] = useState(null);
  const [CityList, setCityList] = useState(null);
  const [Contact, setContact] = useState(null);
  const [Role, setRole] = useState(null);
  const [Name, setName] = useState(null);
  const [Error, setError] = useState(null);

  const roleItems = [
    {label: 'Register as', value: null},
    {label: 'user', value: 'user'},
    {label: 'guide', value: 'guide'},
  ];

  const getCity = async () => {
    try {
      const {data} = await Axios.get(
        `http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${Prov}.json`,
      );

      const list = data?.map((data) => {
        return {label: data.name, value: data.name};
      });

      const fixlist = [{value: 'Your city', label: 'Your city'}, ...list];

      setCityList(fixlist);
    } catch (error) {}
  };

  const registerFunc = () => {
    if (Email && Password && Prov && City && Contact && Role && Name) {
      setError(null);
      firebase
        .doAuthCreateNewUser(
          Name,
          Email.trim(),
          Password,
          Contact,
          Role,
          Prov,
          City,
        )
        .then((a) => {
          if (a == 'error') {
            setError('The username already exists.');
          } else {
            navigation.popToTop();
          }
        });
    } else {
      setError('Isi semua form kosong!');
    }
  };

  useEffect(() => {
    getCity();
  }, [Prov]);

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.backstackView}>
        <View style={styles.circleBackstack}>
        </View>
        <TouchableOpacity  style={styles.backStack}   onPress={() => navigation.goBack(null)} >
          <Icon_backstackManipulation/>
        </TouchableOpacity>
      </View>
        <View style={styles.formContainer}>
          <Icon_app_auth style={{marginTop: 24}}/>
          <Text style={styles.title}>Silahkan Register dulu!</Text>
          <Text style={styles.subTitle}>Isi form agar kamu dapat mebuat akun</Text>
          <Text style={styles.textError}>{Error && Error} </Text>
          <InputText
            type="text"
            placeholder="name"
            iconName="user"
            onChangeText={(text) => setName(text)}
          />
          <Gap height={15} />
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
          <InputText
            type="text"
            placeholder="Phone Number"
            iconName="smartphone"
            keyBoardType="numeric"
            onChangeText={(pass) => setContact(pass)}
          />
          <Gap height={15} />

          <Picker
            items={roleItems}
            onValueChange={(s) => setRole(s)}
            selectedValue={Role}
            iconName="user"
          />

          <Gap height={15} />
          <Picker
            items={ProvList.provinsi}
            onValueChange={(s) => setProv(s)}
            selectedValue={Prov}
            iconName="user"
          />

          <Gap height={15} />
          {CityList && (
            <Picker
              items={CityList}
              onValueChange={(s) => setCity(s)}
              selectedValue={City}
              iconName="user"
              enabled={Prov ? true : false}
            />
          )}
          <Gap height={15} />

          <Button
            prior="primary"
            title="Register"
            onpress={() => registerFunc()}
          />
          <Gap height={15} />
        </View>
      </View>
    </ScrollView>
  );
}

export default withFirebase(register);

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
    marginHorizontal: 33,
    borderRadius: 10,
    marginVertical: 24
  },
  textError: {
    color: 'red',
  },
  title:{
    marginBottom: 4,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24
  },
  subTitle: {
    marginBottom : 16,
    color: 'grey',
    fontSize: 13,
    textAlign: 'center',
  },
  backstackView:{
    left: 16,
    top: 16,
    alignSelf: 'flex-start'
  },
  circleBackstack:{
    backgroundColor: "#fff",
    width: 40,
    height: 38,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden',
    elevation: 5
  },
  backStack: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      left: 8,
      top:  8,
      elevation: 7
  },
});

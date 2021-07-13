import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Button,
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {
  Icon_travelMe_home,
  Icon_Search,
  Image_Air_Terjun,
  Image_Gunung,
} from '../../../assets';
import {BottomIcon, Category, Picker, Gap} from '../../../components';
import ProvList from '../../../utils/provList.json';
import auth from '@react-native-firebase/auth';
import {notifMan} from '../../../config/notification/notificationManager.js';

import NavIcon from '../../../utils/navIcon';

const LocationModal = ({
  showModal,
  setShowModal,
  setProv,
  prov,
  provName,
  setCity,
  city,
  CityList,
  setCityList,
}) => {
  const [thisProv, setThisProv] = useState(provName);
  const dispatch = useDispatch();

  const getCity = async () => {
    try {
      const {data} = await Axios.get(
        `http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${prov}.json`,
      );

      const provApi = await Axios.get(
        `https://emsifa.github.io/api-wilayah-indonesia/api/province/${prov}.json`,
      );

      setThisProv(provApi.data.name);

      const list = data?.map((data) => {
        return {label: data.name, value: data.name};
      });

      const fixlist = [{value: 'Your city', label: 'Your city'}, ...list];

      setCityList(fixlist);
    } catch (error) {}
  };

  const saveDataLocationStorage = async () => {
    try {
      await AsyncStorage.setItem(
        auth().currentUser.uid,
        JSON.stringify({city, prov: thisProv}),
      );
    } catch (error) {}
  };

  useEffect(() => {
    getCity();
  }, [prov]);

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,.6)',
          padding: 100,
        }}>
        <View
          style={{
            width: 400,
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingVertical: 10,
            backgroundColor: '#fff',
            elevation: 3,
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{textAlign: 'center', fontSize: 20}}>
            Pilih area destinasi anda
          </Text>
          <Gap height={10} />
          <Picker
            items={ProvList.provinsi}
            onValueChange={(s) => setProv(s)}
            selectedValue={prov}
            iconName="user"
          />
          <Gap height={15} />

          {CityList && (
            <Picker
              items={CityList}
              onValueChange={(s) => setCity(s)}
              selectedValue={city}
              iconName="user"
              enabled={CityList ? true : false}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              dispatch({type: 'MYAREADEST', prov: thisProv, city});
              setShowModal(false);
              saveDataLocationStorage();
            }}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 7,
              elevation: 2,
              alignSelf: 'flex-end',
              backgroundColor: '#fff',
            }}>
            <Text>Ok</Text>
          </TouchableOpacity>
          <Gap height={15} />
        </View>
      </View>
    </Modal>
  );
};

export default function home({navigation, props}) {
  const [showModal, setShowModal] = useState(false);
  const [prov, setProv] = useState(null);
  const [provName, setProvName] = useState(null);
  const [city, setCity] = useState(null);

  const [CityList, setCityList] = useState(null);

  const dispatch = useDispatch();

  const getDataLocationStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(auth().currentUser.uid);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {}
  };

  useEffect(() => {
    getDataLocationStorage().then((a) => {
      setCity(a.city);
      setProvName(a.prov);
      dispatch({type: 'MYAREADEST', prov: a.prov, city: a.city});
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <LocationModal
        CityList={CityList}
        setCityList={(a) => setCityList(a)}
        setProv={(a) => setProv(a)}
        prov={prov}
        provName={provName}
        showModal={showModal}
        setShowModal={(a) => setShowModal(a)}
        setCity={(a) => setCity(a)}
        city={city}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: windowHeight * 0.16,
          marginLeft: windowWidth * 0.04533333333,
          marginRight: windowWidth * 0.04533333333,
        }}>
        <View style={styles.bagianAtas}></View>
        <Text style={styles.explore}>Explore {city} !</Text>
        <Gap height={20} />
        <View style={styles.layanan}>
          <View style={styles.iconLayanan}>
            {NavIcon.map((a, idx) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('listScreen', {type: a.type});
                }}
                key={idx.toString()}
                style={{
                  marginHorizontal: 7,
                  width: 70,
                  height: 65,
                  marginVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image source={a.img} style={{height: 60, width: 60}} />
                <Gap height={4} />
                <Text adjustsFontSizeToFit numberOfLines={1}>
                  {a.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bagianAtas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: windowWidth * 0.06666666666,
    height: windowHeight * 0.03078817733,
  },
  textTravelme: {
    fontSize: 20,
    color: '#2D929A',
    fontWeight: 'bold',
    marginLeft: -120,
  },
  explore: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  txtInput: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    height: windowHeight * 0.05911330049,
    width: windowWidth * 0.912,
    marginTop: windowHeight * 0.03201970443,
    marginLeft: windowWidth * 0.04533333333,
    marginRight: windowWidth * 0.04533333333,
  },
  search: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    height: windowHeight * 0.05911330049,
    top: windowHeight * 0.04077832512,
    right: windowWidth * 0.04533333333,
    alignSelf: 'flex-end',
  },
  layanan: {
    paddingLeft: windowWidth * 0.04533333333,
    paddingRight: windowWidth * 0.04533333333,
  },
  iconLayanan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: windowHeight * 0.02955665024,
    flexWrap: 'wrap',
  },
  explore: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: windowHeight * 0.02802955665,
    marginLeft: windowWidth * 0.04533333333,
  },
});

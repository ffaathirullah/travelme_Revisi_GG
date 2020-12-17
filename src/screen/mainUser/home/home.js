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
    } catch (e) {
      // error reading value
    }
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
      <View>
        <View style={styles.bagianAtas}>
          <Icon_travelMe_home style={styles.logo} />
          <Text style={styles.textTravelme}>TravelMe</Text>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 4,
              width: 130,
              overflow: 'hidden',
              borderRadius: 10,
              backgroundColor: 'rgba(0,0,0,.1)',
            }}>
            <Image
              source={require('../../../assets/png/iconLocation.png')}
              style={{
                height: 13,
                width: 13,
                resizeMode: 'cover',
                marginHorizontal: 8,
              }}
            />
            <Text
              numberOfLines={2}
              style={{textTransform: 'capitalize', flexWrap: 'wrap'}}
              ellipsizeMode="tail">
              {city}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.explore}>Explore Bandung!</Text>
        </View>

        <View styles={styles.search}>
          <TextInput
            placeholder="Cari Tempat Wisata, Cafe, dst"
            style={styles.txtInput}
          />
          <Icon_Search style={styles.searchIcon} />
        </View>

        <View style={styles.layanan}>
          <View style={styles.iconLayanan}>
            {NavIcon.map((a, idx) => (
              <TouchableOpacity
                // onPress={() => {

                // }}
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

        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingTop: 16,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              paddingHorizontal: 20,
            }}>
            Rekomendasi Tempat
          </Text>

          <View
            style={{
              height: windowHeight * 0.41,
              marginTop: 16,
            }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginRight: 16, marginLeft: 16}}>
              <TouchableOpacity onPress={() => navigation.navigate('Gunung1')}>
                <Category
                  imageUri={{
                    uri:
                      'https://firebasestorage.googleapis.com/v0/b/simple-chat-app-c1480.appspot.com/o/tangkuban1.jpg?alt=media&token=06baf0f7-7b61-4521-b1e1-f86bf9cd7e04',
                  }}
                  name="Gunung Tangkupan Perahu"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Hutan_Raya1')}
                style={{marginLeft: 16}}>
                <Category
                  imageUri={{
                    uri:
                      'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/hutan2.jpg?alt=media&token=c71132fe-bb1e-4473-b90d-ecea369168c0',
                  }}
                  name="Taman Hutan Raya Ir. H. Djuanda"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Air_Terjun1')}
                style={{marginLeft: 16}}>
                <Category
                  imageUri={{
                    uri:
                      'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/Air_Terjun1.jpg?alt=media&token=d132c250-3d1b-4ac8-8292-e9a893ebe541',
                  }}
                  name="Curug Dago"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Danau1')}
                style={{marginLeft: 16}}>
                <Category
                  imageUri={{
                    uri:
                      'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/danau1.jpg?alt=media&token=31bca51c-1f91-40df-b0ec-dd73912796bc',
                  }}
                  name="Situ Cileunca"
                />
              </TouchableOpacity>
            </ScrollView>
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

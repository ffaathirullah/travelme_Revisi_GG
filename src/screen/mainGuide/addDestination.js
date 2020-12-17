import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocPicker from 'react-native-document-picker';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';

import {Gap} from '../../components';
import {withFirebase} from '../../config/firebase/firebaseContext';

const {height, width} = Dimensions.get('window');

const typePicker = [
  'Hutan Raya',
  'Air Terjun',
  'Gunung',
  'Danau',
  'Museum',
  'Peternakan',
  'Bukit',
  'Perkebunan',
];

function addDestination({firebase, navigation}) {
  const [Title, setTitle] = useState(null);
  const [Descr, setDescr] = useState(null);
  const [Photo, setPhoto] = useState([]);
  const [Price, setPrice] = useState('');
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateEnd, setDateEnd] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [PickLat, setPickLat] = useState(0);
  const [PickLng, setPickLng] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);
  const [ErrorInputan, setErrorInputan] = useState(null);
  const [RequestSucceed, setRequestSucceed] = useState(null);
  const [typeDest, setTypeDest] = useState('Museum');

  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const onSuccessSent = () => {
    setShowIndicator(false);
    setTitle(null);
    setDescr(null);
    setPhoto([]);
    setPrice(0);
    setRequestSucceed('Mengirim permintaan berhasil');
    setErrorInputan(null);
  };

  const sendRequestDestFunc = () => {
    setShowIndicator(true);
    if (
      Title &&
      Descr &&
      Photo &&
      Price &&
      date &&
      dateEnd &&
      PickLat &&
      PickLng &&
      typeDest
    ) {
      firebase
        .doGuideSendPlace(
          userInfo.prov,
          userInfo.city,
          Title,
          Descr,
          Price,
          date.getHours(),
          dateEnd.getHours(),
          PickLat,
          PickLng,
          Photo,
          typeDest,
        )
        .then(() => onSuccessSent());
    } else {
      setErrorInputan('Mohon isi bagian kosong');
      setRequestSucceed(null);
      setShowIndicator(false);
    }
  };

  const pickDocument = async () => {
    try {
      const uris = await DocPicker.pickMultiple({
        type: [DocPicker.types.images],
      });

      setPhoto(uris);
    } catch (err) {
      if (DocPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  //! Time Func //! Time Func //! Time Func //! Time Func //! Time Func
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowEnd(Platform.OS === 'ios');
    setDateEnd(currentDate);
  };

  const ShowPicker = () => {
    setShow(true);
  };
  const ShowPickerEnd = () => {
    setShowEnd(true);
  };

  // if (!showIndicator) {
  //   return (

  //   );
  // }

  return (
    <ScrollView style={styles.container}>
      {showIndicator && (
        <View
          style={{
            position: 'absolute',
            alignContent: 'center',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#909090',
            opacity: 0.9,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            height,
            width,
            elevation: 99999,
          }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Mengirim permintaan </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => navigation.pop()}
        style={{
          // backgroundColor: 'red',
          paddingVertical: 7,
          paddingHorizontal: 14,
          marginLeft: 5,
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-start',
        }}>
        <FeatherIcon name="arrow-left" size={29} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => sendRequestDestFunc()}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          height: 40,
          paddingHorizontal: 7,
          borderRadius: 7,
          backgroundColor: '#2D929A',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#fafafa',
          // elevation: 3,
        }}>
        <Text style={{color: '#fff'}}>Kirim permintaan</Text>
      </TouchableOpacity>
      <Gap height={10} />
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <Gap height={10} />

        {/* <Gap height={10} /> */}

        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          Tambah destinasi wisata baru
        </Text>
        <Gap height={20} />
        {ErrorInputan && (
          <>
            <Text style={{color: 'red'}}>{ErrorInputan}</Text>
          </>
        )}
        {RequestSucceed && (
          <>
            <Text style={{color: '#a1f000'}}>{RequestSucceed}</Text>
          </>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            value={Title}
            placeholder="nama tempat"
            onChangeText={(text) => setTitle(text)}
            style={{flexGrow: 1}}
          />
        </View>
        <Gap height={20} />
        <View style={styles.inputContainer}>
          <Picker
            mode="dropdown"
            selectedValue={typeDest}
            style={{flex: 1}}
            onValueChange={(itemValue, idx) => setTypeDest(itemValue)}>
            {typePicker.map((item, idx) => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
        </View>
        <Gap height={20} />
        <View style={styles.inputContainer}>
          <TextInput
            value={Price.toString()}
            keyboardType="phone-pad"
            placeholder="harga masuk"
            onChangeText={(text) => setPrice(text)}
            style={{flexGrow: 1}}
          />
        </View>

        <Gap height={10} />
        <View style={styles.timeSection}>
          <TouchableOpacity
            onPress={() => ShowPicker()}
            style={styles.timeContainer}>
            <Text>Jam buka : </Text>
            <View style={styles.timeText}>
              <Text style={{fontSize: 24}}>
                {date.getHours()}:{date.getMinutes()}
              </Text>
            </View>
          </TouchableOpacity>
          <Text></Text>
          <TouchableOpacity
            onPress={() => ShowPickerEnd()}
            style={styles.timeContainer}>
            <Text>Jam tutup : </Text>
            <View style={styles.timeText}>
              <Text style={{fontSize: 24}}>
                {dateEnd.getHours()}:{dateEnd.getMinutes()}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Gap height={10} />

        <View style={styles.inputContainer}>
          <TextInput
            value={Descr}
            placeholder="Deskripsi Singkat"
            onChangeText={(text) => setDescr(text)}
            numberOfLines={10}
            multiline={true}
            style={{
              flexGrow: 1,
              textAlignVertical: 'top',
              flexWrap: 'wrap',
            }}
          />
        </View>
        <Gap height={10} />
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 16}}>Unggah foto : </Text>
          <TouchableOpacity onPress={() => pickDocument()}>
            <FeatherIcon name="file-plus" size={30} />
          </TouchableOpacity>
        </View>
        <Gap height={15} />
        <View style={{flexDirection: 'row'}}>
          {Photo &&
            Photo.map((item, index) => (
              <View
                key={item.uri}
                style={{
                  elevation: 2,
                  marginHorizontal: 8,
                  borderWidth: 0.1,
                }}>
                <Image
                  source={{uri: item.uri}}
                  style={{height: 80, width: 80}}
                />
              </View>
            ))}
        </View>
        <Gap height={15} />
        <Text style={{fontSize: 16}}>Pilih lokasi destinasi</Text>
        <Gap height={5} />

        <MapView
          onLongPress={(a) => {
            setPickLat(a.nativeEvent.coordinate.latitude);
            setPickLng(a.nativeEvent.coordinate.longitude);
          }}
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          style={{left: 0, right: 0, height: 600}}
          initialRegion={{
            latitude: -6.973145762369738,
            longitude: 107.63191457303124,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            title={Title}
            description={Descr}
            coordinate={{latitude: PickLat, longitude: PickLng}}
          />
        </MapView>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        )}
        {showEnd && (
          <DateTimePicker
            testID="dateTimePicker2"
            value={dateEnd}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={onChangeEnd}
          />
        )}
      </View>
    </ScrollView>
  );
}

export default withFirebase(addDestination);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#909090',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timeContainer: {flexDirection: 'row', alignItems: 'center'},
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  timeText: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 0.5,
    borderColor: '#909090',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

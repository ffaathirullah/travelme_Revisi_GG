import React, {useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Gap} from '../../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextInput} from 'react-native-gesture-handler';
import {withFirebase} from '../../../config/firebase/firebaseContext';
import auth from '@react-native-firebase/auth';

const TimeFormat = (time) => {
  const date = new Date(time);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getDay();
  const dateTime = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const hour = date.getHours();
  const minute = date.getMinutes();

  return {
    year,
    date: dateTime,
    month: months[month],
    day: days[day],
    hour,
    minute,
  };
};

const listGuideModal = ({
  modalVisible,
  setModalVisible,
  guideData,
  idPlace,
  userInfo,
  firebase,
}) => {
  const areaDestReducer = useSelector((state) => state.areaDestReducer);
  const [timePick, setTimePick] = useState(new Date().getTime());
  const [unixTime, setUnixTime] = useState(timePick);
  const [mode, setMode] = useState('date');
  const [showPick, setShowPick] = useState(false);
  const [hourOrder, setHourOrder] = useState(1);

  const userBalance = userInfo.balance || 0;
  const totalPrice = hourOrder * guideData?.price;

  const {year, month, date, day, hour, minute} = TimeFormat(timePick);

  const myUid = auth().currentUser.uid;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || timePick;
    setShowPick(false);
    setTimePick(currentDate);
    setUnixTime(event.nativeEvent.timestamp);
  };

  const showMode = (currentMode) => {
    setShowPick(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('datetime');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onOrderSend = () => {
    firebase
      .doUserReqGuide(
        myUid,
        guideData.id,
        areaDestReducer.prov,
        areaDestReducer.city,
        idPlace,
        unixTime,
        hourOrder,
      )
      .then(() => setModalVisible(false));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalContainer}>
        <View style={{flex: 1}}></View>
        <View style={styles.modalContent}>
          <Image
            source={{uri: guideData?.profileImage}}
            style={styles.avatarGuide}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.texGuideName}>
              {guideData?.name} ({guideData?.price}/Jam)
            </Text>
          </View>
          <Gap height={20} />
          <Text style={{fontWeight: 'bold'}}>Waktu pesan</Text>
          <Gap height={7} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => showDatepicker()}
              style={{
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="calendar" size={30} />
            </TouchableOpacity>
            <Text>
              {day}-{date}-{month}
            </Text>
            <Gap width={40} />
            <TouchableOpacity
              onPress={() => showTimepicker()}
              style={{
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="clockcircleo" size={30} />
            </TouchableOpacity>
            <Text>
              {hour}:{minute}
            </Text>
          </View>
          <Gap height={15} />
          <Text style={{fontWeight: 'bold'}}>Durasi</Text>
          <Gap height={7} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              keyboardType="number-pad"
              value={hourOrder}
              defaultValue={hourOrder}
              style={{
                borderBottomWidth: 1,
                padding: 0,
                margin: 0,
                paddingHorizontal: 10,
                marginRight: 10,
                textAlign: 'center',
              }}
              onChangeText={(val) => setHourOrder(val)}
              placeholder="0"
            />
            <Text>Hour</Text>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 30,
              right: 15,
              left: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View>
              <Text style={{fontSize: 20}}>Total bayar</Text>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                Rp.{totalPrice}
              </Text>
            </View>

            <TouchableOpacity
              disabled={userBalance < totalPrice}
              onPress={() => onOrderSend()}
              style={{
                width: 100,
                backgroundColor:
                  userBalance < totalPrice ? '#909090' : '#2D929A',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={{textAlign: 'center', color: '#fff'}}>
                {userBalance < totalPrice
                  ? 'Saldo tidak cukup'
                  : 'Kirim permintaan'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showPick && (
        <DateTimePicker
          testID="dateTimePicker"
          value={timePick}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </Modal>
  );
};

export default withFirebase(listGuideModal);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    flex: 5,
    backgroundColor: '#fafaff',
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 4,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  avatarGuide: {
    height: 80,
    width: 80,
    marginVertical: 10,
    borderRadius: 999,
  },
  texGuideName: {
    fontSize: 18,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});

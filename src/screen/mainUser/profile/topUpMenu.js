import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Gap, Button} from '../../../components';
import {withFirebase} from '../../../config/firebase/firebaseContext';

function topUpMenu({firebase, navigation, route}) {
  const [nominal, setNominal] = useState('');
  const {myUid} = route.params;

  const [statusMessage, setStatusMessage] = useState(null);
  const requestNominal = async () => {
    const result = await firebase.doUserAddBalanceAccount(myUid, nominal);
    setStatusMessage(result);
    setNominal('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {statusMessage && <Text>{statusMessage}</Text>}
        <TextInput
          style={{
            borderWidth: 0.2,
            borderColor: '#000',
            alignSelf: 'stretch',
            borderRadius: 7,
          }}
          keyboardType="phone-pad"
          value={nominal}
          placeholder="masukan nominal"
          onChangeText={(a) => setNominal(a)}
        />
        <Gap height={7} />
        <Button title="isi" onpress={() => requestNominal()} />
      </View>
    </View>
  );
}

export default withFirebase(topUpMenu);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cardContainer: {
    height: 200,
    width: 250,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

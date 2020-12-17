import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {BackgroundCarousel} from '../../../components';
import {
  Icon_Flag,
  Icon_Waktu,
  Icon_Bawah,
  Icon_Tambah_ulasan,
  Icon_Bukit,
  Icon_Bintang,
  Icon_Peta,
} from '../../../assets';

const images = [
  'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/Air_Terjun1.jpg?alt=media&token=d132c250-3d1b-4ac8-8292-e9a893ebe541',
  'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/Air_Terjun2.jpg?alt=media&token=7a4961bf-c81d-44d3-ba31-bba3925d09de',
  'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/Air_Terjun3.jpg?alt=media&token=2f32dd04-7ec5-4a93-973b-af867aec7add',
  'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/Air_Terjun4.jpg?alt=media&token=634f6590-4f92-43ad-8caf-6cf33b067bd2',
  'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/Air_Terjun5.jpg?alt=media&token=27e871a6-1fe8-486d-b886-a6490c9ddac6',
];
function Air_Terjun1() {
  return (
    <View style={styles.container}>
      <BackgroundCarousel images={images} />
      <ScrollView>
        <View style={styles.bawahCarousel}>
          <Text style={styles.txtDetail}>Curug Dago</Text>
          <View style={styles.waktu}>
            <Icon_Waktu />
            <Text style={styles.txtWaktu}>08:00 – 17:00 WIB</Text>
          </View>
          <View style={styles.deskripsi}>
            <Text style={styles.txtDeskripsi}>Deskripsi Singkat</Text>
            <Text style={styles.txtDeskripsiLengkap}>
              Curug Dago adalah jejak keindahan Bandung pada masa Hindia Belanda.
              Abad ke-20, air terjun setinggi 15 meter ini kesohor akan keindahan alamnya
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Air_Terjun1;

const styles = StyleSheet.create({
  bawahCarousel: {
    marginLeft: 16,
    marginRight: 22,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  txtDetail: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  waktu: {
    marginTop: 17,
    flexDirection: 'row',
  },
  txtWaktu: {
    marginTop: -4,
    marginLeft: 8,
  },
  txtFlag: {
    marginTop: -4,
    marginLeft: 6,
  },
  deskripsi: {
    marginTop: 20,
  },
  txtDeskripsi: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  selengkapnya: {
    marginTop: 8,
    backgroundColor: '#EBEFEF',
    width: 343,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ulasan: {
    marginTop: 16,
    backgroundColor: '#EBEFEF',
    width: 343,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtUlasan: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 19,
  },
  hasilUlasan: {
    marginTop: 16,
    flex: 1,
    flexDirection: 'row',
  },
  dataUlasan: {
    alignSelf: 'center',
    marginLeft: 21,
  },
  peta: {
    borderStyle: 'solid',
    borderWidth: 2,
    width: 89,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#2D929A',
    borderRadius: 10,
  },
  jasaTour: {
    borderRadius: 10,
    width: 238,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D929A',
    marginLeft: 16,
  },
  txtJasaTour: {
    color: 'white',
  },
  txtPeta: {
    color: '#2D929A',
  },
  palingBawah: {
    flexDirection: 'row',
    marginTop: 19,
  },
});

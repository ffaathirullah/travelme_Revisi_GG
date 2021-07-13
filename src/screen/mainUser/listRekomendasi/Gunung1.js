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
  'https://firebasestorage.googleapis.com/v0/b/simple-chat-app-c1480.appspot.com/o/tangkuban1.jpg?alt=media&token=06baf0f7-7b61-4521-b1e1-f86bf9cd7e04',
  'https://firebasestorage.googleapis.com/v0/b/simple-chat-app-c1480.appspot.com/o/tangkuban2.jpg?alt=media&token=1b331d9d-110a-41d4-8b21-17d2606e85e9',
  'https://firebasestorage.googleapis.com/v0/b/simple-chat-app-c1480.appspot.com/o/tangkuban3.jpg?alt=media&token=23a5f7f2-46ad-4e2e-97d8-f233202fec10',
  'https://firebasestorage.googleapis.com/v0/b/simple-chat-app-c1480.appspot.com/o/tangkuban4.jpg?alt=media&token=8b82ef81-2f6b-4f15-8548-1df273ed2282',
  'https://firebasestorage.googleapis.com/v0/b/simple-chat-app-c1480.appspot.com/o/tangkuban5.jpg?alt=media&token=079ecd88-1b3c-4231-9132-c8ed5434b9fb',
];
function Gunung1() {
  return (
    <View style={styles.container}>
      <BackgroundCarousel images={images} />
      <ScrollView>
        <View style={styles.bawahCarousel}>
          <Text style={styles.txtDetail}>Gunung Tangbupan Perahu</Text>
          <View style={styles.waktu}>
            <Icon_Waktu />
            <Text style={styles.txtWaktu}>07.30 – 17.00 WIB</Text>
          </View>
          <View style={styles.deskripsi}>
            <Text style={styles.txtDeskripsi}>Deskripsi Singkat</Text>
            <Text style={styles.txtDeskripsiLengkap}>
              Salah satu destinasi wisata yang berada di Bandung berikutnya
              masih memiliki nuansa pegunungan. Yaitu Gunung Tangkuban Perahu
              yang merupakan salah satu tempat wisata alam yang wajib Anda
              kunjungi
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Gunung1;

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

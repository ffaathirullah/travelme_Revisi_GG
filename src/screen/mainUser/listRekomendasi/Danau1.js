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
  'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/danau1.jpg?alt=media&token=31bca51c-1f91-40df-b0ec-dd73912796bc',
  'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/danau2.jpg?alt=media&token=fc8c20a8-1eaf-43ae-a9de-3c3830d1b9a4',
  'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/danau3.jpg?alt=media&token=8afb0b0e-f90a-4875-bb15-df8c9570d716',
  'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/danau4.jpg?alt=media&token=469d0cc9-81ab-45d7-bb4f-7aeb805e6b6a',
  'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/danau5.jpg?alt=media&token=eb9ebb2c-07d2-43f7-99b8-ef42a50b4996',
];
function Danau1() {
  return (
    <View style={styles.container}>
      <BackgroundCarousel images={images} />
      <ScrollView>
        <View style={styles.bawahCarousel}>
          <Text style={styles.txtDetail}>Situ Cileunca</Text>
          <View style={styles.waktu}>
            <Icon_Waktu />
            <Text style={styles.txtWaktu}>07:00 – 18:00 WIB</Text>
          </View>
          <View style={styles.deskripsi}>
            <Text style={styles.txtDeskripsi}>Deskripsi Singkat</Text>
            <Text style={styles.txtDeskripsiLengkap}>
            Situ Cileunca merupakan danau di Bandung yang akhirnya difungsikan
            sebagai objek wisata di Bandung Selatan tepatnya. Mereka seringkali
            menyebut tempat ini dengan nama Situ Cileunca Pangalengan Bandung,
            Jawa Barat. Tidak sedikit yang berkunjung namun suasananya memang membuat
            hati menjadi tenang.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Danau1;

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

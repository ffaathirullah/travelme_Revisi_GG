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
  'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/hutan2.jpg?alt=media&token=c71132fe-bb1e-4473-b90d-ecea369168c0',
  'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/hutan1.jpg?alt=media&token=870d1745-dbd9-4825-ab22-c78915d2e837',
  'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/hutan3.jpg?alt=media&token=64443d0e-9bf8-4f3d-9ecb-dd33354d1e84',
  'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/hutan4.jpg?alt=media&token=15c7ce8e-50d7-4944-9a25-82d80584b0d1',
  'https://firebasestorage.googleapis.com/v0/b/travelme-aa9a6.appspot.com/o/hutan5.jpg?alt=media&token=651fa7ed-cd31-4bc6-bab1-bb673ff354f9',
];
function Hutan_Raya1() {
  return (
    <View style={styles.container}>
      <BackgroundCarousel images={images} />
      <ScrollView>
        <View style={styles.bawahCarousel}>
          <Text style={styles.txtDetail}>Taman Hutan Raya Ir.H.Djuanda</Text>
          <View style={styles.waktu}>
            <Icon_Waktu />
            <Text style={styles.txtWaktu}>07.00 - 17.00 WIB</Text>
          </View>
          <View style={styles.deskripsi}>
            <Text style={styles.txtDeskripsi}>Deskripsi Singkat</Text>
            <Text style={styles.txtDeskripsiLengkap}>
              Taman Hutan Raya Ir. H. Djuanda merupakan kawasan konservasi yang
              terpadu antara alam sekunder dengan hutan tanaman dengan jenis Pinus
              yang terletak di Sub-Daerah Aliran Sungai Cikapundung dan DAS
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Hutan_Raya1;

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

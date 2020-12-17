import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon_Aktif_Pesanan} from '../../../assets'
export default function pesanan({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={{alignSelf: 'center',fontWeight: 'bold', fontSize: 22, marginTop: 16}}>Pesananmu</Text>
      <View style={{flexDirection: 'row',  alignItems: 'center', justifyContent: 'center', marginTop: 39, marginLeft: 54}}>
        <View style={{width: 124, height:58 , elevation: 3}}>
          <TouchableOpacity><Text style={{fontSize: 16, fontWeight: 'bold',}}>Dipesan</Text></TouchableOpacity>
          <Icon_Aktif_Pesanan style={{marginTop: 14, marginLeft: -20}}/>
        </View>
        <View style={{width: 124, height:58 , elevation: 3}}>
          <TouchableOpacity style={{width: 124, height:58 , elevation: 3}}><Text style={{fontSize: 16, fontWeight: 'bold',}} onPress={() => navigation.navigate('dibatalkanRoute')}>Dibatalkan</Text></TouchableOpacity>
        </View>
        <View style={{width: 124, height:58 , elevation: 3}}>
          <TouchableOpacity style={{width: 124, height:58, elevation: 3}}><Text style={{fontSize: 16, fontWeight: 'bold',}} onPress={() => navigation.navigate('SelesaiRoute')}>Selesai</Text></TouchableOpacity>
        </View>
    </View>
    <View style={{width: 343, height:80 , elevation: 3, marginTop:24,  marginLeft: 17, marginRight: 17, flexDirection: 'row'}}>
      <View style={{marginLeft: 16}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>RancaEkek</Text>
        <Text>kepada : Sino Edgard</Text>
      </View>
      <View>
        <TouchableOpacity style={{backgroundColor: '#EBEFEF', width: 75, height: 22, marginLeft: 117}}><Text style={{alignSelf: 'center'}}>Batalkan</Text></TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  }
});

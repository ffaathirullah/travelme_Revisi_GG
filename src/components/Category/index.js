import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';

class Category extends Component {
  render() {
    return (
      <View
        style={{
          height: windowHeight * 0.35666666666,
          width: windowWidth * 0.43753246753,
          borderWidth: 0.5,
          borderColor: '#dddddd',
          backgroundColor: '#fff',
          elevation: 2,
        }}>
        <View style={{flex: 2}}>
          <Image
            source={this.props.imageUri}
            style={{flex: 1, width: null, height: null, resizeMode: 'cover'}}
          />
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>{this.props.name}</Text>
        </View>
      </View>
    );
  }
}
export default Category;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

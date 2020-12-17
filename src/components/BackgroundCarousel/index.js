import  React , {useState, createRef, useEffect  } from "react";
import { StyleSheet, View, ScrollView, Dimensions, Image, TouchableOpacity } from "react-native";
import {Icon_backstackManipulation} from '../../assets';
import { useNavigation } from '@react-navigation/native';

const DEVICE_WIDTH = Dimensions.get("window").width;

function BackgroundCarousel (props) {

  scrollRef = React.createRef();
 const [state, setState] = useState({
    selectedIndex: 0
 });



  setSelectedIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    setState({ selectedIndex });
  };

    const navigation = useNavigation();
    const { images } = props;
    const { selectedIndex } = state;

    return (
      <View style={{ height: "50%", width: "100%" }}>
        <ScrollView
          horizontal
          pagingEnabled
          onMomentumScrollEnd={setSelectedIndex}
          ref={scrollRef}
        >
          {images.map(image => (
            <Image
              style={styles.backgroundImage}
              source={{ uri: image }}
              key={image}
            />
          ))}
        </ScrollView>
        <View style={styles.backstackView}>
          <View style={styles.circleBackstack}>
          </View>
          <TouchableOpacity  style={styles.backStack}   onPress={() => navigation.goBack(null)} >
            <Icon_backstackManipulation/>
          </TouchableOpacity>
        </View>
        <View style={styles.circleDiv}>
          {images.map((image, i) => (
            <View
              style={[
                styles.whiteCircle,
                { opacity: i === selectedIndex ? 0.5 : 1 }
              ]}
              key={image}
              active={i === selectedIndex}
            />
          ))}
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: "100%",
    width: Dimensions.get("window").width
  },
  circleDiv: {
    position: "absolute",
    bottom: 55,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 10
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: "#fff"
  },
  backStack: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      left: 8,
      top:  8,
  },
  circleBackstack:{
    backgroundColor: "#fff",
    width: 40,
    height: 38,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden'

  },
  backstackView:{
    bottom: 270,
    left: 16
  }
});

export default BackgroundCarousel;

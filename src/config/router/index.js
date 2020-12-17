import React, {Fragment, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {withFirebase} from '../firebase/firebaseContext';

import SplashScreen from '../../screen/Splash/SplashScreen';
import auth from './auth';
import mainAdmin from './mainAdmin';
import mainUser from './mainUser';
import dibatalkanRoute from './dibatalkanRoute';
import SelesaiRoute from './SelesaiRoute';
import pesananRouter from './pesananRouter';
import mainGuide from './mainGuide';
import settingScreen from '../../screen/setting/settingScreen';
import listScreen from '../../screen/mainUser/list/listScreen';
import listDetail from '../../screen/mainUser/list/listDetail';
import listGuide from '../../screen/mainUser/list/listGuide';
import seekGuideProfile from '../../screen/mainUser/profile/seekGuideProfile';
import reviewServices from '../../screen/mainUser/order/reviewServices';

import topUp from '../../screen/mainUser/profile/topUpMenu';
import Air_Terjun1 from '../../screen/mainUser/listRekomendasi/Air_Terjun1';
import Danau1 from '../../screen/mainUser/listRekomendasi/Danau1';
import Gunung1 from '../../screen/mainUser/listRekomendasi/Gunung1';
import Hutan_Raya1 from '../../screen/mainUser/listRekomendasi/Hutan_Raya1';

const Stack = createStackNavigator();
function index({firebase}) {
  const myRole = useSelector((state) => state.authReducer.type);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {myRole == 'splash' ? (
          <Stack.Screen name="splash" component={SplashScreen} />
        ) : myRole == null ? (
          <Stack.Screen name="auth" component={auth} />
        ) : myRole == 'user' ? (
          <>
            <Stack.Screen name="user" component={mainUser} />
            <Stack.Screen name="listScreen" component={listScreen} />
            <Stack.Screen name="reviewServices" component={reviewServices} />
            <Stack.Screen name="listDetail" component={listDetail} />
            <Stack.Screen name="listGuide" component={listGuide} />
            <Stack.Screen name="setting" component={settingScreen} />
            <Stack.Screen name="topUp" component={topUp} />
            <Stack.Screen name="Air_Terjun1" component={Air_Terjun1} />
            <Stack.Screen name="Danau1" component={Danau1} />
            <Stack.Screen name="Gunung1" component={Gunung1} />
            <Stack.Screen name="Hutan_Raya1" component={Hutan_Raya1} />
            <Stack.Screen
              name="seekGuideProfile"
              component={seekGuideProfile}
            />
          </>
        ) : myRole == 'admin' ? (
          <Stack.Screen name="admin" component={mainAdmin} />
        ) : (
          <>
            <Stack.Screen name="guide" component={mainGuide} />
            <Stack.Screen name="setting" component={settingScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default withFirebase(index);

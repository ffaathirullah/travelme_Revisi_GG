import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from '../../components';

import home from '../../screen/mainUser/home/home';
import dibatalkan from '../../screen/mainUser/pesanan/dibatalkan';
import profile from '../../screen/mainUser/profile/profile';

const MainUser = createBottomTabNavigator();

export default function dibatalkanRoute() {
  return (
    <MainUser.Navigator headerMode="none" initialRouteName="Pesanan"   tabBar={(props) => <BottomNavigator {...props} />}>
      <MainUser.Screen name="Home" component={home} />
            <MainUser.Screen name="Pesanan" component={dibatalkan} />
      <MainUser.Screen name="Profile" component={profile} />
    </MainUser.Navigator>
  );
}

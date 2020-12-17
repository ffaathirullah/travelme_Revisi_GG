import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import home from '../../screen/mainAdmin/home';
import detailPlace from '../../screen/mainAdmin/detailPlace';
import checkList from '../../screen/mainAdmin/checkList';
import compareScreen from '../../screen/mainAdmin/compareItem';
import {useDispatch} from 'react-redux';

const MainAdmin = createSharedElementStackNavigator();

export default function mainAdmin() {
  const dispatch = useDispatch();

  return (
    <MainAdmin.Navigator headerMode="none">
      <MainAdmin.Screen name="home" component={home} />
      <MainAdmin.Screen name="checkList" component={checkList} />
      <MainAdmin.Screen name="compare" component={compareScreen} />
      <MainAdmin.Screen
        name="detailPlace"
        component={detailPlace}
        options={() => ({
          gestureEnabled: false,
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 400}},
            close: {animation: 'timing', config: {duration: 400}},
          },
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
      />
    </MainAdmin.Navigator>
  );
}

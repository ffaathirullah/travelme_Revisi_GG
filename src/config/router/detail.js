import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import listDetail from '../../screen/mainUser/list/listDetail';

const Details = createStackNavigator();

export default function details() {
  return (
    <Details.Navigator headerMode="none">
      <Details.Screen name="Detailku" component={listDetail} />
    </Details.Navigator>
  );
}

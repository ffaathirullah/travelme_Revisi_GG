import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import onOrder from '../../screen/mainUser/order/onOrder';
import historyOrder from '../../screen/mainUser/order/historyOrder';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="onOrder"
        options={{title: 'Order'}}
        component={onOrder}
      />

      <Tab.Screen
        name="historyOrder"
        options={{title: 'History'}}
        component={historyOrder}
      />
    </Tab.Navigator>
  );
}

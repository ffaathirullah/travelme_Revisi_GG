import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import addDest from '../../screen/mainGuide/addDestination';
import recomDest from '../../screen/mainGuide/destination';
import listDestination from '../../screen/mainGuide/listDestinations';
import listDetail from '../../screen/mainGuide/listDetail';

const Stack = createStackNavigator();

export default function mainGuideDestListFlow() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="list" component={recomDest} />
      <Stack.Screen name="addDest" component={addDest} />
      <Stack.Screen name="lists" component={listDestination} />
      <Stack.Screen name="detail" component={listDetail} />
    </Stack.Navigator>
  );
}

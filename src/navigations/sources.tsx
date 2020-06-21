import React from 'react';
import SourcesScreen from '../scenes/sources';
import SourceItemsScreen from '../scenes/souce-items';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createStackNavigator } = require('@react-navigation/stack');

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const Stack = createStackNavigator();

export enum SourcesScreenTypes {
  Sources = 'Sources',
  SourceItems = 'SourceItems',
}

export type SourcesStackParamList = {
  Sources: void;
  SourceItems: void;
};

const SourcesScreenNavigation: React.FC<void> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={SourcesScreenTypes.Sources}
        component={SourcesScreen}
      />
      <Stack.Screen
        name={SourcesScreenTypes.SourceItems}
        component={SourceItemsScreen}
      />
    </Stack.Navigator>
  );
};

export default SourcesScreenNavigation;

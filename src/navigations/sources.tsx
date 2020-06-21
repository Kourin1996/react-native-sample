import React from 'react';
import SourcesScreen from '../scenes/sources';
import SourceItemsScreen from '../scenes/souce-items';
import NewSourceScreen from '../scenes/new-source';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createStackNavigator } = require('@react-navigation/stack');

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const Stack = createStackNavigator();

export enum SourcesScreenTypes {
  Sources = 'Sources',
  SourceItems = 'SourceItems',
  NewSource = 'NewSource',
}

export type SourcesStackParamList = {
  Sources: void;
  SourceItems: void;
  NewSource: void;
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
      <Stack.Screen
        name={SourcesScreenTypes.NewSource}
        component={NewSourceScreen}
      />
    </Stack.Navigator>
  );
};

export default SourcesScreenNavigation;

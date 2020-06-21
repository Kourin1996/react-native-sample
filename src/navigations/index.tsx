import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../scenes/home';
import SourcesNavigation from './sources';

const Tab = createBottomTabNavigator();

const RootNavigation: React.FC<void> = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeBackgroundColor: 'white',
          activeTintColor: '#00868B',
          inactiveBackgroundColor: 'white',
          inactiveTintColor: '#e6e3e3',
        }}
        screenOptions={({ route }) => ({
          // eslint-disable-next-line react/display-name
          tabBarIcon: (props) => {
            // eslint-disable-next-line react/prop-types
            const { color, size } = props;
            let iconName = '';
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Sources') {
              iconName = 'format-list-bulleted';
            }
            return (
              <MaterialCommunityIcon
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Sources" component={SourcesNavigation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

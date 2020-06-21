import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './scenes/home';
import NewsScreen from './scenes/news';
import SettingScreen from './scenes/setting';

const Tab = createBottomTabNavigator();

const Navigation = () => {
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
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'News') {
              iconName = 'format-list-bulleted';
            } else if (route.name === 'Setting') {
              iconName = 'setting';
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
        <Tab.Screen name="News" component={NewsScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

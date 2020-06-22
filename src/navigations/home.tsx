import React from 'react';
import HomeScreen from '../scenes/home';
import WebViewScreen from '../scenes/WebView';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createStackNavigator } = require('@react-navigation/stack');

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const Stack = createStackNavigator();

export enum HomeScreensTypes {
  Home = 'Home',
  WebView = 'WebView',
}

export type HomeStackParamList = {
  WebView: {
    url: string;
  };
};

const HomeScreenNavigation: React.FC<void> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={HomeScreensTypes.Home} component={HomeScreen} />
      <Stack.Screen name={HomeScreensTypes.WebView} component={WebViewScreen} />
    </Stack.Navigator>
  );
};

export default HomeScreenNavigation;

import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../scenes/home';

const HomeNavigatorConfig = {
  initialRouteName: 'Home',
  header: null,
  headerMode: 'none',
} as const;

const RouteConfigs = {
  Home: HomeScreen,
};

const HomeNavigator = createStackNavigator(RouteConfigs, HomeNavigatorConfig);

export default HomeNavigator;

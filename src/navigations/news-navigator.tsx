import { createStackNavigator } from 'react-navigation-stack';

import NewsScreen from '../scenes/news';

const NewsNavigatorConfig = {
  initialRouteName: 'News',
  header: null,
  headerMode: 'none',
} as const;

const RouteConfigs = {
  News: NewsScreen,
};

const NewsNavigator = createStackNavigator(RouteConfigs, NewsNavigatorConfig);

export default NewsNavigator;

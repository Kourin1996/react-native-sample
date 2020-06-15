import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import HomeNavigator from './home-navigator';
import NewsNavigator from './news-navigator';

const RootNavigator = createSwitchNavigator(
  {
    Home: HomeNavigator,
    News: NewsNavigator,
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(RootNavigator);

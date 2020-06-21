import React from 'react';
import { SafeAreaView, Text } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NewsScreenProps {}

const NewsScreen: React.FC<NewsScreenProps> = () => (
  <SafeAreaView>
    <Text>News Screen</Text>
  </SafeAreaView>
);

export default NewsScreen;
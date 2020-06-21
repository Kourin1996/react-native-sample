import React from 'react';
import { SafeAreaView, Text } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SettingScreenProps {}

const SettingScreen: React.FC<SettingScreenProps> = () => (
  <SafeAreaView>
    <Text>Setting Screen</Text>
  </SafeAreaView>
);

export default SettingScreen;

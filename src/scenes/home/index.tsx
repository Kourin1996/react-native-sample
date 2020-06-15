import React from 'react';
import { SafeAreaView, Text, TouchableHighlight } from 'react-native';

const HomeScreen = ({ navigation }: any) => (
  <SafeAreaView>
    <Text>Home Screen</Text>

    <TouchableHighlight
      onPress={() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        navigation.navigate('News');
        return;
      }}>
      <Text>Go to news</Text>
    </TouchableHighlight>
  </SafeAreaView>
);

export default HomeScreen;

import React from 'react';
import { SafeAreaView, Text, TouchableHighlight } from 'react-native';

const NewsScreen = ({ navigation }: any) => (
  <SafeAreaView>
    <Text>News Screen</Text>

    <TouchableHighlight
      onPress={() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        navigation.navigate('Home');
        return;
      }}>
      <Text>Go to home</Text>
    </TouchableHighlight>
  </SafeAreaView>
);

export default NewsScreen;

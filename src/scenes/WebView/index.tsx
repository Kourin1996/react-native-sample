import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import Header from '../../components/organisms/Header';
import { HomeStackParamList, HomeScreensTypes } from '../../navigations/home';
import { RouteProp } from '@react-navigation/native';

interface WebViewProps {
  route: RouteProp<HomeStackParamList, HomeScreensTypes.WebView>;
  navigation: NavigationScreenProp<
    HomeStackParamList,
    HomeScreensTypes.WebView
  >;
}

const WebViewScreen: React.FC<WebViewProps> = ({
  route,
  navigation,
}: WebViewProps) => {
  const onBackIconPressed = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const { url } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: onBackIconPressed,
        }}
        centerComponent={{ text: url, style: { color: '#fff' } }}
      />
      <Text>{url}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewScreen;

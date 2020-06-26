import React from 'react';
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import Header from '../../components/organisms/Header';
import { HomeStackParamList, HomeScreensTypes } from '../../navigations/home';
import { RouteProp } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

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
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
      <Header
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: onBackIconPressed,
        }}
        centerComponent={{ text: url, style: { color: '#fff' } }}
      />
      <WebView
        style={styles.webview}
        source={{ uri: url }}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color="#3488C0" />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3488C0',
  },
  webview: {
    flex: 1,
    backgroundColor: 'white',
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
});

export default WebViewScreen;

import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import AppContext from '../../hooks/app-context';
import Header from '../../components/organisms/Header';
import MagazineList from '../../components/organisms/MagazineList';
import { NewsItem } from 'domains';
import { HomeStackParamList, HomeScreensTypes } from '../../navigations/home';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeScreenProps {
  navigation: NavigationScreenProp<
    HomeStackParamList,
    HomeScreensTypes.Home
  >;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }: HomeScreenProps) => {
  const appValue = React.useContext(AppContext);
  const { initialized = false } = appValue ?? {};

  const [items, setItems] = React.useState<NewsItem[]>([]);
  React.useEffect(() => {
    if (initialized && appValue?.loadItems) {
      const items = appValue.loadItems();
      setItems(items ?? []);
    }
  }, [initialized]);

  const onItemTouched = React.useCallback((item: NewsItem) => {
    navigation.navigate(HomeScreensTypes.WebView, { url: item?.url ?? '' });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
      />
      <View style={styles.itemListContainer}>
        <MagazineList items={items} onItemTouched={onItemTouched} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemListContainer: {
    flex: 1,
  },
});

export default HomeScreen;

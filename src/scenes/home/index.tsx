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
  navigation: NavigationScreenProp<HomeStackParamList, HomeScreensTypes.Home>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  navigation,
}: HomeScreenProps) => {
  const appValue = React.useContext(AppContext);
  const { initialized = false } = appValue ?? {};

  const [items, setItems] = React.useState<NewsItem[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (initialized && !loading && appValue?.loadItems) {
      setLoading(true);
      const items = appValue.loadItems(undefined, 10);
      setItems(items ?? []);
      setLoading(false);
    }
    return () => { };
  }, [initialized, loading, setItems, setLoading]);

  const onItemTouched = React.useCallback(
    (item: NewsItem) => {
      navigation.navigate(HomeScreensTypes.WebView, { url: item?.url ?? '' });
    },
    [navigation],
  );

  const onScrolledEnd = React.useCallback((currentNum: number) => {
    if (initialized && !loading && appValue?.loadItems) {
      setLoading(true);
      const items = appValue.loadItems(undefined, undefined, currentNum);

      console.log("newItems", items)
      setItems(prevItems => [...prevItems, ...(items ?? [])]);
      setLoading(false);
    }
  }, [initialized, loading, setItems, setLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        centerComponent={{ text: 'RSS Feeds', style: { color: '#fff' } }}
      />
      <View style={styles.itemListContainer}>
        <MagazineList items={items} onItemTouched={onItemTouched} onScrolledEnd={onScrolledEnd} />
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

import React from 'react';
import { View, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Icon } from 'react-native-elements'
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
      setItems(prevItems => [...prevItems, ...(items ?? [])]);
      setLoading(false);
    }
  }, [initialized, loading, setItems, setLoading]);

  const [updating, setUpdating] = React.useState(false);
  const onReloadIconPressed = React.useCallback(async () => {
    if (appValue && updating !== true) {
      setUpdating(true);
      await appValue?.updateItems();
      setItems(appValue?.loadItems(undefined, 10) ?? []);
      setUpdating(false);
    }
  }, [updating, setUpdating, appValue, setItems]);

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
      <Header
        centerComponent={{ text: 'RSS Feeds', style: { color: '#fff' } }}
        rightComponent={() => {
          return updating === false ? <Icon name="refresh" color="#fff" onPress={onReloadIconPressed} /> : <ActivityIndicator size="small" color="#fff" />
        }}
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
    backgroundColor: '#3488C0'
  },
  itemListContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default HomeScreen;

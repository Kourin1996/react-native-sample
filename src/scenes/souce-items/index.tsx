import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import AppContext from '../../hooks/app-context';
import MagazineList from '../../components/organisms/MagazineList';
import Header from '../../components/organisms/Header';
import {
  SourcesScreenTypes,
  SourcesStackParamList,
} from '../../navigations/sources';
import { NewsItem } from 'domains';
import { RouteProp } from '@react-navigation/native';

interface SourceItemsScreenProps {
  route: RouteProp<SourcesStackParamList, SourcesScreenTypes.SourceItems>;
  navigation: NavigationScreenProp<
    SourcesStackParamList,
    SourcesScreenTypes.SourceItems
  >;
}

const SourceItems: React.FC<SourceItemsScreenProps> = ({
  route,
  navigation,
}: SourceItemsScreenProps) => {
  const appValue = React.useContext(AppContext);
  const { initialized = false } = appValue ?? {};
  const { source } = route.params;

  const [items, setItems] = React.useState<NewsItem[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (initialized && !loading && appValue?.loadItems) {
      setLoading(true);
      const items = appValue.loadItems(source, 10);
      setItems(items ?? []);
      setLoading(false);
    }
    return () => {

    }
  }, [initialized, loading, source, setLoading]);

  const onItemTouched = React.useCallback((item: NewsItem) => {
    navigation.navigate(SourcesScreenTypes.WebView, { url: item?.url ?? '' })
  }, []);
  const onBackIconPressed = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onScrolledEnd = React.useCallback((currentNum: number) => {
    if (initialized && !loading && appValue?.loadItems) {
      setLoading(true);
      const items = appValue.loadItems(source, undefined, currentNum);

      setItems(prevItems => [...prevItems, ...(items ?? [])]);
      setLoading(false);
    }
  }, [initialized, loading, setItems, setLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: onBackIconPressed,
        }}
        centerComponent={{ text: source?.name, style: { color: '#fff' } }}
      />
      <View style={styles.itemListContainer}>
        <MagazineList items={items} onItemTouched={onItemTouched} onScrolledEnd={onScrolledEnd} />
      </View>
    </SafeAreaView>
  );
};
/* todo: change heder title to source title */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemListContainer: {
    flex: 1,
  },
});

export default SourceItems;

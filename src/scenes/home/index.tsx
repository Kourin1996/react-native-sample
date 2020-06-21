import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import OperationContext from '../../hooks/operation-context';
import Header from '../../components/organisms/Header';
import MagazineList from '../../components/organisms/MagazineList';
import { NewsItem } from 'domains';
import NewsItemContext from '../../hooks/news-items-context';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const items = React.useContext(NewsItemContext);
  const onItemTouched = React.useCallback((item: NewsItem) => {
    console.log('touched', item);
  }, []);

  const operationContext = React.useContext(OperationContext);
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async (): Promise<void> => {
      await operationContext?.loadItemsBySource();
    })();
    console.log('Home::useEffect');
  }, [operationContext?.loadItemsBySource]);

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

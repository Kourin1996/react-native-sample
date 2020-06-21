import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import MagazineList from '../../components/organisms/MagazineList';
import { NewsItem } from 'domains';

const magazineItem = {
  id: '01',
  sourceId: '02',
  title:
    'Nyaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  summary:
    'Nyaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahoge',
  body: 'Nyan....',
  date: new Date(),
  imageUrls: [
    'https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg',
  ],
};

const magazineList = new Array(10).fill(null).map((_, i) => ({
  ...magazineItem,
  id: i.toString(),
}));

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const onItemTouched = React.useCallback((item: NewsItem) => {
    console.log('touched', item);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemListContainer}>
        <MagazineList items={magazineList} onItemTouched={onItemTouched} />
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

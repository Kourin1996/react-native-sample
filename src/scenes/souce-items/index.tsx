import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import MagazineList from '../../components/organisms/MagazineList';
import Header from '../../components/organisms/Header';
import {
  SourcesScreenTypes,
  SourcesStackParamList,
} from '../../navigations/sources';
import { NewsItem } from 'domains';
import NewsItemContext from '../../hooks/news-items-context';

interface SourceItemsScreenProps {
  navigation: NavigationScreenProp<
    SourcesStackParamList,
    SourcesScreenTypes.SourceItems
  >;
}

const SourceItems: React.FC<SourceItemsScreenProps> = ({
  navigation,
}: SourceItemsScreenProps) => {
  const items = React.useContext(NewsItemContext);
  const onItemTouched = React.useCallback((item: NewsItem) => {
    console.log('touched', item);
  }, []);
  const onBackIconPressed = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: onBackIconPressed,
        }}
        centerComponent={{ text: 'ITEMS', style: { color: '#fff' } }}
      />
      <View style={styles.itemListContainer}>
        <MagazineList items={items} onItemTouched={onItemTouched} />
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

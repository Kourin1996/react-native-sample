import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { NewsItem } from 'domains';
import MagazineItem from '../../molecules/MagazineItem';

interface MagazineListProps {
  items: NewsItem[];
  onItemTouched: (item: NewsItem) => void;
}

const MagazineList: React.FC<MagazineListProps> = (
  props: MagazineListProps,
) => {
  const { items, onItemTouched } = props;
  return (
    <FlatList
      style={styles.container}
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MagazineItem item={item} onItemTouched={onItemTouched} />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 10,
    flex: 1,
  },
  separator: {
    marginTop: 10,
  },
});

export default MagazineList;

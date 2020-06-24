import React from 'react';
import { View, VirtualizedList, StyleSheet } from 'react-native';
import { NewsItem } from 'domains';
import MagazineItem from '../../molecules/MagazineItem';

const NUM_OF_INITIAL_RENDER_ITEMS = 10;

interface MagazineListProps {
  items: NewsItem[];
  onItemTouched: (item: NewsItem) => void;
  onScrolledEnd: (currentNum: number) => void;
}

const MagazineList: React.FC<MagazineListProps> = (
  props: MagazineListProps,
) => {
  const { items, onItemTouched, onScrolledEnd } = props;

  const onEndReached = React.useCallback(() => {
    onScrolledEnd(items.length);
  }, [items, onScrolledEnd]);

  return (
    <VirtualizedList
      style={styles.container}
      initialNumToRender={NUM_OF_INITIAL_RENDER_ITEMS}
      data={items}
      keyExtractor={(item: NewsItem & { index: number }) =>
        item.id ?? item.index.toString()
      }
      renderItem={({ item }: { item: NewsItem }) => (
        <MagazineItem key={item.id} item={item} onItemTouched={onItemTouched} />
      )}
      getItem={(data, index): NewsItem & { index: number } => ({
        index,
        ...data[index],
      })}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      getItemCount={() => items.length}
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

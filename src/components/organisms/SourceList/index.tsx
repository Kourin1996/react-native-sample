import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { NewsSource } from 'domains';
import SourceItem from '../../molecules/SourceItem';

interface MagazineListProps {
  sources: NewsSource[];
  onSourceTouched: (source: NewsSource) => void;
}

const MagazineList: React.FC<MagazineListProps> = (
  props: MagazineListProps,
) => {
  const { sources, onSourceTouched } = props;
  return (
    <FlatList
      style={styles.container}
      data={sources}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SourceItem source={item} onSourceTouched={onSourceTouched} />
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

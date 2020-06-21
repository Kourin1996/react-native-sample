import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
} from 'react-native';
import { NewsItem } from '../../../domains';

interface MagazineItemProps {
  item: NewsItem;
  onItemTouched: (item: NewsItem) => void;
}

const MagazineItem: React.FC<MagazineItemProps> = (
  props: MagazineItemProps,
) => {
  const { item, onItemTouched } = props;
  const onPress = React.useCallback(() => {
    onItemTouched(item);
  }, [item, onItemTouched]);
  return (
    <TouchableHighlight onPress={onPress} underlayColor="white">
      <View style={styles.container}>
        {/* For Image */}
        <View>
          <Image source={{ uri: item.imageUrls[0] }} style={styles.image} />
        </View>
        <View style={styles.rightColumnContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.summary} numberOfLines={3}>
            {item.summary}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
  },
  rightColumnContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    flexGrow: 0,
    flexShrink: 0,
  },
  summary: {
    marginTop: 10,
    flex: 1,
  },
});

export default MagazineItem;

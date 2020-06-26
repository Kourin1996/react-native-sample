import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
} from 'react-native';
import { NewsSource } from '../../../domains';

interface SourceItemProps {
  source: NewsSource;
  onSourceTouched: (source: NewsSource) => void;
}

const MagazineItem: React.FC<SourceItemProps> = (props: SourceItemProps) => {
  const { source, onSourceTouched } = props;
  const onPress = React.useCallback(() => {
    onSourceTouched(source);
  }, [source, onSourceTouched]);
  return (
    <TouchableHighlight onPress={onPress} underlayColor="white">
      <View style={styles.container}>
        <Image source={{ uri: source.logoUrl }} style={styles.image} />
        <View style={styles.title}>
          <Text numberOfLines={1}>{source.name}</Text>
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
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    flex: 1,
  },
});

export default MagazineItem;

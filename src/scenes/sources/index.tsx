import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import {
  SourcesScreenTypes,
  SourcesStackParamList,
} from '../../navigations/sources';
import NewsSourcesContext from '../../hooks/news-sources-context';
import { NewsSource } from 'domains';
import NewsSourceList from '../../components/organisms/SourceList';
import Header from '../../components/organisms/Header';

interface SourcesScreenProps {
  navigation: NavigationScreenProp<
    SourcesStackParamList,
    SourcesScreenTypes.Sources
  >;
}

const SourcesScreen: React.FC<SourcesScreenProps> = ({
  navigation,
}: SourcesScreenProps) => {
  const sources = React.useContext(NewsSourcesContext);
  const onSourceTouched = React.useCallback(
    (source: NewsSource) => {
      console.log('touched', source);
      navigation.navigate(SourcesScreenTypes.SourceItems, {
        itemId: 86,
        otherParam: 'anything you want here',
      });
    },
    [navigation],
  );
  return (
    <SafeAreaView style={styles.container}>
      <Header
        centerComponent={{ text: 'Sources', style: { color: '#fff' } }}
        rightComponent={{ icon: 'add', color: '#fff' }}
      />
      <View style={styles.sourceListContainer}>
        <NewsSourceList sources={sources} onSourceTouched={onSourceTouched} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sourceListContainer: {
    flex: 1,
  },
});

export default SourcesScreen;

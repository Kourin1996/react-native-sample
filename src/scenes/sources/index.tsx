import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import {
  SourcesScreenTypes,
  SourcesStackParamList,
} from '../../navigations/sources';
import NewsSourcesContext from '../../hooks/news-sources-context';
import OperationContext from '../../hooks/operation-context';
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
  const operationContext = React.useContext(OperationContext);
  const onSourceTouched = React.useCallback(
    (source: NewsSource) => {
      if (operationContext !== null) {
        operationContext.resetItems();
      }
      navigation.navigate(SourcesScreenTypes.SourceItems, { source });
    },
    [operationContext, navigation],
  );
  const onAddIconPressed = React.useCallback(() => {
    navigation.navigate(SourcesScreenTypes.NewSource);
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        centerComponent={{ text: 'Sources', style: { color: '#fff' } }}
        rightComponent={{
          icon: 'add',
          color: '#fff',
          onPress: onAddIconPressed,
        }}
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

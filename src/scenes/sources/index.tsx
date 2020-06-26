import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import AppContext from '../../hooks/app-context';
import {
  SourcesScreenTypes,
  SourcesStackParamList,
} from '../../navigations/sources';
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
  const appValue = React.useContext(AppContext);
  const { initialized = false } = appValue ?? {};

  const [sources, setSources] = React.useState<NewsSource[]>([]);
  React.useEffect(() => {
    if (initialized && appValue?.loadSources) {
      const sources = appValue.loadSources();
      setSources(sources ?? []);
    }
  }, [initialized]);

  const onNewSourceAdded = React.useCallback((newSource: NewsSource) => {
    if (initialized && appValue?.loadSources) {
      const sources = appValue.loadSources();
      setSources(sources ?? []);
    }
  }, [initialized, appValue, setSources]);

  const onSourceTouched = React.useCallback(
    (source: NewsSource) => {
      navigation.navigate(SourcesScreenTypes.SourceItems, { source });
    },
    [navigation, onNewSourceAdded],
  );
  const onAddIconPressed = React.useCallback(() => {
    navigation.navigate(SourcesScreenTypes.NewSource, { onNewSourceAdded });
  }, [navigation]);

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
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
    backgroundColor: '#3488C0'
  },
  sourceListContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default SourcesScreen;

import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import AppContext from '../../hooks/app-context';
import { Input, Button } from 'react-native-elements';
import Header from '../../components/organisms/Header';
import {
  SourcesScreenTypes,
  SourcesStackParamList,
} from '../../navigations/sources';
import { RouteProp } from '@react-navigation/native';

interface NewSourceScreenProps {
  route: RouteProp<SourcesStackParamList, SourcesScreenTypes.Sources>;
  navigation: NavigationScreenProp<
    SourcesStackParamList,
    SourcesScreenTypes.NewSource
  >;
}

const NewSourceScreen: React.FC<NewSourceScreenProps> = ({
  route,
  navigation,
}: NewSourceScreenProps) => {
  const appValue = React.useContext(AppContext);

  const onBackIconPressed = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);
  const onAddPressed = React.useCallback(async () => {
    setIsLoading(true);

    try {
      const source = await appValue?.addSource(name, url);
      setIsLoading(false);
      if (source) {
        route.params.onNewSourceAdded(source);
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [appValue, navigation, setIsLoading, name, url]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: onBackIconPressed,
        }}
        centerComponent={{ text: 'New Source', style: { color: '#fff' } }}
      />
      <View style={styles.formContainer}>
        <View>
          <Input label="Name" value={name} onChangeText={setName} />
        </View>
        <View>
          <Input label="RSS URL" value={url} onChangeText={setUrl} />
        </View>
        <View style={styles.addButton}>
          <Button
            title="Add New Source"
            loading={isLoading}
            onPress={onAddPressed}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingTop: 20,
    paddingVertical: 20,
  },
  addButton: {
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default NewSourceScreen;

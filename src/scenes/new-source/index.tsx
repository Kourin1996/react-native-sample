import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Input, Button } from 'react-native-elements';
import Header from '../../components/organisms/Header';
import {
  SourcesScreenTypes,
  SourcesStackParamList,
} from '../../navigations/sources';

interface NewSourceScreenProps {
  navigation: NavigationScreenProp<
    SourcesStackParamList,
    SourcesScreenTypes.NewSource
  >;
}

const NewSourceScreen: React.FC<NewSourceScreenProps> = ({
  navigation,
}: NewSourceScreenProps) => {
  const onBackIconPressed = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false);
  const onAddPressed = React.useCallback(() => {
    setIsLoading(true);

    try {
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [setIsLoading, name, url]);

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
        <View>
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
});

export default NewSourceScreen;

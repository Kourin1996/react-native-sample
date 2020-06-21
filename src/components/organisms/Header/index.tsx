import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Header as RneHeader,
  HeaderProps as RneHeaderProps,
} from 'react-native-elements';

type HeaderProps = RneHeaderProps;

const Header: React.FC<HeaderProps> = (props: RneHeaderProps) => {
  return (
    <RneHeader
      barStyle="light-content"
      backgroundColor="transparent"
      containerStyle={styles.container}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    height: 50,
    backgroundColor: '#3488C0',
    borderBottomWidth: 0,
  },
  itemListContainer: {
    flex: 1,
  },
});

export default Header;
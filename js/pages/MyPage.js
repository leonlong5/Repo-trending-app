import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import NavigationBar from '../common/NavigationBar'

export default class MyPage extends React.Component {
  render() {
      //get navigation from props
      const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar
          title='My profle page!'
        />
        <Button
            title="CustomKeyPage"
            onPress={() =>
                this.props.navigation.navigate('CustomKeyPage')
            }
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0
  },
});

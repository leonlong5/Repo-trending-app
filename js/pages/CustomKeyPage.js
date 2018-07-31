import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import NavigationBar from '../common/NavigationBar'

export default class CustomKeyPage extends React.Component {
  render() {
      //get navigation from props
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar
          title='CustomKey page!'
          LeftButton = "Back"
          RightButton = "Save"
          navigation = {navigation}
        />
        <Button 
            title = "Go Back"
            onPress = { () => {
                //button go back to homepage
                navigation.goBack();
            }}
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
  },
});

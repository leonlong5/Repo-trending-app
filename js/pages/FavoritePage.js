import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

export default class FavoritePage extends React.Component {
  render() {
      //get navigation from props
      const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>This is Favorite page!</Text>
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

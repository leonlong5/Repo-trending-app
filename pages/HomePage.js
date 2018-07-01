import React from 'react';
import { StyleSheet, Text, View, Button, TextInput,ScrollView} from 'react-native';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: '', te: []};
    }
  

  render() {
    const navigation= this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Home Page
        </Text>
        
        <View style={styles.navWrapper}>  
          <Button
                style={styles.button}
                title="About"
                onPress = {()=> {
                    navigation.navigate('About')
                }}
          /> 
          <Button
                style={styles.button}
                title="List"
                onPress = {()=> {
                    navigation.navigate('List')
                }}
            /> 
          <Button
                style={styles.button}
                title="Go to Main navigator"
                onPress = {()=> {
                    navigation.navigate('TabNav')
                }}
            /> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  title: {
    marginTop: '10%',
    marginBottom: '10%',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navWrapper: {

  },
  button: {
    backgroundColor: 'blue'
  }
});

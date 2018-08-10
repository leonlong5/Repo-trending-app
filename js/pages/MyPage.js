import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image} from 'react-native';
import NavigationBar from '../common/NavigationBar'

export default class MyPage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      userInfo:null
    }
  }
  async logIn() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('235169833858929', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture`);
        const userInfo = await response.json();
        console.log(userInfo)
        this.setState({userInfo})
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }

  _renderUserInfor() {
    return (
      <View>
        <Image
        source={{url: this.state.userInfo.picture.data.url}}
        style={{width:50, height:50, borderRadius:20}}
        />
        <Text style={{fontSize: 20}}>{this.state.userInfo.name}</Text>
        <Text>ID: {this.state.userInfo.id}</Text>
      </View>
    )
  }

  render() {
      //get navigation from props
      const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar
          title='My profle page!'
        />
        {!this.state.userInfo ? console.log("User not logedin") : (this._renderUserInfor())}

        <Button
            title="CustomKeyPage"
            onPress={() =>
                this.props.navigation.navigate('CustomKeyPage')
            }
            />

        <Button
            title="Log in with Facebook"
            onPress={() =>
                this.logIn()
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

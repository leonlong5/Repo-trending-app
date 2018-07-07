import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, RefreshControl, ActivityIndicator, SwipeableFlatList, TouchableHighlight} from 'react-native';
import AppNavigators from '../common/AppNavigators'

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataArray: CITIES
    }
  }

  componentDidMount() {
      this.timer = setTimeout(()=>{
          this.props.navigator.resetTo({
              component:HomePage
          })
      }, 2000)
  }

  componentWillUnmount() {
    this.timer&&clearTimeout(this.timer);
  }

  render() {
      //get navigation from props
    const { navigation } = this.props;
    
    return (
      <View>
        <Text>Welcome!</Text>
        <Navigator
            title={'Enter App'}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

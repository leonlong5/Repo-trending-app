import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

const themeColor = "#2196F3"
export default class NavigationBar extends React.Component {
  render() {
    //get navigation from props
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        {
          !this.props.LeftButton && 
          <Text style={styles.btnLeft}></Text>
        }
        {
          this.props.LeftButton && 
          <Button
          style={styles.btnLeft}
          title="< Back"
          onPress={() => {
            navigation.goBack()
          }}
          />
        }
        
        <Text style={styles.title}>{this.props.title}</Text>
        {
          !this.props.RightButton && 
          <Text style={styles.btnRight}></Text>
        }
        {
          this.props.RightButton && 
        <Button 
            style={styles.btnRight}
            title = "Save"
            onPress = { () => {
                //button go back to homepage
                navigation.goBack();
            }}
        />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },

  title: {
    marginTop: '10%',
    marginBottom: '10%',
    marginLeft: '10%',
    marginRight: '10%',
    fontSize: 20
  },
  btnLeft: {
    color:'white',
  },
  btnRight: {
    color:'white',
  }
});

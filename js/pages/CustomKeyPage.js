import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, AsyncStorage, Image} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import { CheckBox } from 'react-native-elements'
import keysData from '../../res/data/keys.json'
import ViewUtils from '../util/ViewUtils'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
export default class CustomKeyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArray:[]
        }
    }
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('keys');
          
          if (value == null) {
            // if the first time, no data in storage
              value = keysData
          }
          this.setState({
            dataArray: JSON.parse(value)
          })
         } catch (error) {
           // Error retrieving data
         }
      }
    componentDidMount(){
        this._retrieveData()
    }
    loadData(){
        this.setState({
            dataArray: result
        })
    }
    onSave(i){
        try {
            AsyncStorage.setItem('keys', JSON.stringify(this.state.dataArray));
            const { navigation } = this.props;
            navigation.goBack()
        } catch (error) {
            // Error saving data
            console.log(error)
        }
    }
    onCheck(i){
        arr = this.state.dataArray
        arr[i].checked = !arr[i].checked
        this.setState({dataArray: arr})
    }
    renderView(){
        if (!this.state.dataArray || this.state.dataArray.length === 0)return;
        var len = this.state.dataArray.length;
        var views = [];
        for (var i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                    {/* <Text>{this.state.dataArray[i].name}</Text>
                    <Text>{this.state.dataArray[i+1].name}</Text> */}
                    {this.renderCheckBox(this.state.dataArray[i], i)}
                    {this.renderCheckBox(this.state.dataArray[i + 1], i+1)}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
            </View>
        )
        return views;
    }
    renderCheckBox(data, i) {
        let leftText = data.name;
        let isChecked = this.isRemoveKey ? false : data.checked;
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                title={leftText}
                checked={data.checked}
                onPress={() => this.onCheck(i)}
                checkedImage={<Image source={require('../../res/img/ic_check_box.png')}/>}
                unCheckedImage={<Image source={require('../../res/img/ic_check_box_outline_blank.png')}/>}
            />);
    }
    render() {
        //get navigation from props
        const { navigation } = this.props;
        let saveBtn =  <Button 
            style={styles.btnRight}
            title = "Save"
            onPress = { () => {
                //button go back to homepage
                this.onSave()
            }}
        />
        return (
        <View style={styles.container}>
            <NavigationBar
            title='CustomKey page!'
            LeftButton = "Back"
            RightButton = {saveBtn}
            navigation = {navigation}
            />
            <ScrollView>
                {this.renderView()}
            </ScrollView>
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
  item: {
    flexDirection:'row',
    alignItems: 'center'
  },
  line: {
    height:1,
    backgroundColor: 'black'
  }
});

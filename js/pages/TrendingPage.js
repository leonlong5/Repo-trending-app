import React,{Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput,ScrollView, FlatList, RefreshControl, ActivityIndicator, SwipeableFlatList,TouchableOpacity, TouchableHighlight} from 'react-native';
import DataRepository from '../expand/dao/DataRepository'
import TrendingCell from '../common/TrendingCell'
import Popover from 'react-native-popover-view'

dailyTimeSpan = 'since=daily'
weeklyTimeSpan = 'since=weekly'
monthlyTimeSpan = 'since=monthly'
themeColor = '#2196F2'
heightColor = '#098BEF'
const URL = "https://github.com/trending/";
export default class TrendingPage extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository("trending")
    this.state = {
      text: '', 
      result: '',
      data:'',
      timeSpan: 'daily',
      dayliybg: heightColor,
      weeklybg: themeColor,
      monthlybg: themeColor
    };
  }

  onLoad(){
    let url = URL+this.text+"?since="+this.state.timeSpan
    console.log(url)
    this.dataRepository.fetchNetRepository(url)
        .then(result=>{
            this.setState({
                data: result,
                result: JSON.stringify(result),
                isLoading: false
            })
        })
        .catch(eror=>{
          console.log(error.message)
        })
  }
  
  _renderItem(data) {
    return <TrendingCell data={data} navigation={this.props.navigation}/>
  } 

  loadData() {
    this.setState({ isLoading: true});
    setTimeout(()=>{
      let data = [];
      for (let i = this.state.data.length-1; i>=0; i--) {
        data.push(this.state.data[i]);
      }

    this.setState({
      data: data,
      isLoading: false
    })
    }, 1000);

  }

  handleTime(timeSpanArg){
    let dayliybgc = themeColor
    let weeklybgc = themeColor
    let monthlybgc = themeColor
    if (timeSpanArg == 'daily') {
      dayliybgc = heightColor
    } else if (timeSpanArg == 'weekly') {
      weeklybgc = heightColor
    }else {
      monthlybgc = heightColor
    }
    this.setState({
      timeSpan: timeSpanArg,
      dayliybg: dayliybgc,
      weeklybg: weeklybgc,
      monthlybg: monthlybgc
    }, () => {
      this.onLoad()
    })
    
  }

  render() {
    const navigation= this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>GithubTrending</Text>
        <View style={styles.popoverContainer}>
          <TouchableHighlight
          style={[styles.button, {backgroundColor: this.state.dayliybg}]}
          underlayColor='royalblue'
          onPress={()=>this.handleTime('daily')}
          >
            <Text style={styles.buttonText}> daily </Text>
          </TouchableHighlight>
          <TouchableHighlight
          style={[styles.button, {backgroundColor: this.state.weeklybg}]}
          underlayColor='royalblue'
          onPress={()=>this.handleTime('weekly')}
          >
            <Text style={styles.buttonText}> weekly </Text>
          </TouchableHighlight>
          <TouchableHighlight
          style={[styles.button, {backgroundColor: this.state.monthlybg}]}
          underlayColor='royalblue'
          onPress={()=>this.handleTime('monthly')}
          >
            <Text style={styles.buttonText}> monthly </Text>
          </TouchableHighlight>
        </View>
        <TextInput style={{height:30, borderWidth:1}}
                            onChangeText={(text)=> {
                                this.text = text;
                            }}
        />
        <Text style={styles.btn} onPress={()=>this.onLoad()}>
            Search
        </Text>
        <View style={{flexDirection: 'row'}}>
            {/* <Text style={{flex:1}}>{this.state.result}</Text> */}
            <FlatList
                      data = {this.state.data}
                      renderItem = {(item) => this._renderItem(item)}
                      keyExtractor={(item, index) => index.toString()}
            />
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
  },
  header: {
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: '#2196F3',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  btn: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#2196F3',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  title: {
    marginTop: '10%',
    marginBottom: '10%',
    marginLeft: '10%',
    marginRight: '10%',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navWrapper: {

  },
  item: {
    backgroundColor: 'lightblue',
    marginBottom: '1%'
  },
  popoverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3'
  },
  button: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
  }
});
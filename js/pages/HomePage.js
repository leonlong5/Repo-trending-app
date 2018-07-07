import React,{Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput,ScrollView, FlatList, RefreshControl, ActivityIndicator, SwipeableFlatList, TouchableHighlight} from 'react-native';
import DataRepository from '../expand/dao/DataRepository'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import RepositoryCell from '../common/RepositoryCell'

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR =  '&sort=stars';
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository();
    this.state = {
      text: '', 
      data: '',
    };
  }

  render() {
    const navigation= this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Popular</Text>
        <ScrollableTabView 
          style={styles.tabView} 
          tabBarBackgroundColor="#2196F3" 
          tabBarInactiveTextColor="mintcream" 
          tabBarActiveTextColor="white"
          tabBarUnderlineStyle={{backgroundColor: '#e7e7e7',height:2}}>
          <PopularTab tabLabel="Java">Java</PopularTab>
          <PopularTab tabLabel="IOS">IOS</PopularTab>
          <PopularTab tabLabel="Android">Android</PopularTab>
          <PopularTab tabLabel="JavaScript">JavaScript</PopularTab>
        </ScrollableTabView>
        
      </View>
    );
  }
}


class PopularTab extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository();
    this.state = {
      text: '', 
      data: '',
      isLoading: false};
  }
  
  genURL(key){
    return URL+this.props.tabLabel+QUERY_STR;
  }

  componentDidMount() {
    this.onLoad();
  }

  _renderItem(data) {
    return <RepositoryCell data={data}/>
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

  onLoad() {
    let url = this.genURL(this.text)
    this.dataRepository.fetchNetRepository(url)
        .then(result=>{
          this.setState({
            data: result.items
          })
        }).catch(error=>{
          console.log(error.message)
        })
    }

    render(){
      return (
          <View style={styles.container}>
            <FlatList
                      data = {this.state.data}
                      renderItem = {(item) => this._renderItem(item)}
                      keyExtractor={(item, index) => index.toString()}
                      refreshControl = {
                        <RefreshControl
                        title = {'Loading'}
                        tintColor={'#2196F3'}
                        refreshing = {this.state.isLoading}
                        //refresh logic
                        onRefresh = {() => {
                          this.loadData(true);
                        }}  
                        />
                    }
            />
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
  }
});

import React,{Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput,ScrollView, FlatList, RefreshControl, ActivityIndicator, SwipeableFlatList, TouchableHighlight} from 'react-native';
import GitHubTrending from 'GitHubTrending'

const URL = "https://github.com/trending/";
export default class HTrendingTest extends Component {
  constructor(props) {
    super(props);
    this.tredning = new GitHubTrending();
    this.state = {
      text: '', 
      result: '',
    };
  }

  onLoad(){
    let url = URL+this.text
    this.tredning.fetchTrending(url)
        .then(result=>{
            this.setState({
                result: JSON.stringify(result),
            })
        })
        .catch(eror=>{
            
        })
  }

  render() {
    const navigation= this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>GithubTrending Test</Text>
        <TextInput style={{height:30, borderWidth:1}}
                            onChangeText={(text)=> {
                                this.text = text;
                            }}
        />
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.text} onPress={()=>this.onLoad()}>
                Load data
            </Text>
            <Text style={{flex:1}}>{this.state.result}</Text>
        </View>
        
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

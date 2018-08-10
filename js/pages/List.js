import React from 'react';
import { Image, StyleSheet, Text, View, Button, FlatList, RefreshControl, ActivityIndicator, SwipeableFlatList, TouchableHighlight, AsyncStorage, TouchableOpacity} from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: true,
      isLoading: false,
      dataArray: []
    }
  }
  
  componentDidMount() {
    let list =AsyncStorage.getItem('likeList')
    list.then((result)=>{
      console.log(result)
      this.setState({
        isReady: false,
        dataArray: JSON.parse(result)
      });
    })
  }

  _renderItem(data) {
    console.log(data)
    return <TouchableOpacity style={styles.container}>
           <View style={styles.item} id={data.id}>
               <Text 
                   onPress={() =>
                       this.props.navigation.navigate('RepositoryDetail',{
                           name: data.full_name
                       })
                   }
                   style={styles.title}>{data.full_name} </Text>
               <HTMLView
                       value={data.description}
                       stylesheet={{
                           p: styles.description,
                           a: styles.description
                       }}
                   />
               <View style={styles.wrapper}>
                   <View style={styles.info}>
                       <Text>Author:</Text>
                       <Image
                               source={{url: data.avatar_url}}
                               style={{height:22, width:22}}
                               />
                       
                   </View>
                   <View style={styles.info}>
                       <Text>Stars:</Text>
                       <Text style={styles.text}>{data.stargazers_count}</Text>
                   </View>
                   <Image style={styles.star} source={require('../../res/images/ic_star.png')}/>
               </View>
           </View>
       </TouchableOpacity>
  }

  loadData(refreshing) {
    //on refreshing page, set the isLoading to true, will show the loading animation circle
    if (refreshing) {
      this.setState({
        isLoading: true
      })
    }
    setTimeout(()=>{
      let dataArray = [];
      //refreshing page goes here
      if (refreshing) {
        //for demonstration here just reversed the array to display
        for (let i = this.state.dataArray.length-1; i>=0; i--) {
          dataArray.push(this.state.dataArray[i]);
        }
      //loading more goes here
      } else {
        //for demonstration we will append the CITIES to the end
        dataArray = this.state.dataArray.concat(CITIES)
      }

      //update the state
      this.setState({
        dataArray: dataArray,
        isLoading: false
      })
    })
  }

  genIndicator() {
    return <View style={styles.indicatorContainer}>
              <ActivityIndicator 
                style={styles.indicator}
                size={'large'}
                color={'red'}
                animating={true}
              />
              <Text>Loading more...</Text>
          </View>
  }

  genQuickAction(rowData) {
    let item = rowData.item;
    return <View style={styles.quickContainer}>
      <TouchableHighlight>
        <View style={styles.quick}>
          <Button 
            title = "Delete"
            onPress = { () => {
              updatedArray = this.state.dataArray;
              i = updatedArray.length;
              while (i--) {
                if (updatedArray[i].id == item.id){
                  updatedArray.splice(i, 1);
                }
              }
              this.setState({
                dataArray: updatedArray
              })
            }}
          />
        </View>
      </TouchableHighlight>
    </View>
  }

  render() {
      //get navigation from props
    const { navigation } = this.props;
    if (this.state.isReady) {
      return <View><Text>Loading...</Text></View>;
    }
    return (
      <View>
        <TouchableOpacity onPress = {() => this.props.navigation.goBack()}>
                    <View style = {styles.nav}>
                        <Text style = {{color: 'white'}}>Go back</Text>
                    </View>
        </TouchableOpacity>
        {/* {console.log(this.state.dataArray)} */}
        <SwipeableFlatList
          //data source of the flatlist
          //you can import data directly as data = {CITIES}
          //below is from state for easier manipulation for later like refreshing loading more recent items
          data = {this.state.dataArray}
          //render item method
          renderItem = {(item) => this._renderItem(item.item)}
          keyExtractor={(item, index) => index.toString()}
          //on pull down refreshing 
          refreshControl = {
            <RefreshControl
            title = {'Loading'}
            color={['red']}
            tintColor={'orange'}
            //set this to true when waiting for new data from a refresh
            refreshing = {this.state.isLoading}
            //refresh logic
            onRefresh = {() => {
              // this.loadData(true);
            }}  
            />
          }
          renderQuickActions={(rowData) => this.genQuickAction(rowData)}
          maxSwipeDistance= {100}
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
  
  
  text: {
    color: 'white'
  },
  indicatorContainer:{
    alignItems: 'center'
  },
  indicator: {
    margin: 10
  },
  quickContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15,
    marginRight: 15,
    marginTop: 5
  },
  quick: {
    backgroundColor: 'red',
    flex:1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 15,
    width: 200
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 3,
    borderWidth: 0.5,
    borderColor:"#dddddd",
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset:{width:0.5, height:0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation:2,
    height: 150,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
},
wrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
},
title: {
    fontSize: 18,
    marginBottom: 5,
    color:'#212121'
},
description: {
    fontSize: 14,
    marginBottom: 5,
    color: '#757575'
},
info: {
    flexDirection: "row", 
    alignItems: 'center'
},
star: {
    width: 22,
    height:22
},
nav: {
  paddingTop: 30,
  paddingBottom:10,
  backgroundColor: "#2196F2",
  alignItems: 'center', 
  justifyContent: 'center', 
}
});

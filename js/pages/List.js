import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, RefreshControl, ActivityIndicator, SwipeableFlatList, TouchableHighlight} from 'react-native';


const CITIES = [{city: 'New York', population:8550405},
      {city: 'Los Angeles', population:	3971883},
      {city: 'Chicago', population: 2720546},
      {city: 'Houston', population:	2296224},
      {city: 'Philadelphia', population:	1567442},
      {city: 'Phoenix', population:	1563025},
      {city: 'San Antonio', population:	1469845},
      {city: 'San Diego', population:	1394928},
      {city: 'Dallas', population:	1300092},
      {city: 'San Jose', population:	1026908},
      {city: 'Austin', population:	931830},
      {city: 'Jacksonville', population:	868031},
      {city: 'San Francisco', population:	864816},
      {city: 'Indianapolis', population:	853173},
      {city: 'Columbus', population:	850106},
      {city: 'Fort Worth', population:	833319},
      {city: 'Charlotte', population:	827097},
      {city: 'Seattle', population:	684451},
      {city: 'Denver', population:	682545},
      {city: 'El Paso', population:	681124}]

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataArray: CITIES
    }
  }
  
  _renderItem(data) {
    return <View style={styles.item} id={data.item.id}>
            <Text style={styles.text}>City: {data.item.city} ;</Text>
            <Text style={styles.text}>Population: {data.item.population}</Text>
           </View>
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

  genQuickAction() {
    return <View style={styles.quickContainer}>
      <TouchableHighlight>
        <View style={styles.quick}>
          <Text>Delete</Text>
        </View>
      </TouchableHighlight>
    </View>
  }

  render() {
      //get navigation from props
    const { navigation } = this.props;
    
    return (
      <View>
        <Text>This is list page!</Text>
        <Button 
            title = "Go Back"
            onPress = { () => {
                //button go back to homepage
                navigation.goBack();
            }}
        />
        <SwipeableFlatList
          //data source of the flatlist
          //you can import data directly as data = {CITIES}
          //below is from state for easier manipulation for later like refreshing loading more recent items
          data = {this.state.dataArray}
          
          //render item method
          renderItem = {(data) => this._renderItem(data)}
          
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
              this.loadData(true);
            }}  
            />
          }

          // pull up loading more 
          ListFooterComponent = {() => this.genIndicator()}
          onEndReached={() => {
            this.loadData()
          }}

          renderQuickActions={() => this.genQuickAction()}
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
  
  item: {
    backgroundColor: 'lightblue',
    height: 100,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
    marginRight: 15
  },
  quick: {
    backgroundColor: 'red',
    flex:1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 15,
    width: 200
  }
});

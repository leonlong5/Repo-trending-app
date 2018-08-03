import React,{Component} from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity} from 'react-native';

export default class RepositoryCell extends Component {
    constructor(props) {
      super(props);
      this.state = {
          isFavorite: false,
          favoriteIcon:require('../../res/images/ic_unstar_transparent.png')
      };
    }
    setFavoriteState(isFavorite){
        this.setState({
            isFavorite: isFavorite,
            favoriteIcon: isFavorite?require('../../res/images/ic_star.png'):require('../../res/images/ic_unstar_transparent.png')
        })
    }
    onPressFavorite(){
        this.setFavoriteState(!this.state.isFavorite)
        onSave()
    }
    onSave(){
        try {
            AsyncStorage.setItem('keys', JSON.stringify(this.state.dataArray));
            const { navigation } = this.props;
            navigation.goBack()
        } catch (error) {
            // Error saving data
            console.log(error)
        }
    }
    render() {
      const data= this.props.data.item;
      let favoriteButton = <TouchableOpacity
        onPress={()=>this.onPressFavorite()}
      >
          <Image
            style={[{height:22, width:22},{tintColor: "#2196F3"}]}
            source={this.state.favoriteIcon}
          />
      </TouchableOpacity>
      return (
          <TouchableOpacity style={styles.container}>
            <View style={styles.item} id={data.id}>
                <Text style={styles.title}>Name: {data.full_name} ;</Text>
                <Text style={styles.description}>Description: {data.description}</Text>
                <View style={styles.wrapper}>
                    <View style={styles.info}>
                        <Text>Author:</Text>
                        <Image
                            source={{url:data.owner.avatar_url}}
                            style={{height:22, width:22}}
                            />
                    </View>
                    <View style={styles.info}>
                        <Text>Stars:</Text>
                        <Text style={styles.text}>{data.stargazers_count}</Text>
                    </View>
                    {favoriteButton}
                </View>
            </View>
        </TouchableOpacity>
       );
    }
  }

  const styles = StyleSheet.create({
    container: {
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderWidth: 0.5,
        borderColor:"#dddddd",
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset:{width:0.5, height:0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation:2
    },
    wrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16,
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
    cell_container: {

    }
  });
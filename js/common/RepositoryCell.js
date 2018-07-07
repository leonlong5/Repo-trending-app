import React,{Component} from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity} from 'react-native';

export default class RepositoryCell extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    
  
    render() {
      const data= this.props.data.item;
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
                    <Image style={styles.star} source={require('../../res/images/ic_star.png')}/>
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
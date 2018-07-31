/**
 * RepositoryDetail
 * @flow
 **/
'use strict'
import React, {Component} from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    WebView,
    Platform,
    TouchableOpacity,
    Text,
    View,
    Button
} from 'react-native'
const TRENDING_URL = 'https://github.com/'
export default class RepositoryDetail extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const repoName = navigation.state.params.name
        const url = TRENDING_URL + repoName
        this.state = {
            repourl: url,
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress = {() => this.props.navigation.goBack()}>
                    <View style = {styles.nav}>
                        <Text style = {{color: 'white'}}>Go back</Text>
                    </View>
                </TouchableOpacity>
                <WebView
                    source={{uri: this.state.repourl}}
                    style={{marginTop:10}}
                    />
                
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    nav: {
        paddingTop: 30,
        paddingBottom:10,
        backgroundColor: "#2196F2",
        alignItems: 'center', 
        justifyContent: 'center', 
    }
})

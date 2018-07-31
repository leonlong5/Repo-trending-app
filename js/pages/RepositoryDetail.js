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
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value');
        this.state = {
            // url: this.url,
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Details Screen</Text>
                {/* <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text> */}
                
                <Button
                title="Go back"
                onPress={() => this.props.navigation.goBack()}
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
})

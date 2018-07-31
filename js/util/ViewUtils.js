import React from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

export default class ViewUtils{
    static getLeftButton() {
        return <TouchableOpacity
            style={{padding: 8}}
            onPress = {()=>{
                this.props.navigator.pop();
            }}>
            <Image 
                style={{width:26, height: 26, tiniColor: 'yellow'}}
                source={require('../../res/images/ic_arrow_back_white_36pt.png')}/>
            </TouchableOpacity>;
    }
}
import React from 'react';
import { View, Text } from 'react-native';
import  { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import HomePage from '../pages/HomePage';
import List from '../pages/List'
import About from '../pages/About'
import Ionicons from 'react-native-vector-icons/Ionicons'

//bottom tab navigator
export const AppTabNavigator = createBottomTabNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions:{
            tabBarLabel: 'Home',
            //use Ionicons in the project, check 
            //https://oblador.github.io/react-native-vector-icons/
            tabBarIcon: ({tintColor, focused})=>(
                <Ionicons
                    name = {focused ? 'ios-home' : 'ios-home-outline'}
                    size = {26}
                    style = {{color: tintColor}}
                />

            ),
        }
    },
    List: {
        screen: List,
        navigationOptions:{
            tabBarLabel: 'List',
            tabBarIcon: ({tintColor, focused})=>(
                <Ionicons
                    name = {focused ? 'ios-list' : 'ios-list-outline'}
                    size = {26}
                    style = {{color: tintColor}}
                />

            ),
        }
    },
    About: {
        screen: About,
        navigationOptions:{
            tabBarLabel: 'About',
            tabBarIcon: ({tintColor, focused})=>(
                <Ionicons
                    name = {focused ? 'ios-people' : 'ios-people-outline'}
                    size = {26}
                    style = {{color: tintColor}}
                />

            ),
        }
    }
})


//stack Navigator
export const AppStackNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            title: "Welcome page"
        }
    },
    List: {
        screen : List,
        navigationOptions: ({
            title: 'List'
        }) 
    },
    About: {
        screen : About,
        navigationOptions: {
            title: "About"
        }
    },
    TabNav: {
        screen: AppTabNavigator,
        navigationOptions: {
            title: 'Home page with tab nav'
        }
    }
})
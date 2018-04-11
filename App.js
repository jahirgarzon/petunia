/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {
  DrawerNavigator,
  StackNavigator 
} from 'react-navigation';
import PetViewer from './components/PetViewer'

 class Home extends Component {
  static navigationOptions = {
	drawerLabel:'Home',
    
}





  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
	      rescueME.        
        </Text>
        <Text style={styles.description}>
          where every pet finds it's human.
        </Text>			
	<Text style={styles.instructions}>
        swipe right to get started!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FCE94F',
  },
  welcome: {
    fontSize: 45,
    textAlign: 'center',
    marginTop: '40%',
    fontWeight:'bold',
    color:'red'
  },
  description: {
    fontSize: 25,
 	   textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    color:'blue'
  },
  instructions:{
    fontSize:20
  }
});
const MyApp = DrawerNavigator({
  Home: {
    screen: Home
  },
  PetView : {
    screen: PetViewer
  }
})
export default MyApp 
import React, { Component } from 'react';
import {
  View,
  Text,
  NavigatorIOS,
  StyleSheet
} from 'react-native';

import Home from './components/Home';
import SearchPage from './components/SearchPage';

class Main extends Component {
  render(){
    return (
      <NavigatorIOS
        initialRoute = {{
          component: SearchPage,
          title: 'Property Finder'
        }}
        style={styles.container}
      />

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Main;

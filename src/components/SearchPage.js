import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';

import getQuery from '../utils/getQuery';
import ajax from '../utils/ajax';

import SearchResult from './SearchResult';

class SearchPage extends Component{
  constructor(props){
    super(props);

    this.state = {
      searchString: '',
      isLoading: false,
      message: ''
    }
  }

  onGoPress(){
    const queryString = getQuery('place_name',
                            this.state.searchString, 1);
    this._executeQuery(queryString);
  }

  _executeQuery(query){
    console.log(query);
    this.setState({
      isLoading: true
    });

    ajax.get(query).then(result=>{
      this._handleResponse(result.response);
    }).catch(error => {
      this.setState({
        message: 'Error'+error
      })
    })
  }

  _handleResponse(response){
    this.setState({ isLoading: false , message: '' });
    if (response.application_response_code.substr(0, 1) === '1') {
      console.log(response.listings);
      this.props.navigator.push({
        title: 'Properties Found',
        component: SearchResult,
        passProps: {propertyList: response.listings}
      })
    } else {
      this.setState({ message: 'Location not recognized; please try again.'});
    }
  }

  render(){
    var spinner;
    if(this.state.isLoading==true){
      spinner = (
        <ActivityIndicator
          size='large'
        />
      )
    }else{
      spinner = (<View />)
    }

    return (
      <View style={styles.container}>
          <Text style={styles.description}>
            Search for houses to buy!
          </Text>
          <Text style={styles.description}>
            Search by place-name, postcode or search near your location.
          </Text>

          <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            placeholder='Search via name or postcode'
            value={this.state.searchString}
            onChangeText={(text)=>this.setState({searchString: text})}
          />
          <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onGoPress.bind(this)}
          >
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Location</Text>
        </TouchableHighlight>
        <Image source={require('../assets/images/house.png')} />
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    width: 217,
    height: 138
  }
});


export default SearchPage;

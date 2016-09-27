import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import PropertyView from './PropertyView';

class SearchResult extends Component {
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      datasource: ds.cloneWithRows(this.props.propertyList)
    }
  }

  handlePropertyPress(rowData){
    //console.log(rowData);
    //console.log(this.props.navigator)
    this.props.navigator.push({
      title: 'Properties Detail',
      component: PropertyView,
      passProps: {property: rowData}
    })
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
          underlayColor='#dddddd'
          onPress = {this.handlePropertyPress.bind(this, rowData)}
      >
        <View style={styles.rowContainer}>
          <Image
            style={styles.thumb}
            source = {{uri: rowData.thumb_url}}
          />
          <View  style={styles.textContainer}>
            <Text style={styles.price}>{rowData.price_formatted}</Text>
            <Text style={styles.title}
                  numberOfLines={1}>{rowData.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render(){
    console.log(this.state)
    return (
      <ListView
        dataSource={this.state.datasource}
        renderRow={this._renderRow.bind(this)}
      />
    )
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

export default SearchResult;

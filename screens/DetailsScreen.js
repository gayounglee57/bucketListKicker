import React, {Component} from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet, Alert, Image, Platform, Button} from 'react-native';
import {updateTodoList, queryAllTodoLists} from '../databases/allSchemas';
import realm from '../databases/allSchemas';
import FooterComponent from '../components/FooterComponent';
import FlatListItem from '../components/FlatListItem';


export default class DetailsScreen extends Component{
  static navigationOptions = ({navigation}) => {
  return{
      headerRight:(
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Add"
          color="rgb(255,255,255)"
        />
      ),
    };
  };

	constructor(props){
    super(props);
    this.state = {
      todoLists: [],
      randomItem: "",
    };
    this.reloadData();
    //execute reloadData() whenever data in db changes
    realm.addListener('change', () => {
      this.reloadData();
    });
  }

  reloadData = () => {
    queryAllTodoLists().then((todoLists) => {
      this.setState({todoLists});
      //this.sort;
    }).catch((error) => {
      this.setState({todoLists: [] });
    });
    console.log('reloaded data');
  }

  // sort = () => {
  //   this.setState({
  //     todoLists: this.state.todoLists.sorted('name', true)
  //   });
  // }

  render(){
    return(
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={this.state.todoLists}
        renderItem={({item, index}) => <FlatListItem {...item} itemIndex={index}
          />}
        keyExtractor={item => item.id}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  flatList: {
    flex: 1,
    flexDirection: 'column',
  }
});
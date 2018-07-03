import React, {Component} from 'react';
import {
	StyleSheet, View, Text, TouchableOpacity, Platform, Image, Alert
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {deleteTodoList} from '../databases/allSchemas';

//arrow function with props means this component can be a react native component
let FlatListItem = props => {
  const {popupDialogComponent, onPressItem, name, creationDate, itemIndex, id} = props;

  showEditModal = () => {
    popupDialogComponent.showDialogComponentForUpdate({
      id, name
    });
  }

  showDeleteConfirmation = () => {
    Alert.alert(
      'Just double checking',
      'Delete the bucket list item?',
      [
        {
          text: 'Yes', onPress: () => {
            deleteTodoList(id).then().catch((error) => {
              alert("Error in deleting your item :(");
            });
          }
        },
        {
          text: 'No', 
          onPress: () => {}, //Do nothing
          style: 'cancel'
        },
      ],

    );
  };

  return (
    <Swipeout right={[
      {
        text: 'Delete',
        backgroundColor: 'rgb(127, 32, 23)',
        onPress: showDeleteConfirmation
      },
    ]} autoClose={true}>
      <TouchableOpacity onPressItem={onPressItem}>
        <View style={{backgroundColor: itemIndex % 2 == 0 ? 'rgb(255, 204, 0)': 'rgb(192, 59, 45)'}}>
          <Text style={{fontFamily: 'GillSans', fontSize: 21, padding: 20}}>{name}</Text>
        </View>
      </TouchableOpacity>
    </Swipeout>
  );
}

export default FlatListItem;
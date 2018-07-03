import React, {Component} from 'react';
import {
	StyleSheet, View, Text, TouchableOpacity, Platform, Image, Alert
} from 'react-native';

const FooterComponent = props => {
	const {changeItem} = props;

	return(
			 <View style={styles.playBack}>
	            <TouchableOpacity style={styles.button} onPress={changeItem}>
	            	<Text style={styles.textLabel}>Kick your bucket list!</Text>
	            </TouchableOpacity>
	          </View>
	        );
};

const styles = StyleSheet.create({
  playBack: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
  	backgroundColor: 'rgb(100,100,100)',
  	marginLeft: '30%',
  	marginBottom: '10%',
  	padding: 10,
  },
  textLabel:{
  	color: 'white',
    fontFamily: 'GillSans',
  	fontSize: 21,
  },
});

export default FooterComponent;

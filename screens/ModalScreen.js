import React, { Component } from 'react';
import {
	StyleSheet, View, Text, FlatList, TouchableOpacity, Platform, Image, TextInput, Button
} from 'react-native';
import {insertNewTodoList, updateTodoList} from '../databases/allSchemas';

export default class ModalScreen extends Component {
  constructor(props){
		super(props);
		this.state = {
			id: 0,
			name: '',
			isAddNew: true
		};
	}

  render() {
    return (
				<View style={styles.container}>
					<TouchableOpacity style={styles.closeIconContainer} onPress={() => {
							this.props.navigation.goBack();
						}}>
							<Image source={require('../images/close-icon.png')} style={styles.closeIcon}/>
					</TouchableOpacity>
					<TextInput style={styles.textInput} placeholder="eg. swim with dolphins" autoCorrect={false}
						onChangeText={(text) => this.setState({name: text})} value={this.state.name}
					/>
					<View style={{flexDirection: 'row', marginLeft: 10}}>
						<TouchableOpacity style={styles.button} onPress={() => {
								if (this.state.name.trim() == ""){
									alert("Oops you tried to save an empty bucket list item");
									return;
								}
								const newTodoList = {
										id: Math.floor(Date.now() / 1000),
										name: this.state.name,
										creationDate: new Date()
								};
								insertNewTodoList(newTodoList).then().catch((error) => {
										alert("There was an error while trying to add a new bucket list item :(")
								});
								this.props.navigation.goBack();
						}}>
							<Text style={styles.textLabel}>Save</Text>
						</TouchableOpacity>
					</View>
				</View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},
	textInput:{
		marginTop: '80%',
		marginLeft: '10%',
		height: 40,
		padding: 10,
		margin: 10,
		borderColor: 'white',
		borderWidth: 0,
		fontFamily: 'GillSans',
		fontSize: 30,
	},
	button:{
		backgroundColor: 'rgb(100,100,100)',
		padding: 10,
		marginTop: 15,
		marginLeft: 15,
		width: 100,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textLabel:{
		color: 'white',
		fontSize: 21,
		fontFamily: 'GillSans',
	},
	flatList: {
        flex: 1,
        flexDirection: 'column',
    },
    closeIconContainer: {
    	position: 'absolute',
    	left: '90%',
    	top: '10%',
    },
    closeIcon: {
    	position: 'absolute',
    	zIndex: 2,
    	width: 20,
    	height: 20,
    },
});

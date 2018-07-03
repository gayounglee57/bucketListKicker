import React, {Component} from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet, Alert, Image, Platform, Button} from 'react-native';
import {updateTodoList, deleteTodoList, queryAllTodoLists} from '../databases/allSchemas';
import realm from '../databases/allSchemas';
import FooterComponent from '../components/FooterComponent';
import Video from 'react-native-video';
import kicking from '../images/kicking.mp4';

export default class HomeScreen extends Component{
  static navigationOptions = ({navigation}) => {
	return{
	  	headerRight:(
	      <Button
	        onPress={() => navigation.navigate('Details')}
	        title="Edit"
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
      showRandom: false,
      paused: true,
    };
    this.reloadData();
    //reloadData() executes whenever data in db changes
    realm.addListener('change', () => {
      this.reloadData();
    });
  }

  reloadData = () => {
    queryAllTodoLists().then((todoLists) => {
      this.setState({todoLists});
    }).catch((error) => {
      this.setState({todoLists: [] });
    });
    console.log('reloaded data');
  }

  changeRandomItem(){
    let todoListArray = this.state.todoLists
    let randomNumber = Math.floor(Math.random() * todoListArray.length);
    let randomText = " ";
    let j;
    console.log("current random text: " + this.state.randomText);
    for (j = 0; j < todoListArray.length; j ++){
        //For some reason, accessing todoLists[n] outside of loops doesn't work... :/
        if (j === randomNumber) {
          randomText = this.state.todoLists[randomNumber].name;
          break;
        }
    }

    while(randomText == " " || randomText == this.state.randomText){
      randomNumber = Math.floor(Math.random() * todoListArray.length);
      randomText = this.state.todoLists[randomNumber].name;
      console.log("rejiggling to " + randomText);
    }

    this.setState({randomText});
  }

  showRandomItem(){
    return (
          <Text style={styles.randomItem}>{this.state.randomText}</Text>
    );
  }

  handleMainButtonTouch = () => {
    if(this.state.paused === false){
      this.player.seek(0);
      this.setState({showRandom: false})
    }
    this.setState({paused: false})
  }

  handleEnd = () => {
    this.setState({showRandom: true})
  }

  render(){
    return(
    <View style={styles.container}>
      {this.state.showRandom && this.showRandomItem()}
      <Video source={kicking}
             paused={this.state.paused}
             resizeMode='cover'
             onEnd={this.handleEnd} 
             style={styles.video}
             ref={(ref) => {
               this.player = ref
             }}
      />
      <Text style={styles.caption}>Get your next bucket list goal</Text>
      <FooterComponent changeItem={
        () => {
          this.handleMainButtonTouch();
          this.changeRandomItem();
        }
      }
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'yellow',
  },
  video:{
    flex: 2,
    backgroundColor: 'white',
    width: '100%',
  },
  caption: {
    position: 'absolute',
    fontFamily: 'GillSans',
    color: 'rgb(100,100,100)',
    fontSize: 24,
    zIndex: 3,
    top: '80%',
    left: '15%',
  },
  randomItem: {
    position: 'absolute',
    fontFamily: 'GillSans',
    backgroundColor: 'rgba(255,255,255,0)',
    color: 'white',
    fontSize: 36, 
    paddingLeft: '5%',
    paddingTop: '5%',
    paddingBottom: '5%',
    zIndex: 3,
    top: '35%',
    left: '25%',
    width: '50%',
  },
});
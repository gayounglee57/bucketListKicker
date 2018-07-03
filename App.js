import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation'
import HomeScreen from './screens/HomeScreen.js';
import DetailsScreen from './screens/DetailsScreen.js';
import ModalScreen from './screens/ModalScreen.js';

const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
      navigationOptions: {
      headerStyle: {
        backgroundColor: 'rgb(100,100,100)',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal:{
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AlertIOS
} from 'react-native';
import {
  Router,
  Scene,
  Actions
} from 'react-native-router-flux';
import axios from 'axios';

import Login from './containers/Login';
import Register from './containers/Register';
import User from './containers/User';
import Main from './containers/Main';


export default class make_it_happen_frontend extends Component {

  constructor() {
    super()

    this.state = {
      accessToken: null,
      logged_in: false
    }


    this.authenticateUser = this.authenticateUser.bind(this)
    this.createUser = this.createUser.bind(this)
  }


  authenticateUser(email, password) {

    axios.post('https://make-it-happen-api.herokuapp.com/api/login', {
        email: email,
        password: password
    })
    .then((response) => {
      this.setState({
        accessToken: response.data.accessToken,
        logged_in: true
      });
      console.log(this.state.logged_in)
      Actions.user();
    })
    .catch(function (error) {
      console.log(error.response);
    });
 }


  createUser(username, email, password) {

    axios.post('https://make-it-happen-api.herokuapp.com/api/users', {
        username: username,
        email: email,
        password: password
    })
    .then((response) => {
      this.setState({
        accessToken: response.data.accessToken,
        logged_in: true
      });
      Actions.user();
    })
    .catch(function (error) {
      console.log(error.response);
    });
 }


  render() {

    return (
      <Router>
        <Scene key="root">
          <Scene key="main"
            component={Main}
            title="Make It Happen"
            initial={!this.state.logged_in}
          />
          <Scene
            key="login"
            component={Login}
            title="Login"
            authenticateUser={this.authenticateUser}
          />
          <Scene
            key="register"
            component={Register}
            title="Register"
            createUser={this.createUser}
          />
          <Scene
            key="user"
            component={User}
            title="My Goals"
            initial={this.state.logged_in}
          />
      </Scene>
    </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

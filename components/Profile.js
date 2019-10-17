import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import firebase from './FirebaseConfig';


export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      email: '',

    };
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ currentUser: user.displayName });
        this.setState({ email: user.email });
      }
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>
          USER: {this.state.currentUser}
        </Text>
        <Text>
          EMAIL: {this.state.email}
        </Text>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1
  }
})
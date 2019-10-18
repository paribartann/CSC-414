import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import firebase from './FirebaseConfig';


export default class Profile extends Component {

  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      email: '',

    };
  }

  componentDidMount() {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (this._isMounted) {
        this.setState({ currentUser: user.displayName });
        this.setState({ email: user.email });
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
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
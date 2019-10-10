import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import firebase from './FirebaseConfig';

export default class Loading extends React.Component {


    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ? 'Main' : 'SignUp')
        })
    }


  render() {

    //console.log(firebase);
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'

import firebase from './FirebaseConfig';


export default class Main extends React.Component {

  state = {currentUser: null}


    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase.database()
                .ref('users/')
                .orderByChild('email')
                .equalTo(user.email)
                .once("value")
                .then(snapshot => {
                    var user_cred = snapshot.val();
                    var key = Object.keys(snapshot.val())[0];
                    this.setState( {currentUser: user_cred[key].first_name} )
                });
            } 
        });    
    }

    render() {
        return (
        <View style={styles.container}>
            <Text>
            Welcome to the main page! Hi, {this.state.currentUser}!
            </Text>

            <Button title="LogOut" onPress= {() => firebase.auth().signOut()}  />
        </View>
    )
  }


}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
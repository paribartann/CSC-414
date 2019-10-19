import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import firebase from '../MainPage/FirebaseConfig';

export default class Verify extends React.Component {

  componentDidMount() {

    console.log("IN VERIFYYYY!")
    var userI = firebase.auth().currentUser;
    console.log(userI);
    if(!userI.emailVerified)
    {
      userI.sendEmailVerification()
      .then(function() {
      console.log("Email Sent For Verification");
      })
      .catch(function(error){
        console.log(error);
        console.log("An error happened While Verifying!")
      });
    }
}

    render() {
        return (
        <View style={styles.container}>
            <Text>
                Please Check you email and Verify it!   
            </Text>
            <Button title="Already Verified? Go Back to Login!" 
            onPress={() => this.props.navigation.navigate('SignIn')}  />
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
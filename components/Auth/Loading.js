import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from '../MainPage/FirebaseConfig';

const auth = firebase.auth();

export default class Loading extends React.Component {


  componentDidMount() {
    
    auth.onAuthStateChanged( (user) => {
         // console.log("USER: ", user);
          if (user)
          {
            console.log("VERIFY",user.emailVerified)
           this.props.navigation.navigate(user.emailVerified ? 'App' : 'VerifyScreen');
          }
          else
          {
           this.props.navigation.navigate('SignIn');
          }
          
        });
    }

  render() {
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
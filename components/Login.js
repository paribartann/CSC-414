import React from 'react'
import { AppRegistry, AsyncStorage, StyleSheet, Text, Alert, View, Image } from "react-native";
import { Container, Item, Form, Input, Button, Label  } from "native-base";
import firebase from './FirebaseConfig';
import logo from '../images/logo.png';


const auth = firebase.auth();

export default class Login extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
                   isLoggedIn: false,
                   email: '', 
                   password: ''
                 }
    }

    _handleLogin = async() => {
      
      const { email, password } = this.state
      auth.signInWithEmailAndPassword(email, password)
        .then((userData) => {
            console.log(userData)

            if(userData.user.emailVerified)
            {
              this.props.navigation.navigate('App');
            }
            else
            {
              this.props.navigation.navigate('VerifyScreen');
            }
         
          })  //end of then
        .catch( (error) => 
        {
          console.log(error.code);
            switch(error.code) {
              case 'auth/wrong-password':
                Alert.alert('WRONG PASSWORD!')
                  break;

              case 'auth/user-not-found':
                Alert.alert('USER NOT FOUND!')
                  break;

              case 'auth/invalid-email':
                Alert.alert('INVALID EMAIL!')
                  break;
          }
        });

    }
    
    // handleLogin = () => {
    //     const { email, password } = this.state

    //     this.setState({
    //       loading: true
    //     });

    //     firebase
    //     .auth()
    //     .signInWithEmailAndPassword(email, password)
    //     .then((userData) => {
    //         this.setState({
    //           loading: false
    //         });

    //         AsyncStorage.setItem('userData', JSON.stringify(userData));
    //         this.props.navigation.navigate('Main');
            
    //         // firebase.auth().onAuthStateChanged( (userI) => {
    //         // console.log("EMAIL VERIFY: ", userI.emailVerified);
    //         // this.props.navigation.navigate(userI.emailVerified ? 'Main' : 'Verify')
    //         //this.props.navigation.navigate('Main')
    //         //  })  
    //       })
    //     .catch(error => 
    //       {
    //         this.setState({
    //           loading: false
    //         });

    //         this.setState({ errorMessage: error.message })
    //         switch(error.code) {
    //           case 'auth/wrong-password':
    //             Alert.alert('WRONG PASSWORD!')
    //               break;

    //           case 'auth/user-not-found':
    //             Alert.alert('USER NOT FOUND!')
    //               break;

    //           case 'auth/invalid-email':
    //             Alert.alert('INVALID EMAIL!')
    //               break;
    //        }
    //     });
    //   }


  render() {
    return (
      <Container style={styles.container}>
        <View>
          <Image resizeMode="contain" source={logo} />
        </View>
      <Form>
        
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={email => this.setState({ email })}
          />
        </Item>

        <Item floatingLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={password => this.setState({ password })}
          />
        </Item>

        <Button
          full
          rounded
          style={{ marginTop: 20 }}
          onPress={this._handleLogin}
        >
          <Text>Login</Text>
        </Button>
        
        <Button
          full
          rounded
          success
          style={{ marginTop: 20 }}
          onPress={() => this.props.navigation.navigate('SignUp')}
        >
          <Text>Don't have an account? Sign Up</Text>
        </Button>

        
      </Form>
    </Container>  
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10
  }
  
});

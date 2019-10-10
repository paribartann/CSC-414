import React from 'react'
import { StyleSheet, Text } from "react-native";
import { Container, Item, Form, Input, Button, Label } from "native-base";
import firebase from './FirebaseConfig';



export default class SignUp extends React.Component {

  constructor() {
    super();
    this.state = 
    { fname: '',
      lname: '',
      email: '',
      password: '',
      errorMessage: null
    };
  }

  
  handleSignUp = () => {

    const { fname, lname, email, password } = this.state

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then( (user) =>
      {

        firebase.database().ref('users/').push({
          first_name: fname,
          last_name: lname,
          email: email
        }).then(() => {
            console.log('INSERTED!');
        }).catch((error) => {
            console.log('ERROR!')
        });

        var userI = firebase.auth().currentUser;
        userI.sendEmailVerification()
        .then(function() {
        console.log("Email Sent");
        })
        .catch(function(error){
          console.log(error);
          console.log("An error happened!")
        });
        console.log('reached here');
        this.props.navigation.navigate('Verify');
      })
      .catch(error => this.setState({ errorMessage: error.message }));

  }

    render() {
    return (

      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>First Name: </Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={fname => this.setState({ fname })}
            />
          </Item>

          <Item floatingLabel>
            <Label>Last Name: </Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={lname => this.setState({ lname })}
            />
          </Item>

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
            success
            style={{ marginTop: 20 }}
            onPress={this.handleSignUp}
          >
            <Text>Signup</Text>
          </Button>

          <Button
            full
            rounded
            style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text>Already have an account? Login</Text>
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


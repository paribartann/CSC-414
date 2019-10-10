import React from 'react'
import { StyleSheet, Text } from "react-native";
import { Container, Item, Form, Input, Button, Label } from "native-base";
import firebase from './FirebaseConfig';



export default class Login extends React.Component {

    state = { email: '', password: '', errorMessage: null }

    handleLogin = () => {
        const { email, password } = this.state
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }

  render() {
    return (
      <Container style={styles.container}>
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
          onPress={this.handleLogin}
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

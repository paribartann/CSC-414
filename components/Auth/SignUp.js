import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Alert,
  View,
  Image
} from "react-native";
import { Container, Item, Form, Input, Button, Label } from "native-base";
import firebase from "../MainPage/FirebaseConfig";
import logo from "./images/logo.png";

const auth = firebase.auth();

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = { fname: "", lname: "", email: "", password: "" };
  }

  handleSignUp = () => {
    const { fname, lname, email, password } = this.state;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user.updateProfile({
          displayName: fname
        });

        firebase
          .database()
          .ref("users/")
          .push({
            first_name: fname,
            last_name: lname,
            email: email
          })
          .then(() => {
            console.log("INSERTED!");
          })
          .catch(error => {
            console.log("ERROR!");
          });

        this.props.navigation.navigate("VerifyScreen");
      }) //end of then
      .catch(error => {
        console.log(error.code);
        switch (error.code) {
          case "auth/email-already-in-use":
            Alert.alert("Email already in use !");
            break;
          case "auth/invalid-email":
            Alert.alert("INVALID EMAIL!");
            break;
        }
      });
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <Container style={styles.container}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white"
            }}
          >
            <Image resizeMode="contain" source={logo} />
          </View>
          <Form>
            <Item floatingLabel>
              <Label>First Name </Label>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={fname => this.setState({ fname })}
              />
            </Item>

            <Item floatingLabel>
              <Label>Last Name </Label>
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
              onPress={() => this.props.navigation.navigate("SignIn")}
            >
              <Text>Already have an account? Login</Text>
            </Button>
          </Form>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "gold"
  }
});

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,Alert
} from "react-native";
import { Form, Item, Input, Label } from 'native-base';
import firebase from "../MainPage/FirebaseConfig";
import axios from 'axios';





class RegisterMealScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mobile: "",
      email: ""
    };
  }

  checkforDonors() {
    const data= {};
    const Donors = [];
    const Recipients=[];
    var query1 = firebase.database().ref(`RecipientList/`);
    query1.once("value").then(function (snapshot) {
      snapshot.forEach((childSnapshot) => {
        Recipients.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
    })
    var query = firebase.database().ref(`DonorList/`);
    query.once("value").then(function (snapshot) {
      snapshot.forEach((childSnapshot) => {
        Donors.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      console.log(Donors.length);
      if (Donors.length > 0) {
        data.Recipientname = Recipients[0].name;
        data.Recipientemail = Recipients[0].email;
        data.Recipientmobile = Recipients[0].mobile;
        data.donorname = Donors[0].name;
        data.donoremail = Donors[0].email;
        data.donormobile = Donors[0].mobile;
        console.log(data);
        axios.post('https://us-central1-csc-414-survival-app.cloudfunctions.net/sendMail', data)
          .then(res => {
          console.log("mail sent to recipient");
          })
          .catch(error => {
            //console.log(error);
          });

          //axios.post('https://us-central1-c-survival.cloudfunctions.net/sendMail', data)
          //.then(res => {
            // here will be code 
            //console.log("mail sent to donor");

          //})
          //.catch(error => {
            //console.log(error);
          //});


        meal = Donors[0].meals - 1;
        console.log(meal);
        if (meal >= 1) {
          var updates = {};
          updates['/meals'] = meal;
          firebase.database().ref(`DonorList/${Donors[0].id}`).update(updates);
        }
        else {
          firebase.database().ref(`DonorList/${Donors[0].id}`).remove();
        }
        firebase.database().ref(`RecipientList/${Recipients[0].id}`).remove();
      }
      else {
        console.log("we will contact you as soon as there is someone");
      }
    })
    Alert.alert(
      'Swipe share',
      'Thank you for registering!! you will be contacted soon.',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );

  }
  addRecipient() {
    const newRecipient = firebase.database().ref().child('RecipientList').push();
    newRecipient.set(this.state);
    this.checkforDonors();

  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior="padding" keyboardVerticalOffset={100}>

        <ScrollView style={{ flex: 1 }}>

          <View style={styles.container}>

            <Image
              resizeMode="cover"
              style={{ alignSelf: 'center' }}
              source={require('./img/DonateMeal.png')}>
            </Image>
            <Text style={{ padding: 20, fontSize: 20, fontWeight: 'bold' }}>Register for Meal Swipes</Text>


            <Form style={styles.form}>

              <Item floatingLabel last>
                <Label>Name</Label>
                <Input placeholder="Name" onChangeText={(text) => this.setState({ name: text })} maxLength={15} />
              </Item>


              <Item floatingLabel last>
                <Label>Mobile No</Label>
                <Input placeholder="Mobile No" onChangeText={(text) => this.setState({ mobile: text })} />
              </Item>
              <Item floatingLabel last>
                <Label>Email Id</Label>
                <Input placeholder="Email id" onChangeText={(text) => this.setState({ email: text })} />
              </Item>
              <Text></Text>


              <TouchableOpacity primary onPress={this.addRecipient.bind(this)} style={styles.button}>
                <Text style={{ fontSize: 20 }}>Register</Text></TouchableOpacity>
            </Form>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>


    );
  }
}
export default RegisterMealScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#F56445',
    padding: 10,
    borderRadius: 5
  },
  form: {
    width: 300,
  }
});

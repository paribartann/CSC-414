import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Form, Item, Input, Label } from 'native-base';
import firebase from '../FirebaseConfig';

//import axios from 'axios';



class RegisterMealScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mobile: "",
      email: ""
    };
  }

  addRecipient() {
    //console.log(""+ this.state.name);
    const newRecipient = firebase.database().ref().child('RecipientList').push();
    newRecipient.set(this.state)


    //  firebase.database().ref().child('DonorList').on('value', (snapshot) => {
    //   const userObj = snapshot.val();
    //   console.log(userObj.keys);
    //   Object.keys(userObj).forEach(item => {
    //     console.log(Object.keys(item).meals);
    //   });
    var query = firebase.database().ref(`DonorList/`);
    query.once("value").then(function (snapshot) {
      console.log(Object.keys(snapshot.val())[0]);
      const firstobject = Object.keys(snapshot.val())[0];
      var query1 = firebase.database().ref(`DonorList/${firstobject}`);
      //console.log(query1.val());
      for (var i = 0; i < 1; i++) {
        //console.log(Object.keys(snapshot.val()));
      }

      snapshot.forEach(function (childsnapshot) {
        var key = childsnapshot.val();
        //console.log(key[0]);
        //console.log(childsnapshot.val().meals[0]);
        for (var key1 in key) {
          //console.log(key1, key[key1]);
        }
      })
    })

    // })

    const data = this.state;
    //axios.post('https://us-central1-c-survival.cloudfunctions.net/sendMail', data)
    //.then(res => {
    // here will be code
    //})
    //.catch(error => {
    // console.log(error);
    //});
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



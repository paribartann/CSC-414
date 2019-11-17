import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { Form, Item, Input, Label, Icon } from "native-base";
import firebase from "../MainPage/FirebaseConfig";

export default class DonateMealScreen extends Component {
  constructor(props) {
    super(props);
    this.validateName = this.validateName.bind(this);
    this.state = {
      name: "",
      mobile: "",
      email: "",
      meals: ""
    };
  }

  addDonor() {
    var that = this;

    var total_meals = 0;
    firebase
      .database()
      .ref("TotalMealsDonated")
      .once("value")
      .then(function(snapshot) {
        console.log(snapshot.val());
        total_meals = parseInt(snapshot.val()) + parseInt(that.state.meals);
        //console.log(total_meals);
        var updates = {};
        //console.log(total_meals);
        updates["/TotalMealsDonated"] = total_meals;
        firebase
          .database()
          .ref()
          .update(updates);
      });

    firebase
      .database()
      .ref()
      .child("DonorList")
      .push()
      .set(this.state);
    //.then(() => {
    //  this.props.navigation.navigate('Meal')
    //});

    Alert.alert(
      "Swipe share",
      "Thank you for your generous support",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  validateName() {
    if (this.donorName.length <= 3 || this.donorName.length >= 11) {
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Image
              resizeMode="cover"
              style={{ alignSelf: "center" }}
              source={require("./img/DonateMeal.png")}
            ></Image>
            <Text style={{ padding: 20, fontSize: 20, fontWeight: "bold" }}>
              {" "}
              Donate Meal Swipes
            </Text>

            <Form style={styles.form}>
              <Item floatingLabel last>
                <Label>Name</Label>
                <Input
                  placeholder="Name"
                  name="name"
                  onChangeText={text => this.setState({ name: text })}
                  maxLength={15}
                />
                {/*<Input placeholder="Name" name="Name" onBlur={this.validateName.bind(this)} />*/}
                {/*<Input placeholder="Name" name="Name"  onChangeText={(text)=> this.donorName = text} 
                                                                        onBlur={this.validateName} 
                                                                        maxLength={15}/>*/}

                <Icon
                  name="checkmark-circle"
                  style={{ color: "green", display: "none" }}
                />
                <Icon
                  name="close-circle"
                  style={{ color: "red", display: "none" }}
                />
              </Item>

              <Item floatingLabel last>
                <Label>Mobile No</Label>
                <Input
                  placeholder="Mobile No"
                  onChangeText={text => this.setState({ mobile: text })}
                />
              </Item>

              <Item floatingLabel last>
                <Label>Email Id</Label>
                <Input
                  placeholder="Email id"
                  name="email"
                  type="email"
                  autoCompleteType="email"
                  onChangeText={text => this.setState({ email: text })}
                />
              </Item>

              <Item floatingLabel last>
                <Label>Number of Meals</Label>
                <Input
                  placeholder="Number of Meals"
                  onChangeText={text => this.setState({ meals: text })}
                />
              </Item>

              <Text></Text>

              <TouchableOpacity
                primary
                type="submit"
                onPress={this.addDonor.bind(this)}
                style={styles.button}
              >
                <Text style={{ fontSize: 20 }}>Donate</Text>
              </TouchableOpacity>
            </Form>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#F56445",
    padding: 10,
    borderRadius: 5
  },
  form: {
    width: 300
  }
});

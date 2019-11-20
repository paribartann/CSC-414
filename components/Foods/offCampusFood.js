import React from "react";
import { StyleSheet, View, Dimensions, Text, ScrollView, TextInput } from "react-native";

const { width, height } = Dimensions.get("screen");

export default class OffCampusFood extends React.Component {
  static navigationOptions = {
    headerTitle: "Off Campus Food"
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: []
    };
  }

  async componentDidMount() {
    this.fetchMarkerData();
  }

  async fetchMarkerData() {
    fetch(
      "https://csc-414-survival-app.firebaseio.com/OffCampusFood/offCampusRestaurants.json"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          markers: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderRestaurants() {
    return this.state.isLoading
      ? null
      : this.state.markers.map((marker, index) => {
          const coords = {
            name: marker.name,
            cuisine: marker.cuisine,
            address: marker.address,
            openingHours: marker.hours
          };
          const textInputComponents = coords.openingHours.map((type, index) => <Text style={{fontSize: 17}}> {type} </Text> )
          const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

          return (
            <View style={{
              padding: 25,
              margin: 5,
              border: "2px solid palevioletred",
              backgroundColor:'papayawhip'
            }}>
              <Text style={{color:'palevioletred',fontSize: 22, fontWeight:"bold", alignSelf:"center", paddingBottom:5}}>{coords.name}</Text>
              <Text style={{fontSize: 18, padding:5}}><B>Cuisine:</B> {coords.cuisine}</Text>
              <Text style={{fontSize: 18, padding:5}}><B>Address:</B> {coords.address}</Text>
              <Text style={{fontSize: 18, padding:5}}><B>Opening Hours:</B> </Text>
              {textInputComponents}
            </View>
          );
        });
  }

  render() {
    const {} = this.state;

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                {this.renderRestaurants()}
            </ScrollView>
        </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center"
  },
  extraInfoStyle: {
    width,
    alignSelf: "center",
    height: height * 0.07,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "flex-end",
    paddingTop: 10
  }
});

import React from "react";
import { StyleSheet, View, Dimensions, Text, ScrollView } from "react-native";

const { width, height } = Dimensions.get("screen");

export default class OnCampusFood extends React.Component {
  static navigationOptions = {
    headerTitle: "OnCampusFood"
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
      "https://csc-414-survival-app.firebaseio.com/OnCampusFood/restaurants.json"
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
            address: marker.Address,
            openingHours: marker.Hours
          };

          return (
            <View>
              <Text>Name: {coords.name}</Text>
              <Text>Cuisine: {coords.cuisine}</Text>
              <Text>Address: {coords.address}</Text>
              <Text>opening Hours: {coords.openingHours}</Text>
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

import * as React from "react";
import { TouchableOpacity, StyleSheet, Button, View, Text } from "react-native";

class CampusScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Campus",
    headerTitleStyle: {
      alignItems: "center",
      justifyContent: "center"
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("MapPage")}
          style={styles.button}
        >
          <Text style={styles.text}>College Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("CollegeTips")}
          style={styles.button}
        >
          <Text style={styles.text}>College Tips</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "50%",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2"
  },
  button: {
    marginTop: 15,
    padding: 15,
    borderRadius: 15,
    height: 120,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "turquoise"
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18
  }
});

export default CampusScreen;

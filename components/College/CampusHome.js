import * as React from "react";
import { TouchableOpacity, StyleSheet, Button, View, Text, ImageBackground } from "react-native";

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
          <ImageBackground
            style={styles.imageBackground}
            imageStyle={{borderRadius: 15}}
            source={require('./map.jpg')}
            >
            <Text style={styles.text}>Campus Map</Text>
          </ImageBackground>
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
    //paddingTop: "50%",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2"
  },
  button: {
    marginTop: 15,
    // padding: 15,
    borderRadius: 15,
    height: 120,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffd147"
  },
  text: {
    color: "#000",
    fontWeight: "700",
    fontSize: 18
  },
  imageBackground: {
    flex: 1, 
    width: '100%', 
    height: '100%', 
    alignItems: "center", 
    justifyContent:'center',
  },
});

export default CampusScreen;

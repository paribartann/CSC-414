import React from "react";
import { StyleSheet, View, Dimensions, Text, ScrollView, FlatList } from "react-native";

const { width, height } = Dimensions.get("screen");

export default class CollegeTips extends React.Component {
  static navigationOptions = {
    headerTitle: "College Tips"
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      Ctips: []
    };
  }

  async componentDidMount() {
    this.fetchMarkerData();
  }

  async fetchMarkerData() {
    fetch(
      "https://csc-414-survival-app.firebaseio.com/CollegeTips/survivalTips.json"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          Ctips: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderTips() {
    return this.state.isLoading
      ? null
      : this.state.Ctips.map((tip, index) => {
          const coords = {
            title: tip.title,
            tip_array: tip.tips
          };
          const textInputComponents = coords.tip_array.map((type, index) => <Text style={{fontSize: 15}}> {index+1}. {type} </Text> )
         

          return (
            <View style={{
              padding: 25,
              margin: 5,
              border: "2px solid palevioletred",
              backgroundColor:'#85DCBA'
            }}>
              <Text style={{color:'#E7717D',fontSize: 22, fontWeight:"bold", alignSelf:"center", paddingBottom:5}}>{coords.title}</Text>
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
              {this.renderTips()}
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

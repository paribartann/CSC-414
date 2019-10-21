import * as React from 'react';
import { TouchableOpacity, StyleSheet, Button, View, Text } from 'react-native';

class CampusScreen extends React.Component {

  static navigationOptions = {
    headerTitle: 'Campus',
    headerTitleStyle: {
      alignItems: 'center',
      justifyContent: 'center',
    }
  }

  render() {
    return (

      <View style={styles.container}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MapPage')} style={styles.button}>
            <Text style={styles.text}>Map</Text>
          </TouchableOpacity>
      </View>

    );
  }
}

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "gold",
    },
    button: {
      marginTop: 15,
      padding: 15,
      borderRadius: 15,
      height: 120,
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'turquoise',
    },
    text: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 18,
    }
  })

  export default CampusScreen;
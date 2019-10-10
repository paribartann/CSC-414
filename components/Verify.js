import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


export default class Verify extends React.Component {

    render() {
        return (
        <View style={styles.container}>
            <Text>
                Please Check you email and Verify it!
            </Text>
        </View>
    )
  }


}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
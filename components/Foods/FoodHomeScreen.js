import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Button
} from "react-native";

class FoodHomeScreen extends Component {

    render() {
        return (
            <View style={styles.container}>

                <Button title="Meal Swipe"
                    onPress={() => this.props.navigation.navigate('Meal')} />

                <Button title="Places to Eat"
                    onPress={() => this.props.navigation.navigate('Meal')} />

                <Button title="Top Restaurants"
                    onPress={() => this.props.navigation.navigate('Meal')} />

            </View>
        );
    }
}
export default FoodHomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Button,
    Image,
    Text,
    TouchableOpacity,
    ScrollView

} from "react-native";


class MealSwipe extends Component {

    static navigationOptions = {
        headerTitle: 'Meal Swipe',
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        resizeMode="cover"
                        style={{ width: '100%', height: 350 }}
                        source={require('./img/swipeshare.png')}>
                    </Image>

                    <Text></Text>
                    <TouchableOpacity primary type="submit" onPress={() => this.props.navigation.navigate('Donate')} style={styles.button}>
                        <Text style={{ fontSize: 30 }}> Donate Meals </Text>
                    </TouchableOpacity>
                    <Text></Text>
                    <TouchableOpacity primary type="submit" onPress={() => this.props.navigation.navigate('Register')} style={styles.button}>
                        <Text style={{ fontSize: 30 }}> Register for a  Meal </Text>
                    </TouchableOpacity>


                </View>
            </ScrollView>

        );
    }
}
export default MealSwipe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#F56445',
        padding: 20,
        borderRadius: 5
    }
});
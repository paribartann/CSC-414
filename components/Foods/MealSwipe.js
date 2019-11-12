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
import firebase from "../MainPage/FirebaseConfig";



class MealSwipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            total: 0,
            totaldonated: 0
        }
    }


    componentDidMount() {
        var total_Meals = 0;
        var that = this;
        const Donors = [];
        var query = firebase.database().ref(`DonorList/`);
        query.once("value").then(function (snapshot) {
            snapshot.forEach((childSnapshot) => {
                Donors.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            })
            //console.log(Donors.length);
            if (Donors.length == 0) {
                console.log('disabled');

                that.setState({ disabled: true });
                console.log(that.state.disabled);
            } else {
                for (var i = 0; i < Donors.length; i++) {
                    total_Meals = parseInt(total_Meals) + parseInt(Donors[i].meals);
                }
                console.log(total_Meals);
                that.setState({ total: total_Meals });
            }
        })

        var total_donated_meals = 0;
        firebase.database().ref('TotalMealsDonated').once('value').then(function (snapshot) {
            total_donated_meals = snapshot.val();
            that.setState({ totaldonated: total_donated_meals });

        });



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
                    <Text style={styles.meal_heading}>Total Meals donated: {this.state.totaldonated}</Text>

                    <Text style={styles.meal_heading}>Meals available: {this.state.total}</Text>
                    <TouchableOpacity primary type="submit" onPress={() => this.props.navigation.navigate('Donate')} style={styles.button}>
                        <Text style={{ fontSize: 30 }}> Donate Meals </Text>
                    </TouchableOpacity>
                    <Text></Text>
                    <TouchableOpacity primary type="submit" onPress={() => this.props.navigation.navigate('Register')}
                        disabled={this.state.disabled} style={styles.button}>
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
    },
    meal_heading: {
        color: '#FFC300',
        fontWeight: 'bold',
        fontSize: 25,
        padding: 10,
        textDecorationColor: '#FFC300',
        textDecorationStyle: 'dotted',
        textShadowColor: 'black',
        textShadowRadius: 4,
        textShadowOffset: { width: 2, height: 2 },
        textTransform: 'uppercase',
        textAlignVertical: 'top',
    },

});
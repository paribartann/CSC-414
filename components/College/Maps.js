import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import MapView from 'react-native-maps';
import firebase from '../MainPage/FirebaseConfig';

const db = firebase.database();

export default class RenderMaps extends React.Component {


    static navigationOptions = {
        headerTitle: 'Map',
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            markers: [],
            colleges : [],
        };
    }

    componentDidMount() {
        this.fetchMarkerData();
    }


    fetchMarkerData() {
        fetch('https://csc-414-survival-app.firebaseio.com/buildings/buildings.json')
            .then((response) => 
                response.json()
            )
            .then((responseJson) => {
                console.log(responseJson);  
                this.setState({
                    isLoading: false,
                    markers: responseJson,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }



    renderMarkers() {
        return this.state.isLoading
            ? null
            : this.state.markers.map((marker, index) => {
                const coords = {
                    latitude: marker.Lattitude,
                    longitude: marker.Longitude
                };

                const metadata = `Building: ${marker.name}`;

                return (
                    <MapView.Marker
                        key={index}
                        coordinate={coords}
                        title={marker.shortForm}
                        description={metadata}
                    />
                );
            });
    }

    


   

    render() {
        
        return (

            <View style={styles.container}>

                <MapView
                    style={styles.mapStyle}
                    provider="google"
                    region={{
                        latitude: 31.329621,
                        longitude: -89.334068,
                        latitudeDelta: 0.01922,
                        longitudeDelta: 0.01421
                    }}
                >
                    {this.renderMarkers()}
                </MapView>

            </View>


        )
    }


}

 



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
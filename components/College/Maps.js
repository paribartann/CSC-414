import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import Polyline from '@mapbox/polyline';
import { GOOGLE_DIRECTION_API } from '../../ENVVAR';


const { width, height } = Dimensions.get('screen')

export default class RenderMaps extends React.Component {

  
  static navigationOptions = {
    headerTitle: "Map"
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
      colleges: [],
      latitude: null,
      longitude: null,
      desLatitude: null,
      desLongitude: null,
      errorMessage: null,
      coords: null,
      pressed: false,
      name: null,
      shortForm: null
    };
  }

  async componentDidMount() {
    this.fetchMarkerData();

    let { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }, this.mergeCoords);
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );


  }

  async fetchMarkerData() {
    fetch(
      "https://csc-414-survival-app.firebaseio.com/buildings/buildings.json"
    )
      .then(response => response.json())
      .then(responseJson => {
        //console.log(responseJson);
        this.setState({
          isLoading: false,
          markers: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onMarkerPress = location => () => {
    const { latitude, longitude, name, shortForm  } = location
    this.setState({
        pressed: true,
        desLatitude: latitude,
        desLongitude: longitude,
        name: name,
        shortForm: shortForm
    }, this.mergeCoords)
  }

  renderMarkers() {
    return this.state.isLoading
      ? null
      : this.state.markers.map((marker, index) => {
          const coords = {
            latitude: marker.Lattitude,
            longitude: marker.Longitude,
            name: marker.name,
            shortForm: marker.ShortForm
          };

          const metadata = `Building: ${marker.name}`;

          return (
            <MapView.Marker
              key={index}
              coordinate={coords}
              title={marker.shortForm}
              description={metadata}
              onPress={this.onMarkerPress(coords)}
            />
          );
        });
  }


  mergeCoords = () => {
    const {
        latitude,
        longitude,
        desLatitude,
        desLongitude
    } = this.state

    const hasStartAndEnd = latitude !== null && desLatitude !== null
    if(hasStartAndEnd) {
        const concatStart = `${latitude},${longitude}`
        const concatEnd = `${desLatitude},${desLongitude}`
        this.getDirections(concatStart, concatEnd)
    }
  }

  async getDirections(startLocation, endLocation) {
    try {
        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLocation }&destination=${ endLocation }&mode=walking&key=${GOOGLE_DIRECTION_API}`)
        let respJson = await resp.json();
        let response = respJson.routes[0];
        let distanceTime = response.legs[0]
        let distance = distanceTime.distance.text
        let time = distanceTime.duration.text
        let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        let coords = points.map((point) => {
            return  {
                latitude : point[0],
                longitude : point[1]
            }
        })
        this.setState({ coords, distance, time })
    } catch(error) {
     
       console.log("ERROR", error)
        
    }
}


  render() {
   
      const { latitude, longitude, coords, time, distance, pressed, name, shortForm } = this.state
      console.log(coords);
      if(latitude)
      {
        return (
            
              <MapView
              showsUserLocation
                style={styles.mapStyle}
                provider="google"
                initialRegion={{
                  latitude,
                  longitude,
                  latitudeDelta: 0.01922,
                  longitudeDelta: 0.01421
                }}
              >
                  {pressed &&  <View style={styles.extraInfoStyle}>
                      <Text style={{fontWeight:'bold'}}> Destination : {name}({shortForm}) </Text>
                    <Text style={{fontWeight:'bold'}}>Estimated Time: {time} </Text>
                    <Text style={{fontWeight:'bold'}}>Estimated Distance: {distance} </Text>
                  </View> }
                 
                 {this.renderMarkers()}   
                 <MapView.Polyline
                 strokeWidth={5}
                 strokeColor='red'
                 coordinates={coords}
                 />
              </MapView>
          
          );
      }
      return (
          <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
              <Text>We need your permission!</Text>
          </View>
      )
    
  }
}

const styles = StyleSheet.create({
  
  mapStyle: {
      flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get("screen").height
  },
  extraInfoStyle : {
    width,
    alignSelf: 'center',
    height: height*0.07,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: "flex-end",
    paddingTop: 10,
  }
});

import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import firebase from "./FirebaseConfig";
import { createAppContainer } from "react-navigation";
import {
  createDrawerNavigator,
  DrawerNavigatorItems
} from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

import Icon from "react-native-vector-icons/Ionicons";
import Profile from "../College/Profile";

const customDrawerComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.containerA}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <DrawerNavigatorItems {...props} />
    </SafeAreaView>

    <TouchableOpacity
      onPress={() => {
        firebase.auth().signOut();
      }}
    >
      <View style={styles.item}>
        <Text style={styles.label}>Logout</Text>
      </View>
    </TouchableOpacity>
  </ScrollView>
);

class Main extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (this._isMounted) {
          this.setState({ currentUser: user.displayName });
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./campusimg.jpg')} style={{width: '100%', height: 190}}>
          <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18, color: '#fff', fontWeight: "900"}}>The University of Southern Mississippi</Text>
          </View>
        </ImageBackground>
        
          
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CampusHome")}
            style={styles.button}
          >
            <ImageBackground
            style={styles.imageBackground}
            imageStyle={{borderRadius: 15}}
            source={require('./campusButton.jpg')}
            >
            <Text style={styles.text}>Campus</Text>
            </ImageBackground>
          </TouchableOpacity>
          


        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("FoodHome")}
          style={styles.button}
        >
          <ImageBackground
            style={styles.imageBackground}
            imageStyle={{borderRadius: 15}}
            source={require('./food.jpg')}
            >
            <Text style={styles.text}>Food</Text>
            </ImageBackground>
        </TouchableOpacity>

        <StatusBar hidden />
      </View>
    );
  }
}

const HomeNavigator = createStackNavigator(
  {
    Home: Main
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: "#434343"
        },
        headerTitle: "College Guide",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          textAlign: "center",
          flex: 1
        },
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10, color: "white" }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        ),
        headerRight: <View />
      };
    }
  }
);

const ProfileNavigator = createStackNavigator(
  {
    Profile: Profile
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: "#434343"
        },
        headerTitle: "Profile",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          textAlign: "center",
          flex: 1
        },
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10, color: "white" }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        ),
        headerRight: <View />
      };
    }
  }
);

const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: HomeNavigator,
    Profile: ProfileNavigator
  },
  {
    initialRouteName: "Home",
    contentComponent: customDrawerComponent,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);

const MyMainPage = createAppContainer(MyDrawerNavigator);

const styles = StyleSheet.create({
  container: {
    //paddingTop: "50%",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2"
  },
  menu: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  containerA: {
    flex: 1,
    flexDirection: "column"
  },
  logoutButton: {
    backgroundColor: "red",
    position: "absolute",
    bottom: 0
  },
  item: {
    flexDirection: "row",
    alignItems: "center"
  },
  label: {
    margin: 16,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, .87)"
  },

  //Big button styles
  button: {
    marginTop: 15,
    //padding: 5,
    borderRadius: 15,
    height: 120,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255,209,71,0.7)'
  },
  text: {
    color: "#fff",
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

export default MyMainPage;

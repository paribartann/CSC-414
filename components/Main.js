import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import firebase from './FirebaseConfig';

import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/Ionicons';
import Profile from './Profile';

const customDrawerComponent = (props) => (

  <ScrollView>

    <SafeAreaView style={styles.containerA} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerNavigatorItems  {...props} />
    </SafeAreaView>

    <TouchableOpacity onPress={() => {
          firebase.auth().signOut()}} >
      <View style={styles.item}>
        <Text style={styles.label}>Logout</Text>
      </View>
    </TouchableOpacity>

  </ScrollView>
)

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ currentUser: user.displayName });
      }
    });
  }


  render() {
    return (

      <View style={styles.container}>

        <Text style={{ textAlign: "center" }}>
          Welcome to the main page! Hi, {this.state.currentUser}!
        </Text>

        <Button
          title="Press Here to See the Map"
          style={{ marginTop: 20 }}
          onPress={() => this.props.navigation.navigate('MapPage')
          }>
          <Text>Press Here to See the Map</Text>
        </Button>



      </View>


    )
  }
}

const HomeNavigator = createStackNavigator(
  {
    Home: Main,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: '#3a9ad3',
        },
        headerTitle: 'Home',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          flex: 1,
        },
        headerLeft: (
          <Icon style={{ paddingLeft: 10, color: 'white' }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30} />
        ),
        headerRight: (
          <View />
        )
      }
    }
  }
);


const ProfileNavigator = createStackNavigator(
  {
    Profile: Profile,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: '#3a9ad3',
        },
        headerTitle: 'Profile',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          flex: 1,
        },
        headerLeft: (
          <Icon style={{ paddingLeft: 10, color: 'white' }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30} />
        ),
        headerRight: (
          <View />
        )
      }
    }
  }
);


const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: HomeNavigator,
    Profile: ProfileNavigator
  },
  {
    initialRouteName: 'Home',
    contentComponent: customDrawerComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle' 
  },
);

const MyMainPage = createAppContainer(MyDrawerNavigator);




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerA: {
    flex: 1,
    flexDirection: 'column',
  },
  logoutButton: {
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, .87)',
  }
})

export default MyMainPage;





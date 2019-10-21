import React from 'react'
import { StatusBar, StyleSheet, Text, View,
         SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import firebase from './FirebaseConfig';

import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/Ionicons';
import Profile from '../College/Profile';



const customDrawerComponent = (props) => (

  <ScrollView>

    <SafeAreaView style={styles.containerA} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerNavigatorItems  {...props} />
    </SafeAreaView>

    <TouchableOpacity onPress={() => {
      firebase.auth().signOut()
    }} >
      <View style={styles.item}>
        <Text style={styles.label}>Logout</Text>
      </View>
    </TouchableOpacity>

  </ScrollView>
)

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

        <TouchableOpacity onPress={() => this.props.navigation.navigate('CampusHome')} style={styles.button}>
            <Text style={styles.text}>Campus</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => this.props.navigation.navigate('FoodHome')} style={styles.button}>
            <Text style={styles.text}>Food</Text>
        </TouchableOpacity>

       


        <StatusBar hidden />
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
          backgroundColor: '#434343',
        },
        headerTitle: 'College Guide',
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
          backgroundColor: '#434343',
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
    Profile: ProfileNavigator,
  },
  {
    initialRouteName: 'Home',
    contentComponent: customDrawerComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  },
);

const MyMainPage = createAppContainer(MyDrawerNavigator);

const styles = StyleSheet.create({
  container: {
    //padding: 30,
    flex: 1,
    alignItems: 'center'
  },
  menu: {
    padding: 10,
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
  },

  //Big button styles
  button: {
    marginTop: 15,
    padding: 5,
    borderRadius: 15,
    height: 120,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd147',
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  }

})

export default MyMainPage;





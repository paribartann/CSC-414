
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//for the auth
import Loading from './components/Auth/Loading'
import SignUp from './components/Auth/SignUp'
import Verify from './components/Auth/Verify'
import Login from './components/Auth/Login'

//main page
import MyMainPage from './components/MainPage/Main'

//for colleges
import CampusScreen from './components/College/CampusHome'
import RenderMaps from './components/College/Maps';


//for food
import FoodHomeScreen from './components/Foods/HomeScreen';
import MealSwipe from './components/Foods/MealSwipe'
import DonateMealScreen from './components/Foods/DonateMeal';
import RegisterMealScreen from './components/Foods/RegisterMeal';


const AppStack = createStackNavigator(
  { 
    Home: { screen: MyMainPage, navigationOptions: { header: null } },
    CampusHome: CampusScreen, 
    MapPage: RenderMaps, 
    FoodHome: FoodHomeScreen,
    Meal: MealSwipe,
    Donate: DonateMealScreen,
    Register: RegisterMealScreen 
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#434343',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
    }
  }
);

const MainNavigator = createSwitchNavigator(
  {
    AuthLoading: Loading,
    SignIn: Login,
    VerifyScreen: Verify,
    SignUp: SignUp,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

const App = createAppContainer(MainNavigator);

export default App;







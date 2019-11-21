
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
import CollegeTips from './components/College/collegeTips';


//for food
import FoodHomeScreen from './components/Foods/HomeScreen';
import MealSwipe from './components/Foods/MealSwipe'
import DonateMealScreen from './components/Foods/DonateMeal';
import RegisterMealScreen from './components/Foods/RegisterMeal';
import OnCampusFood from './components/Foods/onCampusFood';
import OffCampusFood from './components/Foods/offCampusFood';

const AppStack = createStackNavigator(
  { 
    Home: { screen: MyMainPage, navigationOptions: { header: null } },
    CampusHome: CampusScreen, 
    MapPage: RenderMaps, 
    CollegeTips: CollegeTips,
    FoodHome: FoodHomeScreen,
    Meal: MealSwipe,
    OnCampusFood: OnCampusFood,
    OffCampusFood: OffCampusFood,
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







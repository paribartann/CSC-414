
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Loading from './components/Loading'
import SignUp from './components/SignUp'
import Verify from './components/Verify'
import Login from './components/Login'
import MyMainPage from './components/Main'
import Map from './components/Maps';

const AppStack = createStackNavigator({ Home: MyMainPage, MapPage: Map });

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







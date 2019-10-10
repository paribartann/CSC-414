
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Loading from './components/Loading'
import SignUp from './components/SignUp'
import Verify from './components/Verify'
import Login from './components/Login'
import Main from './components/Main'

const MainNavigator = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Verify,
    Login,
    Main,
  },
  {
    initialRouteName: 'Loading'
  }
);

const App = createAppContainer(MainNavigator);

export default App;

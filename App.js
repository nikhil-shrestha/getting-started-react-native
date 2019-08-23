import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlace from './src/screens/SharePlace/SharePlace';
import FindPlace from './src/screens/FindPlace/FindPlace';
import PlaceDetail from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

import configStore from './src/store/configStore';

const store = configStore();

// Register Screens
Navigation.registerComponentWithRedux(
  'awesome-places.AuthScreen',
  () => AuthScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  'awesome-places.SharePlaceScreen',
  () => SharePlace,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  'awesome-places.FindPlaceScreen',
  () => FindPlace,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  'awesome-places.PlaceDetailScreen',
  () => PlaceDetail,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  'awesome-places.SideDrawer',
  () => SideDrawer,
  Provider,
  store
);

// Start App
export default () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'awesome-places.AuthScreen',
              options: {
                topBar: {
                  title: {
                    text: 'Login'
                  }
                }
              }
            }
          }
        ]
      }
    }
  });
};

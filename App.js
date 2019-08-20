import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlace from './src/screens/SharePlace/SharePlace';
import FindPlace from './src/screens/FindPlace/FindPlace';
import configStore from './src/store/configStore';

const store = configStore();

// Register Screens
Navigation.registerComponent(
  'awesome-places.AuthScreen',
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  'awesome-places.SharePlaceScreen',
  () => SharePlace,
  store,
  Provider
);
Navigation.registerComponent(
  'awesome-places.FindPlaceScreen',
  () => FindPlace,
  store,
  Provider
);

// Start App
Navigation.events().registerAppLaunchedListener(() => {
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
});

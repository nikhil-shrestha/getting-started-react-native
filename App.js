import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlace from './src/screens/SharePlace/SharePlace';
import FindPlace from './src/screens/FindPlace/FindPlace';

// Register Screens
Navigation.registerComponent('awesome-places.AuthScreen', () => AuthScreen);
Navigation.registerComponent(
  'awesome-places.SharePlaceScreen',
  () => SharePlace
);
Navigation.registerComponent('awesome-places.FindPlaceScreen', () => FindPlace);

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

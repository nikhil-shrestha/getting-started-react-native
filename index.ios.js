import { Navigation } from 'react-native-navigation';
import App from './App';

Navigation.events().registerAppLaunchedListener(() => {
  App();
});

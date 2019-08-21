import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
    Icon.getImageSource(
      Platform.OS === 'android' ? 'md-share-alt' : 'ios-share',
      30
    ),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
  ]).then(sources => {
    Navigation.setRoot({
      root: {
        sideMenu: {
          left: {
            component: {
              name: 'awesome-places.SideDrawer'
            }
          },
          center: {
            bottomTabs: {
              children: [
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'awesome-places.FindPlaceScreen',
                          options: {
                            topBar: {
                              title: {
                                text: 'Find Place'
                              },
                              leftButtons: {
                                id: 'sideDrawerToggle',
                                icon: sources[2]
                              }
                            },
                            bottomTab: {
                              text: 'Find Place',
                              icon: sources[0],
                              testID: 'FIND_TAB',
                              selectedIconColor: 'orange'
                            }
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'awesome-places.SharePlaceScreen',
                          options: {
                            topBar: {
                              title: {
                                text: 'Share Place'
                              },
                              leftButtons: {
                                id: 'sideDrawerToggle',
                                icon: sources[2]
                              }
                            },
                            bottomTab: {
                              text: 'Share Place',
                              icon: sources[1],
                              testID: 'SHARE_TAB',
                              selectedIconColor: 'orange'
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        }
      }
    });
  });
};

export default startTabs;

import {useState, useCallback, useEffect} from 'react';
import { StatusBar, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
// import auth from '@react-native-firebase/auth';
import { func } from './src/constants';

// root stack navigation
import RootStack from './src/navigation/RootStack';

// app context state
import AppState from './src/context/AppState';

SplashScreen.preventAutoHideAsync();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    async function prepare() {
      try {
        // pre-load/cache assets: images, fonts, and videos
        await func.loadAssetsAsync();
      } catch (e) {
        // console.warn(e);
      } finally {
        // loading is complete, show app
        setIsLoading(false);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isLoading === false) {
      // loading is complete, hide Splash Screen and show app
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <AppState>
      <StatusBar barStyle="light-content" />

      <RootStack />

      <View onLayout={onLayoutRootView} />
    </AppState>
  );
}

export default App;

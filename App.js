import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Authentication from "./Authentication";
import Home from "./Home";
import SplashScreen from "./SplashScreen";

const Stack = createStackNavigator();

export default function App() {
  // To handle the state of splash screen
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    // Show splash screen for 3 second
    const splashTimeout = setTimeout(() => {
      setSplashVisible(false);
    }, 3000);

    return () => clearTimeout(splashTimeout);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        {isSplashVisible ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : (
          <>
            <Stack.Screen name="Authentication" component={Authentication} />
            <Stack.Screen name="Home" component={Home} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

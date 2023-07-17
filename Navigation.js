import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SearchCity from "./screens/SearchCity";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
          initialParams={{ city: "Orai" }}
        />
        <Stack.Screen
          name="searchCity"
          component={SearchCity}
          options={{ title: "Search City" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

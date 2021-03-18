import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()
//!--------------
import { Register, Login, Verify } from "../pages/Auth"
import { Home } from "../pages/Home"

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}

export default AuthStack

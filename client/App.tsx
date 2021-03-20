import React from "react"
import * as SecureStore from "expo-secure-store"
import { View } from "react-native"
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native"
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  ActivityIndicator,
} from "react-native-paper"
import { createStackNavigator } from "@react-navigation/stack"
import axios from "axios"

//!--------------------
import AuthStack from "./src/navigation/AuthStack"
import BottomTabs from "./src/navigation/BottomTabs"
import Drawer from "./src/navigation/Drawer"
import { User, Token } from "./src/types"
import { AuthContext } from "./src/context"

export default function App({ navigation }: any) {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false)

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  }

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "#ffffff",
      text: "#333333",
    },
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#333333",
      text: "#ffffff",
    },
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme

  const loginReducer = (prevState: any, action: any) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        }
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        }
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        }
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        }
    }
  }

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  )

  const authContext = React.useMemo(
    () => ({
      signIn: async (username, password) => {
        const res = await axios.post("http://10.0.2.2:8000/api/login", {
          username,
          password,
        })
        const userToken = res.data.token
        try {
          await SecureStore.setItemAsync("userToken", userToken)
          console.log(`userToken: ${userToken}`)
        } catch (e) {
          console.log(e)
        }
        // console.log('user token: ', userToken);
        dispatch({ type: "LOGIN", id: username, token: userToken })
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await SecureStore.deleteItemAsync("userToken")
        } catch (e) {
          console.log(e)
        }
        dispatch({ type: "LOGOUT" })
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme)
      },
    }),
    []
  )

  React.useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken
      userToken = null
      try {
        userToken = await SecureStore.getItemAsync("userToken")
      } catch (e) {
        console.log(e)
      }
      // console.log('user token: ', userToken);
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken })
    }, 1000)
  }, [])

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null ? <Drawer /> : <AuthStack />}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  )
}

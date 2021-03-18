import React, { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

const MainStack = createStackNavigator()
//!--------------------
import AuthStack from "./AuthStack"
import BottomTabs from "./BottomTabs"
import Drawer from "./Drawer"

const Main = () => {
  const [isLogged, setisLogged] = useState(false)

  return (
    <NavigationContainer>
      {isLogged ? <Drawer /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default Main

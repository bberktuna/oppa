import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"
//!----------------------
import { Home } from "../pages/Home"
import { Profile } from "../pages/Profile"
import BottomTabs from "./BottomTabs"

const Draw = createDrawerNavigator()

const Drawer = () => {
  return (
    <Draw.Navigator>
      <Draw.Screen name="BottomTabs" component={BottomTabs} />
      <Draw.Screen name="Profile" component={Profile} />
    </Draw.Navigator>
  )
}

export default Drawer

const styles = StyleSheet.create({})

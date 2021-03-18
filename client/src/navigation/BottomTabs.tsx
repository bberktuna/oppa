import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Home } from "../pages/Home"
import { Search } from "../pages/Search"
import { Notifications } from "../pages/Notifications"
import { Messages } from "../pages/Messages"
import Drawer from "./Drawer"
import { createStackNavigator } from "@react-navigation/stack"

const Tabs = createBottomTabNavigator()
const _HomeStack = createStackNavigator()
const _SearchStack = createStackNavigator()
const _NotificationsStack = createStackNavigator()
const _MessagesStack = createStackNavigator()

const BottomTabs = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="HomeStack" component={HomeStack} />
      <Tabs.Screen name="SearchStack" component={SearchStack} />
      <Tabs.Screen name="NotificationsStack" component={NotificationsStack} />
      <Tabs.Screen name="MessagesStack" component={MessagesStack} />
    </Tabs.Navigator>
  )
}

const HomeStack = () => {
  return (
    <_HomeStack.Navigator>
      <_HomeStack.Screen name="Home" component={Home} />
    </_HomeStack.Navigator>
  )
}

const SearchStack = () => {
  return (
    <_SearchStack.Navigator>
      <_SearchStack.Screen name="Search" component={Search} />
    </_SearchStack.Navigator>
  )
}

const NotificationsStack = () => {
  return (
    <_NotificationsStack.Navigator>
      <_NotificationsStack.Screen
        name="Notifications"
        component={Notifications}
      />
    </_NotificationsStack.Navigator>
  )
}

const MessagesStack = () => {
  return (
    <_MessagesStack.Navigator>
      <_MessagesStack.Screen name="Messages" component={Messages} />
    </_MessagesStack.Navigator>
  )
}

export default BottomTabs

const styles = StyleSheet.create({})

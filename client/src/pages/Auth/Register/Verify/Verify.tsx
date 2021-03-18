import React, { useState, useEffect } from "react"
import axios from "axios"
import { TextInput, Button } from "react-native-paper"
import { StyleSheet, Text, View } from "react-native"

const Verify = ({ navigation }: any) => {
  const onPressHandler = () => {
    navigation.navigate("Login")
  }
  return (
    <View>
      <Text>Verify SCREEN ASK FOR CODE COMES ROM EMAIL</Text>
      <Button onPress={onPressHandler}>aktive et</Button>
    </View>
  )
}

export default Verify

const styles = StyleSheet.create({})

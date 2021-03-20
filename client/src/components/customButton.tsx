import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

const customButton = (
  text,
  size,
  bordercolor,
  color,
  textcolor,
  loadingIcon
) => {
  //animation when pressed
  return (
    <TouchableOpacity>
      <Text> {text} </Text>
    </TouchableOpacity>
  )
}

export default customButton

const styles = StyleSheet.create({})

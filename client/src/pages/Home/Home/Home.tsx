import React, { useContext } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import styles from "./styles"
import { AuthContext } from "../../../context"
const Home = () => {
  const { signOut } = useContext(AuthContext)
  const signoutHandler = () => {
    signOut()
    console.log(signOut)
  }
  return (
    <View style={styles.container}>
      <Text>HomE SCREEN</Text>
      <TouchableOpacity onPress={signoutHandler}>
        <Text>sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

import React, { useState } from "react"
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native"
import { TextInput, Button } from "react-native-paper"
//!-----------------
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"

const Login = ({ navigation }: any) => {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [error, seterror] = useState("")
  const [success, successame] = useState("")
  const nnavigation = useNavigation()
  const handleLogin = () => {
    //TODO set isLogged token to be true so rnN5 directs automaticly to bottom tab stack by main.tsx
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Login</Text>
      <TextInput placeholder="username" style={styles.textInput} />
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.dontHave}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
      <Button icon="check" mode="contained" onPress={handleLogin}>
        Login
      </Button>
    </SafeAreaView>
  )
}

export default Login

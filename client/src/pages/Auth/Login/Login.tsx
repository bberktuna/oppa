import React, { useState, useContext } from "react"
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native"
import { TextInput, Button } from "react-native-paper"
import axios from "axios"

//!-----------------
import styles from "./styles"
import { AuthContext } from "../../../context"

const Login = ({ navigation }: any) => {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [error, seterror] = useState("")
  const [success, successame] = useState("")

  // const handleSignin = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:8000/login", {
  //       email,
  //       password,
  //     })
  //     console.log(response)
  //   } catch (error) {
  //     console.log(error)
  //     //setState({ ...state, buttonText: 'Login', error: error.response.data.error });
  //   }
  // }

  const { signIn } = useContext(AuthContext)
  const signinHandler = () => {
    console.log(signIn)
    signIn(username, password)
    console.log(signIn)
    console.log(username + password)
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="username or email"
        mode="flat"
        style={styles.textInput}
        value={username}
        onChangeText={(text) => setusername(text)}
      />

      <TextInput
        placeholder="password"
        mode="flat"
        style={styles.textInput}
        value={password}
        onChangeText={(text) => setpassword(text)}
      />
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.dontHave}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
      <Button icon="check" mode="contained" onPress={signinHandler}>
        Login
      </Button>
    </SafeAreaView>
  )
}

export default Login

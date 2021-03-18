import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native"
import { TextInput, Button } from "react-native-paper"
import axios from "axios"
//!-----------------
import styles from "./styles"
import { NavigationContainer } from "@react-navigation/native"

const Register = ({ navigation }: any) => {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [error, seterror] = useState("")
  const [success, setsuccess] = useState("")

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://10.0.2.2:8000/api/register", {
        username,
        email,
        password,
      })
      navigation.navigate("Verify")
      console.log(response)
      console.log({ username, email, password })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {!success && <Text>{success} </Text>}
      {!error && <Text>{error} </Text>}

      <TextInput
        placeholder="username"
        mode="flat"
        style={styles.textInput}
        value={username}
        onChangeText={(text) => setusername(text)}
      />
      <TextInput
        placeholder="email"
        mode="flat"
        style={styles.textInput}
        value={email}
        onChangeText={(text) => setemail(text)}
      />
      <TextInput
        placeholder="password"
        mode="flat"
        style={styles.textInput}
        value={password}
        onChangeText={(text) => setpassword(text)}
      />
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.dontHave}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Button icon="check" mode="contained" onPress={handleSubmit}>
        Register
      </Button>
    </SafeAreaView>
  )
}

export default Register

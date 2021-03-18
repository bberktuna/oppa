import { StyleSheet, Dimensions } from "react-native"

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dontHave: {},
  loginText: {
    color: "blue",
  },
  textInput: {
    width: width / 1.2,
    marginVertical: 5,
    height: height / 15,
  },
})

export default styles

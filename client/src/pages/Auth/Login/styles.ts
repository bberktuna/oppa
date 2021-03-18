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
  registerText: {
    color: "blue",
  },
  textInput: {
    width: width / 1.2,
  },
})

export default styles

import axios from "axios";
import * as React from "react";
import { showMessage, hideMessage } from "react-native-flash-message";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";

import { isSignedIn } from "../../redux/actions";


export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  function HandleLogin() {
    async function checkLogin() {
      console.log(username, password);
      const response = await axios
        .post(`http://192.168.1.4:3001/login`, {
          username: username,
          password: password,
        })
        .then((res) => {
          console.log(res);
          dispatch(
            isSignedIn(
              true,
              res.data[0].fullname,
              res.data[0].phonenum,
              res.data[0].id
            )
          );
          showMessage({
            message: "Welcome " + res.data[0].fullname,
            type: "success",
            icon:"success",
          });
        })
        .catch((err) => {console.log(err);  
          showMessage({
          message: "Incorect username or password",
          type: "warning",
          icon:"warning",
        });});
    }
    checkLogin();
    // isSignedin = true;
    // navigation.navigate("Home");
  }
  function HandleConfirm2() {
    navigation.navigate("Signup");
  }
  //render(){
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BOX</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="User Name..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {/* <TouchableOpacity onPress={() => HandleConfirm()}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.loginBtn} onPress={() => HandleLogin()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => HandleConfirm2()}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );

  //}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#9579d1",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#e1c7f8",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  forgot: {
    color: "black",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#9579d1",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "black",
  },
});

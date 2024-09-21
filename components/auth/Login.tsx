import React from "react";
import { Button } from "react-native-paper";
import { View } from "react-native";

const Login = () => {
  return (
    <View>
      <Button icon="login" mode="contained" onPress={() => alert("Login")}>
        Login
      </Button>
      <Button icon="signup" mode="contained" onPress={() => alert("Signup")}>
        Signup
      </Button>
    </View>
  );
};
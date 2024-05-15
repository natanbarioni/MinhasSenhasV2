import React, { useEffect } from "react";

import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import * as LocalAuthentication from "expo-local-authentication";
import Toast from "react-native-toast-message";

export function Login({ navigation }) {
  function login() {
    LocalAuthentication.getEnrolledLevelAsync().then((support) => {
      console.log("support ", support);
      if (support === 0) {
        Toast.show({
          type: "success",
          text1: "Login efetuado com sucesso!",
          text2: "Se possível, habilite a autenticação, é mais seguro.",
        });
        navigation.navigate("Home");
        return;
      }
      LocalAuthentication.authenticateAsync().then((auth) => {
        console.log(auth);
        if (auth.success === true) {
          Toast.show({
            type: "success",
            text1: "Login efetuado com sucesso!",
          });
          navigation.navigate("Home");
        }
        if (auth.success === false) {
          Toast.show({
            type: "error",
            text1: "Não foi possível efetuar o login.",
          });
        }
      });
    });
  }

  useEffect(() => {
    LocalAuthentication.getEnrolledLevelAsync().then((support) => {
      console.log("support ", support);
      if (support === 0) {
        Toast.show({
          type: "error",
          text1: "Touch ID não suportado/habilitado.",
        });
        return;
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <TouchableOpacity onPress={() => login()} style={styles.buttonLogin}>
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
